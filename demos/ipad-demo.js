(() => {
  const frame = document.getElementById('customer-demo');
  if (!frame) return;

  const parts = location.pathname.split('/').filter(Boolean);
  const modeIndex = parts.lastIndexOf('web-ipad');
  const slug = modeIndex > 0 ? parts[modeIndex - 1] : 'demo';
  const name = slug.split('-').map((word) => word.toUpperCase()).join(' ');
  document.title = `${name} — WEB IPAD Demo`;

  const disableFollowingEyes = () => {
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
    frame.style.visibility = 'visible';
  };

  frame.addEventListener('load', disableFollowingEyes);

  const loadScript = (src) => new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = resolve;
    document.head.appendChild(script);
  });

  const start = async () => {
    if (slug === 'ban-kuvo') {
      await loadScript('../customize.js');
      await loadScript('../runtime-fixes.js');
    }
    frame.src = frame.dataset.src || '../../../index.html';
  };

  start();
})();