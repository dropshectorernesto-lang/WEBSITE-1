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

    document.title = config.business?.title || document.title;
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
      navigation.innerHTML = config.navigation.map((item, index) => (
        `<a class="${index === 0 ? 'active' : ''}" href="${escapeAttribute(item.target)}">${item.label}</a>`
      )).join('');
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
        return `<article class="service-card card-${style}${card.featured ? ' featured' : ''}" data-service="${title}" tabindex="0" role="button" aria-label="Book ${title}"><div class="service-number">${card.number || String(index + 1).padStart(2, '0')}</div><img src="${escapeAttribute(card.image)}" alt="${escapeAttribute(card.imageAlt)}" loading="lazy" /><div class="service-info"><div><h3>${card.title}</h3><p>${card.descriptionHtml || ''}</p></div><span class="card-arrow" aria-hidden="true"></span></div></article>`;
      }).join('');
    }
    const select = document.getElementById('serviceSelect');
    if (select && config.services?.cards) {
      select.innerHTML = config.services.cards.map((card) => `<option>${card.title}</option>`).join('');
    }

    setText('.experience-copy .kicker', config.experience?.kicker);
    setHtml('.experience-copy h2', config.experience?.headingHtml);
    setInlineButtonText('.experience-copy .btn', config.experience?.button);
    setImage('.experience-img img', config.experience?.image, config.experience?.imageAlt);

    setText('.gallery-title .kicker', config.gallery?.kicker);
    setText('.gallery-title h2', config.gallery?.heading);
    setImage('.phone-mock', config.gallery?.phoneImage, config.gallery?.phoneAlt);
    const galleryLink = document.querySelector('.gallery-more');
    if (galleryLink) {
      if (config.business?.instagramUrl) galleryLink.href = config.business.instagramUrl;
      if (config.gallery?.linkLabel) galleryLink.firstChild.textContent = `${config.gallery.linkLabel} `;
    }
    const grid = document.querySelector('.ig-grid');
    if (grid && config.gallery?.images) {
      grid.innerHTML = config.gallery.images.map((image) => (
        `<img src="${escapeAttribute(image.src)}" alt="${escapeAttribute(image.alt)}" loading="lazy" />`
      )).join('');
    }

    setText('.final-copy .kicker', config.finalCta?.kicker);
    setText('.final-copy h2', config.finalCta?.heading);
    setText('.final-copy > p:last-child', config.finalCta?.body);
    setText('.final-book strong', config.finalCta?.button);
    setText('.final-book small', config.finalCta?.buttonSmall);
    setImage('.final-dog img', config.finalCta?.image, config.finalCta?.imageAlt);

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

  document.querySelectorAll('[data-book]').forEach((button) => {
    button.addEventListener('click', () => openBooking());
  });

  document.querySelectorAll('.service-card').forEach((card) => {
    const activate = () => openBooking(card.dataset.service);
    card.addEventListener('click', activate);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activate();
      }
    });
  });

  document.querySelector('[data-video]')?.addEventListener('click', () => video?.showModal());
  document.querySelector('[data-close-video]')?.addEventListener('click', () => video?.close());
  document.querySelector('[data-about]')?.addEventListener('click', () => {
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
  });

  [booking, video].filter(Boolean).forEach((dialog) => {
    dialog.addEventListener('click', (event) => {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
        dialog.close();
      }
    });
  });

  const form = document.getElementById('bookingForm');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    booking?.close();
    form.reset();
  });
})();
