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
  let winkTimer = 0;
  let webWink = null;

  const installWebWink = () => {
    try {
      const doc = rig?.contentDocument;
      const root = doc?.querySelector('[data-rig-root="1"]');
      if (!doc || !root) return;

      if (!doc.getElementById('grum-web-wink-style')) {
        const winkStyle = doc.createElement('style');
        winkStyle.id = 'grum-web-wink-style';
        winkStyle.textContent = `
          .grum-web-wink{
            position:absolute;
            left:55.1cqw;
            top:34.1cqw;
            width:14.2cqw;
            height:9.8cqw;
            z-index:30;
            pointer-events:none;
            opacity:0;
            transform:translateY(-10%) rotate(-5.4deg) scaleY(.76);
            transform-origin:51% 55%;
          }
          .grum-web-wink::before{
            content:'';
            position:absolute;
            inset:-8% -6% -4%;
            border-radius:50%;
            background-image:
              radial-gradient(ellipse 62% 54% at 51% 59%,rgba(115,70,39,.10) 0%,rgba(115,70,39,.035) 58%,transparent 88%),
              url('dog-mobile-smile.jpg');
            background-repeat:no-repeat,no-repeat;
            background-size:100% 100%,100cqw 177.69cqw;
            background-position:center,-54.6cqw -25.6cqw;
            -webkit-mask-image:radial-gradient(ellipse 58% 57% at 51% 54%,#000 0%,#000 69%,rgba(0,0,0,.96) 80%,rgba(0,0,0,.46) 92%,transparent 100%);
            mask-image:radial-gradient(ellipse 58% 57% at 51% 54%,#000 0%,#000 69%,rgba(0,0,0,.96) 80%,rgba(0,0,0,.46) 92%,transparent 100%);
            filter:saturate(.98) contrast(.99) brightness(1.01);
          }
          .grum-web-wink::after{
            content:'';
            position:absolute;
            left:18%;
            right:12%;
            top:61%;
            height:.62cqw;
            border-radius:999px 999px 60% 60%;
            background:linear-gradient(180deg,rgba(34,17,7,.48),rgba(66,37,18,.30));
            box-shadow:0 .18cqw .22cqw rgba(43,22,10,.16);
            filter:blur(.07cqw);
            transform:rotate(-1.2deg) scaleX(.94);
            transform-origin:center;
          }
          .grum-web-wink.is-winking{
            animation:grumWebWink 560ms cubic-bezier(.22,.72,.24,1) both;
          }
          @keyframes grumWebWink{
            0%{opacity:0;transform:translateY(-10%) rotate(-5.4deg) scaleY(.72)}
            16%{opacity:1;transform:translateY(0) rotate(-5.4deg) scaleY(1)}
            68%{opacity:1;transform:translateY(1%) rotate(-5.4deg) scaleY(1)}
            100%{opacity:0;transform:translateY(-9%) rotate(-5.4deg) scaleY(.76)}
          }
        `;
        doc.head.appendChild(winkStyle);
      }

      const oldWinkSelectors = [
        '[style*="left: 53.10cqw"][style*="top: 31.19cqw"]',
        '[style*="left: 57.75cqw"][style*="top: 39.07cqw"]',
        '[style*="left: 58.31cqw"][style*="top: 39.77cqw"]',
        '[style*="left: 57.09cqw"][style*="top: 39.64cqw"]'
      ];
      oldWinkSelectors.forEach(selector => {
        doc.querySelectorAll(selector).forEach(node => { node.style.visibility = 'hidden'; });
      });

      webWink = doc.querySelector('.grum-web-wink');
      if (!webWink) {
        webWink = doc.createElement('div');
        webWink.className = 'grum-web-wink';
        webWink.setAttribute('aria-hidden', 'true');
        root.appendChild(webWink);
      }
    } catch (error) {
      webWink = null;
    }
  };

  const playWebWink = () => {
    if (!webWink) installWebWink();
    if (!webWink) return;
    clearTimeout(winkTimer);
    webWink.classList.remove('is-winking');
    void webWink.offsetWidth;
    webWink.classList.add('is-winking');
    winkTimer = window.setTimeout(() => webWink?.classList.remove('is-winking'), 600);
  };

  const markRigReady = () => {
    rigReady = true;
    installWebWink();
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
    clearTimeout(winkTimer);
    heroWrap.classList.remove('hero-dog-rig-ready');
    hero?.classList.remove('hero-dog-rig-active');
    rig?.remove();
    rig = null;
    rigReady = false;
    webWink = null;
  };

  const sendAssetTrigger = () => rig?.contentWindow?.postMessage('grum-mobile-dog-animate', '*');

  const playExactAssetAnimation = () => {
    if (!rig) mountRig();
    if (rigReady) {
      playWebWink();
      sendAssetTrigger();
    } else {
      rig?.addEventListener('load', () => {
        playWebWink();
        sendAssetTrigger();
      }, { once:true });
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
