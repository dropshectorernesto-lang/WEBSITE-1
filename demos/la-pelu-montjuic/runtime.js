(() => {
  const frame = document.getElementById('customer-demo');
  if (!frame) return;
  const mode = document.body.dataset.demoMode || 'mobile';
  if (mode === 'web-ipad') {
    frame.addEventListener('load', () => {
      try {
        const doc = frame.contentDocument;
        if (!doc?.head) return;
        const style = doc.createElement('style');
        style.textContent = '.hero-dog-eye{display:none!important}';
        doc.head.appendChild(style);
      } catch (_) {}
    });
  }
})();
