(() => {
  if (document.body?.dataset.page !== 'home') return;
  const strip = document.querySelector('.ig-grid');
  if (!strip) return;

  const images = [
    ['https://images.pexels.com/photos/485294/pexels-photo-485294.jpeg?auto=compress&cs=tinysrgb&w=900','Funny Chihuahua in a bath with a foam hat'],
    ['https://images.pexels.com/photos/12943750/pexels-photo-12943750.jpeg?auto=compress&cs=tinysrgb&w=900','Cute dog sitting in a bubble bath with shampoo'],
    ['https://images.pexels.com/photos/17802173/pexels-photo-17802173.jpeg?auto=compress&cs=tinysrgb&w=900','Two adorable poodles surrounded by bubbles'],
    ['https://images.pexels.com/photos/19145882/pexels-photo-19145882.jpeg?auto=compress&cs=tinysrgb&w=900','Small dog getting a professional grooming bath'],
    ['https://images.pexels.com/photos/6816870/pexels-photo-6816870.jpeg?auto=compress&cs=tinysrgb&w=900','Cute Yorkshire Terrier getting a haircut with scissors'],
    ['https://images.pexels.com/photos/36174558/pexels-photo-36174558.jpeg?auto=compress&cs=tinysrgb&w=900','Funny Maltese enjoying a bath in a red bucket'],
    ['https://images.pexels.com/photos/19145874/pexels-photo-19145874.jpeg?auto=compress&cs=tinysrgb&w=900','Curly poodle waiting in a grooming studio'],
    ['https://images.pexels.com/photos/6131151/pexels-photo-6131151.jpeg?auto=compress&cs=tinysrgb&w=900','Tiny dog being gently shampooed in a sink']
  ];

  const buildItems = () => {
    strip.innerHTML = '';
    const makeSet = () => images.forEach(([src, alt]) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = alt;
      img.loading = 'lazy';
      img.draggable = false;
      strip.appendChild(img);
    });
    makeSet();
    makeSet();
    makeSet();
  };

  buildItems();
  strip.classList.add('ig-infinite-carousel');

  let x = 0;
  let setWidth = 0;
  let dragging = false;
  let startX = 0;
  let startOffset = 0;
  let lastT = performance.now();
  const speed = 18;

  const measure = () => {
    const first = strip.children[0];
    const ninth = strip.children[images.length];
    if (!first || !ninth) return;
    setWidth = ninth.offsetLeft - first.offsetLeft;
    if (setWidth > 0 && x === 0) x = -setWidth;
  };

  const normalize = () => {
    if (!setWidth) return;
    while (x > -setWidth * .35) x -= setWidth;
    while (x < -setWidth * 1.65) x += setWidth;
  };

  const paint = () => {
    normalize();
    strip.style.transform = `translate3d(${x}px,0,0)`;
  };

  const frame = (now) => {
    const dt = Math.min(50, now - lastT) / 1000;
    lastT = now;
    if (!dragging && !document.hidden) {
      x -= speed * dt;
      paint();
    }
    requestAnimationFrame(frame);
  };

  strip.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    dragging = true;
    startX = event.clientX;
    startOffset = x;
    strip.setPointerCapture?.(event.pointerId);
    strip.classList.add('is-dragging');
  });

  strip.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    x = startOffset + (event.clientX - startX);
    paint();
  });

  const endDrag = (event) => {
    if (!dragging) return;
    dragging = false;
    strip.classList.remove('is-dragging');
    if (event?.pointerId != null && strip.hasPointerCapture?.(event.pointerId)) {
      strip.releasePointerCapture(event.pointerId);
    }
    normalize();
  };
  strip.addEventListener('pointerup', endDrag);
  strip.addEventListener('pointercancel', endDrag);
  strip.addEventListener('lostpointercapture', endDrag);

  strip.addEventListener('wheel', (event) => {
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
      event.preventDefault();
      x -= event.deltaX;
      paint();
    }
  }, { passive:false });

  addEventListener('resize', () => {
    const previous = setWidth;
    measure();
    if (previous && setWidth) x = x / previous * setWidth;
    paint();
  }, { passive:true });

  requestAnimationFrame(() => {
    measure();
    paint();
    requestAnimationFrame(frame);
  });
})();
