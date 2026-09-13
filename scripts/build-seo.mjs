import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const outDir = path.join(root, '_site');
const seoConfig = JSON.parse(await fs.readFile(path.join(root, 'seo.config.json'), 'utf8'));
const baseUrl = (process.env.SITE_URL || seoConfig.siteUrl).replace(/\/+$/, '');
const supportedLangs = ['en', 'de', 'es', 'ca'];
const excluded = new Set(['.git', '.github', '_site', 'node_modules']);

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

async function copyTree(from, to) {
  await fs.mkdir(to, { recursive: true });
  const entries = await fs.readdir(from, { withFileTypes: true });
  for (const entry of entries) {
    if (excluded.has(entry.name)) continue;
    const src = path.join(from, entry.name);
    const dest = path.join(to, entry.name);
    if (entry.isDirectory()) await copyTree(src, dest);
    else await fs.copyFile(src, dest);
  }
}

function upsertTitle(html, title) {
  const tag = `<title>${escapeHtml(title)}</title>`;
  return /<title>[\s\S]*?<\/title>/i.test(html)
    ? html.replace(/<title>[\s\S]*?<\/title>/i, tag)
    : html.replace(/<\/head>/i, `  ${tag}\n</head>`);
}

function upsertMeta(html, name, content) {
  const escaped = escapeHtml(content);
  const regex = new RegExp(`<meta\\s+name=["']${name}["'][^>]*>`, 'i');
  const tag = `<meta name="${name}" content="${escaped}" />`;
  return regex.test(html) ? html.replace(regex, tag) : html.replace(/<\/head>/i, `  ${tag}\n</head>`);
}

function upsertCanonical(html, href) {
  const regex = /<link\s+rel=["']canonical["'][^>]*>/i;
  const tag = `<link rel="canonical" href="${escapeHtml(href)}" />`;
  return regex.test(html) ? html.replace(regex, tag) : html.replace(/<\/head>/i, `  ${tag}\n</head>`);
}

function ensureImageAlts(html) {
  let inserted = 0;
  const next = html.replace(/<img\b[^>]*>/gi, (tag) => {
    if (/\balt\s*=\s*["']/i.test(tag)) return tag;
    inserted += 1;
    if (/\/>$/.test(tag)) return tag.replace(/\s*\/>$/, ' alt="" />');
    return tag.replace(/>$/, ' alt="">');
  });
  return { html: next, inserted };
}

function injectRuntime(html, src) {
  if (/seo-runtime\.js/i.test(html)) return html;
  return html.replace(/<\/head>/i, `  <script src="${src}" defer></script>\n</head>`);
}

function runtimeSource() {
  const runtimeConfig = JSON.stringify({ pages: seoConfig.pages, supportedLangs });
  return `(() => {\n  const config = ${runtimeConfig};\n  const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();\n  const page = config.pages[file];\n  if (!page) return;\n  const apply = () => {\n    const stored = localStorage.getItem('grum-language');\n    const docLang = (document.documentElement.lang || '').toLowerCase();\n    const lang = config.supportedLangs.includes(docLang) ? docLang : (config.supportedLangs.includes(stored) ? stored : 'en');\n    const meta = page[lang] || page.en;\n    if (!meta) return;\n    document.title = meta.title;\n    let description = document.querySelector('meta[name="description"]');\n    if (!description) { description = document.createElement('meta'); description.name = 'description'; document.head.appendChild(description); }\n    description.content = meta.description;\n  };\n  apply();\n  new MutationObserver(apply).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });\n})();\n`;
}

await fs.rm(outDir, { recursive: true, force: true });
await copyTree(root, outDir);
await fs.writeFile(path.join(outDir, 'seo-runtime.js'), runtimeSource(), 'utf8');

let altFallbacks = 0;
for (const [file, page] of Object.entries(seoConfig.pages)) {
  const publicPath = path.join(outDir, file);
  let html = await fs.readFile(publicPath, 'utf8');
  html = upsertTitle(html, page.en.title);
  html = upsertMeta(html, 'description', page.en.description);
  html = upsertMeta(html, 'robots', 'index,follow');
  html = upsertCanonical(html, `${baseUrl}${page.path}`);
  ({ html, inserted: altFallbacks } = (() => {
    const result = ensureImageAlts(html);
    altFallbacks += result.inserted;
    return { html: result.html, inserted: altFallbacks };
  })());
  html = injectRuntime(html, 'seo-runtime.js');
  await fs.writeFile(publicPath, html, 'utf8');

  const mobilePath = path.join(outDir, 'mobile', file);
  try {
    let mobileHtml = await fs.readFile(mobilePath, 'utf8');
    mobileHtml = upsertTitle(mobileHtml, page.en.title);
    mobileHtml = upsertMeta(mobileHtml, 'description', page.en.description);
    mobileHtml = upsertMeta(mobileHtml, 'robots', 'noindex,follow');
    mobileHtml = upsertCanonical(mobileHtml, `${baseUrl}${page.path}`);
    const result = ensureImageAlts(mobileHtml);
    altFallbacks += result.inserted;
    mobileHtml = injectRuntime(mobileHtml, '../seo-runtime.js');
    await fs.writeFile(mobilePath, mobileHtml, 'utf8');
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }
}

const sitemapEntries = Object.values(seoConfig.pages)
  .map((page) => `  <url>\n    <loc>${baseUrl}${page.path}</loc>\n  </url>`)
  .join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`;
await fs.writeFile(path.join(outDir, 'sitemap.xml'), sitemap, 'utf8');
await fs.writeFile(path.join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /demos/\nSitemap: ${baseUrl}/sitemap.xml\n`, 'utf8');

console.log(`SEO build complete: ${Object.keys(seoConfig.pages).length} public pages, ${altFallbacks} missing image alt attributes normalized.`);
