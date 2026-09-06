(() => {
  if (document.body?.dataset.page !== 'home') return;
  const strip = document.querySelector('.ig-grid');
  const dragSurface = strip?.closest('.gallery-inner');
  if (!strip || !dragSurface) return;

  /* Make the Bath & Brush image robustly visible on the homepage after the
     config layer has rebuilt the cards. */
  const bathImage = document.querySelector('#service-cards img[src$="service-bath.jpg"]');
  if (bathImage) {
    bathImage.src = 'https://images.pexels.com/photos/16544122/pexels-photo-16544122.jpeg?auto=compress&cs=tinysrgb&w=1200';
    bathImage.alt = 'Cute white dog wrapped in a towel after a bath';
  }

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

  const applyImages = () => {
    [...strip.querySelectorAll('img')].forEach((img, index) => {
      const [src, alt] = images[index % images.length];
      img.src = src;
      img.alt = alt;
      img.loading = 'lazy';
      img.draggable = false;
      img.setAttribute('draggable', 'false');
    });
  };

  const buildItems = () => {
    strip.innerHTML = '';
    const makeSet = () => images.forEach(([src, alt]) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = alt;
      img.loading = 'lazy';
      img.draggable = false;
      img.setAttribute('draggable', 'false');
      strip.appendChild(img);
    });
    makeSet();
    makeSet();
    makeSet();
  };

  buildItems();
  strip.classList.add('ig-infinite-carousel');

  /* Never allow the browser's native image-drag ghost. */
  dragSurface.addEventListener('dragstart', (event) => event.preventDefault());

  /* Another localization layer also touches .ig-grid images. Always restore this
     approved carousel set after a language switch so EN/DE/ES look identical. */
  new MutationObserver(() => setTimeout(applyImages, 0)).observe(document.documentElement, {
    attributes:true,
    attributeFilter:['lang']
  });

  let x = 0;
  let setWidth = 0;
  let dragging = false;
  let startX = 0;
  let startOffset = 0;
  let lastT = performance.now();
  const speed = 9; // half the previous speed

  const measure = () => {
    const first = strip.children[0];
    const nextSet = strip.children[images.length];
    if (!first || !nextSet) return;
    setWidth = nextSet.offsetLeft - first.offsetLeft;
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

  const isInteractiveOverlay = (target) => Boolean(target.closest('.phone-mock, .gallery-title, .gallery-more'));

  /* Use the whole visible carousel area as the drag surface, while keeping the
     phone and Instagram link fully clickable. This makes mouse/touch dragging
     much easier than requiring the pointer to land on the moving track itself. */
  dragSurface.addEventListener('pointerdown', (event) => {
    if (event.button !== 0 || isInteractiveOverlay(event.target)) return;
    event.preventDefault();
    dragging = true;
    startX = event.clientX;
    startOffset = x;
    dragSurface.setPointerCapture?.(event.pointerId);
    strip.classList.add('is-dragging');
  });

  dragSurface.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    event.preventDefault();
    x = startOffset + (event.clientX - startX);
    paint();
  });

  const endDrag = (event) => {
    if (!dragging) return;
    dragging = false;
    strip.classList.remove('is-dragging');
    if (event?.pointerId != null && dragSurface.hasPointerCapture?.(event.pointerId)) {
      dragSurface.releasePointerCapture(event.pointerId);
    }
    normalize();
    paint();
  };
  dragSurface.addEventListener('pointerup', endDrag);
  dragSurface.addEventListener('pointercancel', endDrag);
  dragSurface.addEventListener('lostpointercapture', endDrag);

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
    applyImages();
    measure();
    paint();
    requestAnimationFrame(frame);
  });
})();
