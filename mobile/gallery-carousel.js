(() => {
  const grid = document.querySelector('.gallery .ig-grid');
  if (!grid || grid.dataset.loopReady === 'true') return;
  grid.dataset.loopReady = 'true';

  const originals = [...grid.children];
  if (originals.length < 2) return;

  const cloneSet = () => originals.map((node) => {
    const clone = node.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.querySelectorAll?.('a').forEach((a) => a.tabIndex = -1);
    if (clone.matches?.('a')) clone.tabIndex = -1;
    return clone;
  });

  cloneSet().forEach((node) => grid.insertBefore(node, grid.firstChild));
  cloneSet().forEach((node) => grid.appendChild(node));

  let setWidth = 0;
  let offset = 0;
  let dragging = false;
  let startX = 0;
  let startOffset = 0;
  let moved = false;
  let resumeAt = 0;
  let lastFrame = performance.now();

  const measure = () => {
    const items = [...grid.children];
    if (items.length < originals.length * 3) return;
    const firstMiddle = items[originals.length];
    const firstAfter = items[originals.length * 2];
    setWidth = firstAfter.offsetLeft - firstMiddle.offsetLeft;
    if (!setWidth) return;
    offset = -setWidth;
    grid.style.transform = `translate3d(${offset}px,0,0)`;
  };

  const normalize = () => {
    if (!setWidth) return;
    while (offset <= -setWidth * 2) offset += setWidth;
    while (offset >= 0) offset -= setWidth;
  };

  const paint = () => {
    normalize();
    grid.style.transform = `translate3d(${offset}px,0,0)`;
  };

  const pointerX = (event) => event.clientX ?? event.touches?.[0]?.clientX ?? 0;

  grid.addEventListener('pointerdown', (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    dragging = true;
    moved = false;
    startX = pointerX(event);
    startOffset = offset;
    resumeAt = performance.now() + 1800;
    grid.classList.add('dragging');
    grid.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  });

  grid.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    const dx = pointerX(event) - startX;
    if (Math.abs(dx) > 4) moved = true;
    offset = startOffset + dx;
    paint();
    event.preventDefault();
  });

  const finish = (event) => {
    if (!dragging) return;
    dragging = false;
    grid.classList.remove('dragging');
    grid.releasePointerCapture?.(event.pointerId);
    normalize();
    paint();
    resumeAt = performance.now() + 1400;
  };

  grid.addEventListener('pointerup', finish);
  grid.addEventListener('pointercancel', finish);
  grid.addEventListener('dragstart', (event) => event.preventDefault());
  grid.addEventListener('click', (event) => {
    if (!moved) return;
    event.preventDefault();
    event.stopPropagation();
    moved = false;
  }, true);

  const tick = (now) => {
    const dt = Math.min(34, now - lastFrame);
    lastFrame = now;
    if (!dragging && now >= resumeAt && setWidth && !document.hidden) {
      offset -= dt * 0.018;
      paint();
    }
    requestAnimationFrame(tick);
  };

  const init = () => {
    measure();
    resumeAt = performance.now() + 700;
  };

  if (document.fonts?.ready) document.fonts.ready.then(init);
  else setTimeout(init, 0);
  addEventListener('resize', init, { passive:true });
  requestAnimationFrame(tick);
})();