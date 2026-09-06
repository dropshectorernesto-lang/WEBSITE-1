import { defineConfig } from 'vite';
import { readdirSync, readFileSync, existsSync, mkdirSync, copyFileSync, cpSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

// These pages use shared classic scripts and runtime-selected image paths.
// Preserve their URLs in the standalone static output, including every route.
export default defineConfig({
  root: '.',
  base: './',
  build: { outDir: 'dist' },
  plugins: [{
    name: 'complete-static-site',
    closeBundle() {
      const root = process.cwd();
      const output = resolve(root, 'dist');
      const pages = readdirSync(root).filter(name => /\.(html|css|js)$/.test(name) && name !== 'vite.config.js' && name !== 'gallery-carousel.js');
      const assets = new Set();
      for (const name of pages) {
        const text = readFileSync(resolve(root, name), 'utf8');
        for (const match of text.matchAll(/assets\/[a-zA-Z0-9_./-]+/g)) if (existsSync(resolve(root, match[0]))) assets.add(match[0]);
        copyFileSync(resolve(root, name), resolve(output, name));
      }
      for (const name of readdirSync(resolve(root, 'assets'))) if (name.endsWith('.webp')) assets.add(`assets/${name}`);
      for (const asset of assets) {
        const target = resolve(output, asset); mkdirSync(dirname(target), {recursive:true});
        cpSync(resolve(root, asset), target, {recursive:true});
      }
      for (const name of ['robots.txt','netlify.toml']) copyFileSync(resolve(root, name), resolve(output, name));
    }
  }]
});
