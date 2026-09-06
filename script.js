(() => {
  const config = window.SITE_CONFIG;

  if (config) {
    const setText = (selector, value) => {
      const element = document.querySelector(selector);
      if (element && value !== undefined && value !== null) element.textContent = value;
    };
    const setHtml = (selector, value) => {
      const element = document.querySelector(selector);
      if (element && value !== undefined && value !== null) element.innerHTML = value;
    };
    const setImage = (selector, src, alt) => {
      const image = document.querySelector(selector);
      if (!image) return;
      if (src) image.src = src;
      if (alt !== undefined) image.alt = alt;
    };
    const setInlineButtonText = (selector, value) => {
      const button = document.querySelector(selector);
      if (!button || value === undefined || value === null) return;
      const textNode = [...button.childNodes].find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
      if (textNode) textNode.textContent = value;
    };
    const escapeAttribute = (value = '') => String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('"', '&quot;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;');
    const legalMarkup = () => (config.legal || [])
      .map((item) => `<a href="${escapeAttribute(item.target)}" target="_blank" rel="noreferrer">${item.label}</a>`)
      .join('');

    if (document.body?.dataset.page === 'home') document.title = config.business?.title || document.title;
    const description = document.querySelector('meta[name="description"]');
    if (description && config.business?.description) description.content = config.business.description;

    const themeMap = {
      cream: '--cream', surface: '--surface', experience: '--experience', final: '--final',
      green: '--green', greenDark: '--green-dark', pink: '--pink', pinkSoft: '--pink-soft',
      ink: '--ink', orange: '--orange',
    };
    Object.entries(themeMap).forEach(([key, variable]) => {
      if (config.theme?.[key]) document.documentElement.style.setProperty(variable, config.theme[key]);
    });

    setText('.brand', config.business?.name);
    const navigation = document.querySelector('.main-nav');
    if (navigation && config.navigation) {
      const currentPage = (location.pathname.split('/').pop() || 'index.html');
      navigation.innerHTML = config.navigation.map((item) => {
        const [targetPage, targetHash] = String(item.target).split('#');
        const isActive = (targetPage || 'index.html') === currentPage && (!targetHash || location.hash === `#${targetHash}`);
        return `<a class="${isActive ? 'active' : ''}" href="${escapeAttribute(item.target)}">${item.label}</a>`;
      }).join('') + '<button class="btn btn-primary nav-book" type="button" data-book><span class="phone-icon" aria-hidden="true"></span>BOOK APPOINTMENT</button>';
    }

    // Mobile nav: below 851px the header hides .main-nav/.btn-header for space,
    // which left every page unreachable from a phone once About/Services/Gallery/
    // Blog/Contact became real pages instead of same-page anchors. Add a hamburger
    // toggle that reveals the same nav (plus a Book Appointment button) as a
    // dropdown, wired here so it works identically on every page.
    const headerEl = document.querySelector('.site-header');
    if (headerEl && navigation && !headerEl.querySelector('.nav-toggle')) {
      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'nav-toggle';
      toggle.setAttribute('aria-label', 'Open menu');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';
      headerEl.insertBefore(toggle, navigation);
      toggle.addEventListener('click', () => {
        const open = navigation.classList.toggle('open');
        toggle.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      });
      navigation.addEventListener('click', (event) => {
        if (event.target.closest('a')) {
          navigation.classList.remove('open');
          toggle.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    setHtml('#hero-title', config.hero?.headlineHtml);
    setText('.hero-copy > p', config.hero?.subtitle);
    setInlineButtonText('.btn-header', config.hero?.primaryButton);
    setInlineButtonText('.hero-actions .btn-primary', config.hero?.primaryButton);
    setInlineButtonText('.hero-actions .btn-secondary', config.hero?.secondaryButton);
    setImage('.hero-image-wrap img', config.hero?.image, config.hero?.imageAlt);
    setText('.care-chip strong', config.hero?.chipTitle);
    setHtml('.care-chip small', config.hero?.chipTextHtml);

    setText('.services-head .kicker', config.services?.kicker);
    setHtml('.services-head h2', config.services?.headingHtml);
    setHtml('.services-intro p', config.services?.introHtml);
    const servicesLink = document.querySelector('.services-intro a');
    if (servicesLink && config.services?.linkLabel) servicesLink.firstChild.textContent = `${config.services.linkLabel} `;

    const cards = document.getElementById('service-cards');
    if (cards && config.services?.cards) {
      cards.innerHTML = config.services.cards.map((card, index) => {
        const style = ['green', 'black', 'orange'].includes(card.style) ? card.style : 'green';
        const title = escapeAttribute(card.title);
        return `<article class="service-card card-${style}${card.featured ? ' featured' : ''}" data-service="${title}" tabindex="0" role="button" aria-label="Book ${title}"><img src="${escapeAttribute(card.image)}" alt="${escapeAttribute(card.imageAlt)}" loading="lazy" draggable="false" /><div class="service-info"><div><h3>${card.title}</h3><p>${card.descriptionHtml || ''}</p></div></div></article>`;
      }).join('');
    }
    const select = document.getElementById('serviceSelect');
    if (select && config.booking?.serviceOptions) {
      select.innerHTML = config.booking.serviceOptions.map((label) => `<option>${label}</option>`).join('');
    }

    setText('.experience-copy .kicker', config.experience?.kicker);
    setHtml('.experience-copy h2', config.experience?.headingHtml);
    setInlineButtonText('.experience-copy .btn', config.experience?.button);
    setImage('.experience-img img', config.experience?.image, config.experience?.imageAlt);

    setText('.gallery-title .kicker', config.gallery?.kicker);
    setText('.gallery-title h2', config.gallery?.heading);
    setImage('.phone-mock img', config.gallery?.phoneImage, config.gallery?.phoneAlt);
    const galleryLink = document.querySelector('.gallery-more');
    if (galleryLink) {
      if (config.business?.instagramUrl) galleryLink.href = config.business.instagramUrl;
      if (config.gallery?.linkLabel) galleryLink.firstChild.textContent = `${config.gallery.linkLabel} `;
    }
    const grid = document.querySelector('.ig-grid');
    if (grid && config.gallery?.images) {
      grid.innerHTML = config.gallery.images.map((image) => (
        `<a href="gallery.html" aria-label="View ${escapeAttribute(image.alt)} in the gallery"><img src="${escapeAttribute(image.src)}" alt="${escapeAttribute(image.alt)}" loading="lazy" /></a>`
      )).join('');
    }

    setText('.final-copy .kicker', config.finalCta?.kicker);
    setText('.final-copy h2', config.finalCta?.heading);
    setText('.final-copy > p:last-child', config.finalCta?.body);
    setText('.final-book strong', config.finalCta?.button);
    setText('.final-book small', config.finalCta?.buttonSmall);
    setImage('.final-dog img', config.finalCta?.image, config.finalCta?.imageAlt);
    document.querySelectorAll('.final-inner').forEach((inner) => {
      if (!inner.querySelector('.legal-links') && config.legal?.length) {
        const nav = document.createElement('nav');
        nav.className = 'legal-links';
        nav.setAttribute('aria-label', 'Legal links');
        nav.innerHTML = legalMarkup();
        inner.appendChild(nav);
      }
    });
    document.querySelectorAll('.legal-links').forEach((nav) => {
      if (config.legal?.length) nav.innerHTML = legalMarkup();
    });

    setText('#bookingModal .kicker', config.booking?.kicker);
    setText('#bookingModal h2', config.booking?.heading);
    setText('#bookingModal .submit', config.booking?.submitLabel);

    const sections = {
      hero: document.querySelector('.hero'),
      services: document.querySelector('.services'),
      experience: document.querySelector('.experience'),
      gallery: document.querySelector('.gallery'),
      'final-cta': document.querySelector('.final-cta'),
    };
    if (config.layout?.sectionOrder) {
      const enabled = new Set(config.layout.sectionOrder);
      Object.entries(sections).forEach(([name, section]) => {
        if (section) section.hidden = !enabled.has(name);
      });
      const pageMain = document.querySelector('main');
      config.layout.sectionOrder.forEach((name) => {
        if (sections[name]) pageMain.appendChild(sections[name]);
      });
    }
  }

  const booking = document.getElementById('bookingModal');
  const video = document.getElementById('videoModal');
  const serviceDetail = document.getElementById('serviceDetailModal');
  const blogDetail = document.getElementById('blogDetailModal');
  const serviceSelect = document.getElementById('serviceSelect');
  const main = document.querySelector('main');
  const header = document.querySelector('.site-header');
  const BASE_WIDTH = 1024;
  const DESKTOP_MIN = 851;

  const syncReferenceScale = () => {
    const viewport = document.documentElement.clientWidth;
    if (viewport >= DESKTOP_MIN) {
      const scale = viewport / BASE_WIDTH;
      document.body.classList.add('reference-scale');
      if (main) {
        main.style.width = `${BASE_WIDTH}px`;
        main.style.zoom = String(scale);
      }
      if (header) {
        header.style.width = `${BASE_WIDTH}px`;
        header.style.left = '0';
        header.style.transform = 'none';
        header.style.zoom = String(scale);
      }
    } else {
      document.body.classList.remove('reference-scale');
      if (main) {
        main.style.width = '';
        main.style.zoom = '';
      }
      if (header) {
        header.style.width = '';
        header.style.left = '';
        header.style.transform = '';
        header.style.zoom = '';
      }
    }
  };

  syncReferenceScale();
  addEventListener('resize', syncReferenceScale, { passive: true });

  const openBooking = (service) => {
    if (!booking) return;
    if (service && serviceSelect) {
      [...serviceSelect.options].forEach((option, index) => {
        if (option.textContent === service) serviceSelect.selectedIndex = index;
      });
    }
    booking.showModal();
  };

  let activeDetailService = '';
  const serviceDetails = config?.services?.details || {};
  const normalizeService = (service = '') => String(service).replaceAll('&amp;', '&').trim();
  const openServiceDetail = (service) => {
    const title = normalizeService(service);
    const detail = serviceDetails[title];
    if (!serviceDetail || !detail) {
      openBooking(title);
      return;
    }
    activeDetailService = title;
    const titleEl = document.getElementById('serviceDetailTitle');
    const leadEl = document.getElementById('serviceDetailLead');
    const includesEl = document.getElementById('serviceDetailIncludes');
    const pricesEl = document.getElementById('serviceDetailPrices');
    if (titleEl) titleEl.textContent = `${title}.`;
    if (leadEl) leadEl.textContent = detail.lead || '';
    if (includesEl) includesEl.innerHTML = (detail.includes || []).map((item) => `<li>${escapeAttribute(item)}</li>`).join('');
    if (pricesEl) {
      pricesEl.innerHTML = (detail.pricing || []).map(([label, price]) => (
        `<div class="price-row"><span>${escapeAttribute(label)}</span><strong>${escapeAttribute(price)}</strong></div>`
      )).join('');
    }
    serviceDetail.showModal();
  };

  document.querySelectorAll('[data-book]').forEach((button) => {
    button.addEventListener('click', () => openBooking());
  });

  document.querySelector('[data-close-service]')?.addEventListener('click', () => serviceDetail?.close());
  document.querySelector('[data-service-detail-book]')?.addEventListener('click', () => {
    serviceDetail?.close();
    openBooking(activeDetailService);
  });

  const openBlogDetail = (post) => {
    if (!blogDetail) return;
    const title = post.dataset.blogTitle || post.querySelector('h3')?.textContent || 'Blog post';
    const category = post.dataset.blogCategory || post.querySelector('.blog-date')?.textContent || 'Blog';
    const image = post.dataset.blogImage || post.querySelector('img')?.getAttribute('src') || '';
    const titleEl = document.getElementById('blogDetailTitle');
    const categoryEl = document.getElementById('blogDetailCategory');
    const imageEl = document.getElementById('blogDetailImage');
    const bodyEl = document.getElementById('blogDetailBody');
    if (titleEl) titleEl.textContent = title;
    if (categoryEl) categoryEl.innerHTML = category;
    if (imageEl && image) {
      imageEl.src = image;
      imageEl.alt = title;
    }
    if (bodyEl) {
      bodyEl.innerHTML = (post.dataset.blogBody || '').split('|')
        .filter(Boolean)
        .map((paragraph) => `<p>${escapeAttribute(paragraph)}</p>`)
        .join('');
    }
    blogDetail.showModal();
  };
  document.querySelector('[data-close-blog]')?.addEventListener('click', () => blogDetail?.close());
  document.querySelectorAll('.blog-post').forEach((post) => {
    post.addEventListener('click', () => openBlogDetail(post));
    post.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openBlogDetail(post);
      }
    });
  });

  const activateServiceCard = (card) => openBooking(card.dataset.service);
  document.querySelectorAll('.service-card').forEach((card) => {
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activateServiceCard(card);
      }
    });
  });

  const carousel = document.querySelector('.service-carousel');
  const track = document.querySelector('.service-cards');
  const carouselCards = [...document.querySelectorAll('.service-card')];
  const pager = document.querySelector('.pager');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeSlide = 0;
  let railX = 0;
  let dragStartX = 0;
  let dragStartRailX = 0;
  let dragging = false;
  let dragged = false;
  let pressedCard = null;

  const cardOffset = (index) => carouselCards[index]?.offsetLeft || 0;
  const maxRail = () => Math.max(0, (track?.scrollWidth || 0) - (carousel?.clientWidth || 0));
  const targetFor = (index) => Math.min(maxRail(), Math.max(0, cardOffset(index) - 16));
  const slidePositions = () => {
    const end = Math.round(maxRail());
    return [0, Math.round(end / 3), Math.round((end * 2) / 3), end];
  };
  const nearestSlide = (position) => slidePositions().reduce((best, target, index, positions) => (
    Math.abs(target - position) < Math.abs(positions[best] - position) ? index : best
  ), 0);
  const paintRail = () => {
    if (track) track.style.transform = `translate3d(${-railX}px,0,0)`;
    pager?.querySelectorAll('button').forEach((button, index) => {
      button.classList.toggle('active', index === activeSlide);
      button.setAttribute('aria-current', index === activeSlide ? 'true' : 'false');
    });
  };
  const goToSlide = (index) => {
    const positions = slidePositions();
    activeSlide = Math.max(0, Math.min(positions.length - 1, index));
    railX = positions[activeSlide] || 0;
    paintRail();
  };

  if (carousel && track && carouselCards.length) {
    carousel.addEventListener('dragstart', (event) => event.preventDefault());
    carousel.addEventListener('selectstart', (event) => event.preventDefault());
    if (pager) {
      pager.innerHTML = slidePositions().map((position, index) => `<button type="button" aria-label="Show service group ${index + 1}"></button>`).join('');
      pager.querySelectorAll('button').forEach((button, index) => button.addEventListener('click', () => goToSlide(index)));
    }
    carousel.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return;
      event.preventDefault();
      dragging = true;
      dragged = false;
      pressedCard = event.target.closest('.service-card');
      dragStartX = event.clientX;
      dragStartRailX = railX;
      carousel.setPointerCapture(event.pointerId);
      carousel.classList.add('dragging');
    });
    carousel.addEventListener('pointermove', (event) => {
      if (!dragging) return;
      const delta = event.clientX - dragStartX;
      if (Math.abs(delta) > 5) dragged = true;
      railX = Math.max(0, Math.min(maxRail(), dragStartRailX - delta));
      activeSlide = nearestSlide(railX);
      paintRail();
    });
    const finishDrag = (event) => {
      if (!dragging) return;
      const wasDragged = dragged;
      const card = pressedCard;
      dragging = false;
      pressedCard = null;
      carousel.classList.remove('dragging');
      if (carousel.hasPointerCapture(event.pointerId)) carousel.releasePointerCapture(event.pointerId);
      goToSlide(nearestSlide(railX));
      if (!wasDragged && card) activateServiceCard(card);
    };
    carousel.addEventListener('pointerup', finishDrag);
    carousel.addEventListener('pointercancel', finishDrag);
    carousel.addEventListener('click', (event) => {
      if (dragged) {
        event.preventDefault();
        event.stopPropagation();
        dragged = false;
        return;
      }
      const card = event.target.closest('.service-card');
      if (card) activateServiceCard(card);
    }, true);
    addEventListener('resize', () => goToSlide(activeSlide), { passive: true });
    goToSlide(0);
  }

  document.querySelectorAll('.svc-card').forEach((card) => {
    const openDetail = () => openServiceDetail(card.dataset.service);
    card.addEventListener('click', openDetail);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openDetail();
      }
    });
  });

  let scrollFrame = 0;
  const updateScrollMotion = () => {
    scrollFrame = 0;
    if (reducedMotion) return;
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image-wrap img');
    if (hero && heroImage) {
      const travelled = Math.max(0, Math.min(1, -hero.getBoundingClientRect().top / (hero.offsetHeight * .72)));
      heroImage.style.transform = `scale(${(1 + travelled * .045).toFixed(4)}) translate3d(0,${(-travelled * 1.2).toFixed(3)}%,0)`;
      document.querySelectorAll('.bubble').forEach((bubble, index) => {
        bubble.style.transform = `translate3d(0,${(travelled * (index % 2 ? -9 : -5)).toFixed(2)}px,0)`;
      });
    }
    carouselCards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const proximity = Math.max(0, Math.min(1, 1 - Math.abs(rect.top + rect.height / 2 - innerHeight * .55) / (innerHeight * .7)));
      card.style.setProperty('--scroll-lift', `${(-proximity * 8).toFixed(2)}px`);
      card.style.setProperty('--scroll-scale', (1 + proximity * .035).toFixed(4));
    });
  };
  const queueScrollMotion = () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollMotion);
  };
  addEventListener('scroll', queueScrollMotion, { passive: true });
  addEventListener('resize', queueScrollMotion, { passive: true });
  queueScrollMotion();

  document.querySelector('[data-video]')?.addEventListener('click', () => video?.showModal());
  document.querySelector('[data-close-video]')?.addEventListener('click', () => video?.close());
  document.querySelector('[data-about]')?.addEventListener('click', () => {
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
  });

  [booking, video, serviceDetail, blogDetail].filter(Boolean).forEach((dialog) => {
    dialog.addEventListener('click', (event) => {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
        dialog.close();
      }
    });
  });

  const form = document.getElementById('bookingForm');
  form?.addEventListener('submit', (event) => {
    // The "x" close button is also type="submit" (method="dialog" needs a submit
    // button to trigger the native close), so only run the request-appointment
    // validation/close-and-reset flow for the actual submit — let the cancel
    // button's own formnovalidate + native dialog close happen untouched.
    if (event.submitter && event.submitter.value === 'cancel') return;
    event.preventDefault();
    if (!form.reportValidity()) return;
    booking?.close();
    form.reset();
  });
})();
