(() => {
  const frame = document.getElementById('customer-demo');
  if (!frame) return;

  const mode = document.body?.dataset.demoMode || 'mobile';
  const customer = window.DEMO_CUSTOMER || {};
  const customerName = customer.name || 'Customer';
  const modeLabel = mode === 'web-ipad' ? 'WEB IPAD' : mode === 'web' ? 'Web/Desktop' : 'Mobile';
  const initialSeo = customer.seo?.en;
  document.title = initialSeo?.title ? `${initialSeo.title} — ${modeLabel} Demo` : `${customerName} — ${modeLabel} Demo`;
  if (initialSeo?.description) {
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = initialSeo.description;
  }
  frame.title = `${customerName} ${modeLabel} website demo`;

  const applyIpadEyes = () => {
    if (mode !== 'web-ipad') return;
    try {
      const doc = frame.contentDocument;
      if (!doc?.head) return;
      let style = doc.getElementById('future-demo-web-ipad-static-eyes');
      if (!style) {
        style = doc.createElement('style');
        style.id = 'future-demo-web-ipad-static-eyes';
        style.textContent = '.hero-dog-eye{display:none!important}';
        doc.head.appendChild(style);
      }
    } catch (_) {}
  };

  frame.addEventListener('load', applyIpadEyes);

  const src = frame.dataset.src;
  if (src) frame.src = src;
})();
