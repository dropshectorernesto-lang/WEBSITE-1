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
            left:56.15cqw;
            top:36.05cqw;
            width:10.9cqw;
            height:6.1cqw;
            z-index:30;
            pointer-events:none;
            opacity:0;
            transform:translateY(-14%) rotate(-5.3deg) scaleY(.72);
            transform-origin:50% 46%;
            filter:saturate(.98) contrast(.99);
          }
          .grum-web-wink::before{
            content:'';
            position:absolute;
            inset:-22% -11% -20%;
            border-radius:50%;
            background-image:url('dog-mobile-smile.jpg');
            background-repeat:no-repeat;
            background-size:100cqw 177.69cqw;
            background-position:-55.55cqw -31.9cqw;
            -webkit-mask-image:radial-gradient(ellipse 48% 46% at 51% 53%,#000 0%,#000 63%,rgba(0,0,0,.65) 78%,transparent 100%);
            mask-image:radial-gradient(ellipse 48% 46% at 51% 53%,#000 0%,#000 63%,rgba(0,0,0,.65) 78%,transparent 100%);
          }
          .grum-web-wink::after{
            content:'';
            position:absolute;
            left:17%;
            right:10%;
            top:57%;
            height:.52cqw;
            border-radius:999px;
            background:linear-gradient(180deg,rgba(35,18,8,.44),rgba(63,34,17,.26));
            box-shadow:0 .13cqw .17cqw rgba(43,22,10,.15);
            filter:blur(.08cqw);
            transform:rotate(-1deg) scaleX(.92);
            transform-origin:center;
          }
          .grum-web-wink.is-winking{
            animation:grumWebWink 500ms cubic-bezier(.22,.7,.25,1) both;
          }
          @keyframes grumWebWink{
            0%{opacity:0;transform:translateY(-14%) rotate(-5.3deg) scaleY(.72)}
            18%{opacity:1;transform:translateY(1%) rotate(-5.3deg) scaleY(1)}
            62%{opacity:1;transform:translateY(2%) rotate(-5.3deg) scaleY(1)}
            100%{opacity:0;transform:translateY(-12%) rotate(-5.3deg) scaleY(.78)}
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
    winkTimer = window.setTimeout(() => webWink?.classList.remove('is-winking'), 540);
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
