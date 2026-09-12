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

  /* Mobile booking/footer correction.
     Restore the footer dog exactly as it was in the commit immediately before
     the mobile animation assets were added, and apply the requested delay to
     the UPPER hero booking button only. */
  const mobile = matchMedia('(max-width: 560px)');
  const footerDog = document.querySelector('.final-dog');
  const injectedRig = footerDog?.querySelector('.mobile-dog-rig');
  injectedRig?.remove();
  footerDog?.classList.remove('has-mobile-rig', 'is-booking-animate');

  const restoreStyle = document.createElement('style');
  restoreStyle.id = 'pre-animation-footer-dog';
  restoreStyle.textContent = `
    @media(max-width:560px){
      .final-dog{position:static!important;order:2!important;width:100%!important;height:96px!important;margin:0!important;overflow:hidden!important;text-align:center!important;display:flex!important;justify-content:center!important;align-items:flex-start!important}
      .final-dog>img{display:block!important;height:190px!important;max-width:100%!important;width:auto!important;object-fit:contain!important;object-position:center top!important;transform:translateY(0)!important;opacity:1!important;visibility:visible!important}
      .mobile-dog-rig{display:none!important}
    }
  `;
  document.head.appendChild(restoreStyle);

  const booking = document.getElementById('bookingModal');
  let heroBookingTimer = 0;
  const showBooking = () => {
    if (!booking) return;
    if (!booking.open) booking.showModal();
    document.body.classList.add('modal-open');
  };

  document.addEventListener('click', (event) => {
    if (!mobile.matches) return;
    const button = event.target.closest('[data-book]');
    if (!button) return;

    if (button.classList.contains('final-book')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      showBooking();
      return;
    }

    if (button.closest('.hero-actions')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      clearTimeout(heroBookingTimer);
      heroBookingTimer = setTimeout(showBooking, 450);
    }
  }, true);
})();
