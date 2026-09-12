(() => {
  if (document.body.dataset.page !== 'home') return;
  const track = document.querySelector('.ig-grid');
  if (!track) return;
  const viewport = document.createElement('div');
  viewport.className = 'ig-carousel-viewport';
  viewport.tabIndex = 0;
  viewport.setAttribute('role', 'region');
  viewport.setAttribute('aria-label', 'Dog photo carousel');
  track.before(viewport); viewport.append(track);
  const images = [
    ['assets/ig-1.jpg', 'Smiling dog enjoying a bath in the studio'],
    ['assets/ig-2.jpg', 'Dog wrapped in a towel after a spa bath'],
    ['assets/ig-4.jpg', 'Golden dog surrounded by bath bubbles'],
    ['assets/ig-5.jpg', 'Small groomed dog posing with a bow tie'],
    ['assets/ig-3.jpg', 'Premium grooming products arranged on towels'],
    ['assets/ig-6.jpg', 'Warm quiet grooming studio interior'],
    ['assets/ig-7.webp', 'Funny well groomed dog smiling in the grooming studio'],
    ['assets/ig-8.webp', 'Freshly bathed dog wrapped in a towel at the salon'],
    ['assets/ig-9.webp', 'Playful dog posing after a grooming session'],
    ['assets/ig-10.webp', 'Cute dog enjoying a grooming table moment'],
    ['assets/ig-11.webp', 'Funny dog during a fresh grooming visit']
  ];  track.replaceChildren();
  for (let set = 0; set < 3; set++) images.forEach(([src, alt]) => {
    const img = new Image(); img.src = src; img.alt = alt;
    img.draggable = false; img.width = 180; img.height = 180;
    if (set !== 1) { img.alt = ''; img.setAttribute('aria-hidden','true'); }
    track.append(img);
  });
  track.classList.add('ig-infinite-carousel');
  let x = 0, period = 0, dragging = false, lastX = 0, resumeAt = 0, lastTime = performance.now();
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const scale = () => viewport.getBoundingClientRect().width / viewport.offsetWidth || 1;
  function paint() {
    if (!period) return;
    x = -period + ((x + period) % period + period) % period;
    track.style.transform = `translate3d(${x}px,0,0)`;
  }
  function measure() {
    const next = track.children[images.length];
    const previous = period;
    period = next.offsetLeft - track.children[0].offsetLeft;
    x = previous ? x / previous * period : -period;
    paint();
  }
  const pause = () => { resumeAt = performance.now() + 2000; };
  viewport.addEventListener('dragstart', e => e.preventDefault());
  viewport.addEventListener('pointerdown', e => {
    if (e.button !== 0 || dragging) return;
    dragging = true; lastX = e.clientX;
    viewport.setPointerCapture(e.pointerId);
    viewport.classList.add('is-dragging');
  });
  viewport.addEventListener('pointermove', e => {
    if (!dragging) return;
    x += (e.clientX - lastX) / scale(); lastX = e.clientX; paint();
  });
  function finish(e) {
    if (!dragging) return;
    dragging = false; pause(); viewport.classList.remove('is-dragging');
    if (viewport.hasPointerCapture(e.pointerId)) viewport.releasePointerCapture(e.pointerId);
  }
  ['pointerup','pointercancel','lostpointercapture'].forEach(type => viewport.addEventListener(type,finish));
  viewport.addEventListener('wheel', e => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault(); x -= e.deltaX / scale(); pause(); paint();
  }, {passive:false});
  viewport.addEventListener('keydown', e => {
    if (!['ArrowLeft','ArrowRight'].includes(e.key)) return;
    e.preventDefault(); x += e.key === 'ArrowLeft' ? 100 : -100; pause(); paint();
  });
  new ResizeObserver(measure).observe(viewport);
  measure();
  function tick(now) {
    const dt = Math.min(now - lastTime, 50) / 1000; lastTime = now;
    if (!dragging && now >= resumeAt && !document.hidden && !reducedMotion.matches) { x -= 9 * dt; paint(); }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

(() => {
  if (document.body.dataset.page !== 'home') return;
  const script = document.createElement('script');
  script.src = 'hero-mobile-animation.js?v=hero-dog-1';
  script.defer = true;
  document.head.appendChild(script);
})();

(() => {
  if (document.body.dataset.page !== 'home') return;

  const legalLinks = [...document.querySelectorAll('.legal-links a')].filter(link => {
    const href = link.getAttribute('href') || '';
    return href.endsWith('privacy-policy.html') || href.endsWith('terms-and-conditions.html');
  });
  if (!legalLinks.length) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'modal legal-modal';
  dialog.id = 'legalModal';
  dialog.innerHTML = `
    <button class="modal-close" type="button" data-close-legal aria-label="Close">×</button>
    <div class="legal-modal-tabs" role="tablist" aria-label="Legal documents">
      <button type="button" role="tab" data-legal-page="privacy-policy.html">Privacy Policy</button>
      <button type="button" role="tab" data-legal-page="terms-and-conditions.html">Terms &amp; Conditions</button>
    </div>
    <iframe class="legal-modal-frame" title="Legal document" loading="eager"></iframe>
  `;
  document.body.appendChild(dialog);

  const frame = dialog.querySelector('.legal-modal-frame');
  const tabs = [...dialog.querySelectorAll('[data-legal-page]')];
  const closeButton = dialog.querySelector('[data-close-legal]');

  const openLegal = (page) => {
    tabs.forEach(tab => {
      const active = tab.dataset.legalPage === page;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    frame.src = page;
    frame.title = page.startsWith('privacy') ? 'Privacy Policy' : 'Terms and Conditions';
    if (!dialog.open) dialog.showModal();
    document.body.classList.add('modal-open');
  };

  document.addEventListener('click', event => {
    const link = event.target.closest('.legal-links a');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    const page = href.endsWith('privacy-policy.html') ? 'privacy-policy.html' : href.endsWith('terms-and-conditions.html') ? 'terms-and-conditions.html' : '';
    if (!page) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    openLegal(page);
  }, true);

  tabs.forEach(tab => tab.addEventListener('click', () => openLegal(tab.dataset.legalPage)));
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
})();
