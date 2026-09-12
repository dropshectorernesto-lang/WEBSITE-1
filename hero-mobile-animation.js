(() => {
  if (document.body.dataset.page !== 'home') return;

  const mobile = matchMedia('(max-width: 560px)');
  const heroWrap = document.querySelector('.hero-image-wrap');
  const hero = heroWrap?.closest('.hero');
  const heroBook = document.querySelector('.hero-actions [data-book]');
  const booking = document.getElementById('bookingModal');
  if (!heroWrap || !heroBook || !booking) return;

  const style = document.createElement('style');
  style.id = 'hero-mobile-dog-rig-style';
  style.textContent = `
    .hero-dog-rig{display:none}
    @media(max-width:560px){
      .hero-image-wrap{overflow:hidden!important}
      .hero-image-wrap>.hero-dog-rig{
        display:block!important;
        position:absolute!important;
        left:50%!important;
        top:0!important;
        height:100%!important;
        width:auto!important;
        min-width:100%!important;
        aspect-ratio:941/1672!important;
        transform:translateX(-50%)!important;
        border:0!important;
        background:transparent!important;
        pointer-events:none!important;
        z-index:2!important;
        opacity:0!important;
      }
      .hero-image-wrap.hero-dog-rig-ready>.hero-dog-rig{opacity:1!important}
      .hero-image-wrap.hero-dog-rig-ready>img{opacity:0!important}
      .hero.hero-dog-rig-active>.bubble{display:none!important}
    }
  `;
  document.head.appendChild(style);

  let rig = null;
  let rigReady = false;
  let bookingTimer = 0;

  const markRigReady = () => {
    rigReady = true;
    heroWrap.classList.add('hero-dog-rig-ready');
    hero?.classList.add('hero-dog-rig-active');
  };

  const mountRig = () => {
    if (!mobile.matches || rig) return;
    rig = document.createElement('iframe');
    rig.className = 'hero-dog-rig';
    rig.title = 'Happy dog booking animation';
    rig.src = 'assets/mobile-dog-animation/Dog Asset Rig Mobile.dc.html';
    rig.setAttribute('aria-hidden', 'true');
    rig.setAttribute('scrolling', 'no');
    rig.tabIndex = -1;
    rig.addEventListener('load', markRigReady, { once:true });
    heroWrap.appendChild(rig);
  };

  const unmountRig = () => {
    if (mobile.matches) return;
    clearTimeout(bookingTimer);
    heroWrap.classList.remove('hero-dog-rig-ready');
    hero?.classList.remove('hero-dog-rig-active');
    rig?.remove();
    rig = null;
    rigReady = false;
  };

  const sendAssetTrigger = () => rig?.contentWindow?.postMessage('grum-mobile-dog-animate', '*');

  const playExactAssetAnimation = () => {
    if (!rig) mountRig();
    if (rigReady) {
      sendAssetTrigger();
    } else {
      rig?.addEventListener('load', sendAssetTrigger, { once:true });
    }
  };

  const showBooking = () => {
    if (!booking.open) booking.showModal();
    document.body.classList.add('modal-open');
  };

  heroBook.addEventListener('click', (event) => {
    if (!mobile.matches) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    playExactAssetAnimation();
    clearTimeout(bookingTimer);
    bookingTimer = window.setTimeout(showBooking, 450);
  }, { capture:true });

  const syncViewport = () => mobile.matches ? mountRig() : unmountRig();
  if (typeof mobile.addEventListener === 'function') mobile.addEventListener('change', syncViewport);
  else if (typeof mobile.addListener === 'function') mobile.addListener(syncViewport);

  mountRig();
})();
