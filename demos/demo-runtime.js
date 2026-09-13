(() => {
  const frame = document.getElementById('customer-demo');
  if (!frame) return;

  const currentScript = document.currentScript;
  const demosBase = currentScript?.src ? new URL('.', currentScript.src) : new URL('../', location.href);
  const parts = location.pathname.split('/').filter(Boolean);
  const demosIndex = parts.indexOf('demos');
  const slug = demosIndex >= 0 ? parts[demosIndex + 1] : 'demo';
  const mode = document.body?.dataset.demoMode || (parts.includes('web-ipad') ? 'web-ipad' : parts.includes('web') ? 'web' : 'mobile');

  const names = {
    'mai-friends':'MAI FRIENDS','ban-kuvo':'BAN-KUVO','art-gos':'ART GOS','bub-bub-scp':'BUB BUB S.C.P.',
    'bigotis':'BIGOTIS','lissy':'LISSY','gusboral':'GUSBORAL','woodys':"WOODY'S SALON",'amigo-mio':'AMIGO MIO',
    'laika':'LAIKA','marc-oliva':'MARC OLIVA'
  };
  const name = names[slug] || slug.split('-').map(w => w.toUpperCase()).join(' ');
  document.title = `${name} — ${mode === 'web-ipad' ? 'WEB IPAD' : mode === 'web' ? 'Web' : 'Mobile'} Demo`;

  const loaded = new Map();
  const loadScript = (path) => {
    const src = new URL(path, demosBase).href;
    if (loaded.has(src)) return loaded.get(src);
    const existing = [...document.scripts].find(s => s.src === src);
    if (existing) return Promise.resolve(true);
    const promise = new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    });
    loaded.set(src, promise);
    return promise;
  };

  const profileSlugs = new Set(['lissy','gusboral','woodys','amigo-mio']);
  const hasCustomerLayer = ['ban-kuvo','art-gos','bub-bub-scp','bigotis',...profileSlugs].includes(slug);

  const applyIpadEyes = () => {
    if (mode !== 'web-ipad') return;
    try {
      const doc = frame.contentDocument;
      if (!doc?.head) return;
      let style = doc.getElementById('web-ipad-static-eyes');
      if (!style) {
        style = doc.createElement('style');
        style.id = 'web-ipad-static-eyes';
        style.textContent = '.hero-dog-eye{display:none!important}';
        doc.head.appendChild(style);
      }
    } catch (_) {}
  };

  frame.addEventListener('load', () => {
    applyIpadEyes();
    if (!hasCustomerLayer) frame.style.visibility = 'visible';
  });

  const start = async () => {
    await loadScript('demo-global.js');

    if (slug === 'ban-kuvo') {
      await loadScript('ban-kuvo/customize.js');
      await loadScript('ban-kuvo/runtime-fixes.js');
    } else if (slug === 'art-gos') {
      await loadScript('art-gos/customize.js');
    } else if (slug === 'bub-bub-scp' || slug === 'bigotis') {
      await loadScript('customer-skins.js');
    } else if (profileSlugs.has(slug)) {
      const profileLoaded = await loadScript(`profiles/${slug}.js`);
      if (profileLoaded) await loadScript('customer-profile.js');
    }

    frame.src = frame.dataset.src || (mode === 'mobile' ? '../../mobile/index.html' : '../../../index.html');
  };

  start();
})();
