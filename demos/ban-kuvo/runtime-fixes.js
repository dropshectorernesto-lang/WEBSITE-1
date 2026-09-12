(() => {
  const frame = document.getElementById('customer-demo');
  if (!frame) return;

  const injectDemoFixes = () => {
    try {
      const doc = frame.contentDocument;
      if (!doc?.head) return;

      let style = doc.getElementById('ban-kuvo-runtime-fixes');
      if (!style) {
        style = doc.createElement('style');
        style.id = 'ban-kuvo-runtime-fixes';
        style.textContent = `
          .reviews-section{display:block!important;background:#fffaf6!important}
          .reviews-section .kicker{color:#01463c!important}
          .reviews-section .content-heading{color:#222121!important}
          .reviews-section .content-heading span{color:#01463c!important}
          .review-card{opacity:1!important;visibility:visible!important;color:#fff!important}
          .review-card.vc-green{background:#01463c!important}
          .review-card.vc-black{background:#232121!important}
          .review-card.vc-orange{background:#f26312!important}
          .review-card.vc-pink{background:#f87686!important}
          .review-card p,.review-card strong{color:#fff!important}
          .review-card span{color:rgba(255,255,255,.78)!important}
          .review-stars{color:#fff3b0!important}
        `;
        doc.head.appendChild(style);
      }

      frame.style.visibility = 'visible';
    } catch (_) {
      frame.style.visibility = 'visible';
    }
  };

  frame.addEventListener('load', injectDemoFixes);
  injectDemoFixes();
})();