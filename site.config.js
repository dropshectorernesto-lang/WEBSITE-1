/* Shared HTML escaper used by config rendering and detail modals. */
var escapeAttribute = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

/* Load the review refinements after the base styles on every page. */
(() => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'enhancements.css';
  document.head.appendChild(link);
})();

/* Edit this file to update site copy, images, links, colors, or section order. */
window.SITE_CONFIG = {
  business: {
    name: 'grüm',
    title: 'Grüm — Dog Grooming',
    description: 'Grüm dog grooming — tailored grooming, bathing and coat care.',
    instagramUrl: 'https://www.instagram.com/',
  },

  theme: {
    cream: '#f3ebe7',
    surface: '#f3ebe7',
    experience: '#e8ddd6',
    final: '#f3ece8',
    green: '#01463c',
    greenDark: '#01463c',
    pink: '#f87686',
    pinkSoft: '#f7a7b1',
    ink: '#222121',
    orange: '#f26312',
  },

  layout: {
    sectionOrder: ['hero', 'services', 'experience', 'gallery', 'final-cta'],
  },

  navigation: [
    { label: 'HOME', target: 'index.html' },
    { label: 'ABOUT', target: 'about.html' },
    { label: 'SERVICES', target: 'services.html' },
    { label: 'GALLERY', target: 'gallery.html' },
    { label: 'BLOG', target: 'blog.html' },
    { label: 'CONTACT', target: 'contact.html' },
  ],

  hero: {
    headlineHtml: '<img class="hero-headline-img" src="assets/hero-headline-tailored-hd.png" alt="Tailored grooming for distinguished pets" />',
    subtitle: 'Luxury care. Happy tails.',
    primaryButton: 'BOOK APPOINTMENT',
    secondaryButton: 'WATCH VIDEO',
    image: 'assets/hero-clean.png',
    imageAlt: 'Golden retriever being washed with bubbles',
    chipTitle: 'ONE-ON-ONE CARE',
    chipTextHtml: 'Each pet enjoys our<br>undivided attention.',
  },

  services: {
    kicker: 'OUR SERVICES',
    headingHtml: 'DOG GROOMING,<br><span>BATHING &amp; COAT CARE</span>',
    introHtml: 'From refreshing baths to complete makeovers,<br>we provide exceptional care tailored to<br>your pet’s unique needs.',
    linkLabel: 'VIEW ALL SERVICES',
    cards: [
      { number: '01', title: 'BATH & BRUSH', descriptionHtml: 'A relaxing bath, gentle cleanse<br>and thorough brushing for a<br>fresh, healthy coat.', image: 'assets/service-bath.jpg', imageAlt: 'White dog wrapped in a towel', style: 'green' },
      { number: '02', title: 'HAIRCUT & STYLING', descriptionHtml: 'Custom haircuts and styling<br>designed to bring out your pet’s<br>best look.', image: 'assets/service-hair.jpg', imageAlt: 'Fluffy pomeranian dog', style: 'black', featured: true },
      { number: '03', title: 'NAIL CLIPPING', descriptionHtml: 'Safe, precise nail trimming<br>to keep your pet comfortable<br>and confident.', image: 'assets/service-nails.jpg', imageAlt: 'Small dog having nails clipped', style: 'orange' },
      { number: '04', title: 'TEETH CLEANING', descriptionHtml: 'Gentle oral care for fresher<br>breath and a happier,<br>healthier smile.', image: 'assets/service-teeth-cleaning.png', imageAlt: 'Smiling white dog ready for teeth cleaning', style: 'green' },
      { number: '05', title: 'DE-SHEDDING', descriptionHtml: 'A deep coat treatment to<br>remove loose fur and leave<br>your pet feeling lighter.', image: 'assets/ig-4.jpg', imageAlt: 'Golden retriever during a bath', style: 'black', featured: true },
      { number: '06', title: 'PUPPY INTRO', descriptionHtml: 'A calm first visit designed<br>to build trust and make<br>grooming feel easy.', image: 'assets/ig-5.jpg', imageAlt: 'Freshly groomed puppy', style: 'orange' },
    ],
    details: {
      'BATH & BRUSH': {
        lead: 'A gentle reset for a clean coat, fresh scent, and softer brush-out.',
        includes: ['Warm bath with coat-safe shampoo', 'Conditioning rinse', 'Blow dry', 'Full brush-out', 'Light finishing spray'],
        pricing: [['Small dogs', '$35+'], ['Medium dogs', '$45+'], ['Large dogs', '$60+']]
      },
      'HAIRCUT & STYLING': {
        lead: 'A full grooming appointment shaped around your dog’s coat, comfort, and style.',
        includes: ['Bath and blow dry', 'Breed or custom haircut', 'Face, feet, and sanitary trim', 'Brush-out and styling finish', 'Nail check'],
        pricing: [['Small dogs', '$55+'], ['Medium dogs', '$70+'], ['Large dogs', '$90+']]
      },
      'NAIL CLIPPING': {
        lead: 'Quick, careful nail care to keep paws comfortable and movement easy.',
        includes: ['Nail trim', 'Gentle paw handling', 'Optional file/smoothing when needed', 'Quick comfort check'],
        pricing: [['All small dogs', '$15+'], ['Medium dogs', '$18+'], ['Large dogs', '$22+']]
      },
      'TEETH CLEANING': {
        lead: 'A light oral-care add-on for fresher breath and a brighter smile.',
        includes: ['Gentle tooth brushing', 'Pet-safe oral care products', 'Breath refresh', 'Visual mouth comfort check'],
        pricing: [['All sizes', '$20+'], ['With grooming service', '$15+']]
      },
      'EAR CLEANING': {
        lead: 'A calm ear clean that helps keep ears fresh and irritation-free.',
        includes: ['Outer-ear cleaning', 'Pet-safe cleaner', 'Gentle wipe-out', 'Comfort check before finishing'],
        pricing: [['All sizes', '$15+'], ['With grooming service', '$12+']]
      },
      'DE-SHEDDING TREATMENT': {
        lead: 'A deeper coat service for loose undercoat, seasonal shedding, and a cleaner home.',
        includes: ['De-shedding shampoo', 'Conditioning treatment', 'High-velocity dry', 'Undercoat brush-out', 'Finishing comb-through'],
        pricing: [['Small dogs', '$40+'], ['Medium dogs', '$55+'], ['Large dogs', '$75+']]
      }
    },
  },

  experience: {
    kicker: 'THE GRÜM EXPERIENCE',
    headingHtml: 'MORE THAN A GROOM.<br>IT’S A MOMENT OF <span>CARE.</span>',
    button: 'LEARN MORE ABOUT US',
    image: 'assets/experience-banner.jpg',
    imageAlt: 'Golden retriever enjoying a grooming treatment',
  },

  gallery: {
    kicker: 'FOLLOW OUR JOURNEY!',
    heading: 'ON INSTAGRAM',
    linkLabel: 'VIEW MORE ON INSTAGRAM',
    phoneImage: 'assets/instagram-phone.png',
    phoneAlt: 'Grüm Instagram profile on a phone',
    images: [
      { src: 'assets/ig-1.jpg', alt: 'Dog grooming Instagram post' },
      { src: 'assets/ig-2.jpg', alt: 'Dog grooming Instagram post' },
      { src: 'assets/ig-3.jpg', alt: 'Grüm grooming products' },
      { src: 'assets/ig-4.jpg', alt: 'Golden retriever bathing' },
      { src: 'assets/ig-5.jpg', alt: 'Groomed poodle' },
      { src: 'assets/ig-6.jpg', alt: 'Grüm grooming studio' },
    ],
  },

  finalCta: {
    kicker: 'READY FOR THEIR',
    heading: 'BEST DAY EVER?',
    body: 'We can’t wait to meet your best friend.',
    button: 'BOOK APPOINTMENT',
    buttonSmall: 'CLICK TO BOOK',
    image: 'assets/footer-dog-cutout.png',
    imageAlt: 'Happy golden retriever',
  },

  legal: [
    { label: 'Privacy Policy', target: 'privacy-policy.html' },
    { label: 'Terms & Conditions', target: 'terms-and-conditions.html' },
  ],

  booking: {
    kicker: 'BOOK THEIR BEST DAY',
    heading: 'REQUEST AN APPOINTMENT.',
    submitLabel: 'REQUEST APPOINTMENT',
    serviceOptions: ['BATH & BRUSH', 'HAIRCUT & STYLING', 'NAIL CLIPPING', 'TEETH CLEANING', 'EAR CLEANING', 'DE-SHEDDING TREATMENT'],
  },
};

/* Gallery lightbox: click any gallery tile to enlarge, then browse with arrows/keyboard. */
(() => {
  const tiles = [...document.querySelectorAll('.photo-grid .photo-tile img')];
  if (!tiles.length) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'gallery-lightbox';
  dialog.innerHTML = `
    <div class="gallery-lightbox-shell">
      <button class="gallery-lightbox-close" type="button" aria-label="Close gallery">×</button>
      <button class="gallery-lightbox-arrow gallery-lightbox-prev" type="button" aria-label="Previous image">‹</button>
      <img class="gallery-lightbox-image" alt="" />
      <button class="gallery-lightbox-arrow gallery-lightbox-next" type="button" aria-label="Next image">›</button>
    </div>`;
  document.body.appendChild(dialog);

  const image = dialog.querySelector('.gallery-lightbox-image');
  let activeIndex = 0;

  const show = (index) => {
    activeIndex = (index + tiles.length) % tiles.length;
    image.src = tiles[activeIndex].currentSrc || tiles[activeIndex].src;
    image.alt = tiles[activeIndex].alt || 'Gallery image';
  };
  const open = (index) => {
    show(index);
    dialog.showModal();
  };

  tiles.forEach((tile, index) => {
    tile.tabIndex = 0;
    tile.setAttribute('role', 'button');
    tile.setAttribute('aria-label', `${tile.alt || 'Gallery image'} — open larger`);
    tile.addEventListener('click', () => open(index));
    tile.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open(index);
      }
    });
  });

  dialog.querySelector('.gallery-lightbox-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.gallery-lightbox-prev').addEventListener('click', () => show(activeIndex - 1));
  dialog.querySelector('.gallery-lightbox-next').addEventListener('click', () => show(activeIndex + 1));
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') show(activeIndex - 1);
    if (event.key === 'ArrowRight') show(activeIndex + 1);
    if (event.key === 'Escape') dialog.close();
  });
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
})();

/* Make blog article CTA transition cleanly into the booking modal. */
(() => {
  const articleDialog = document.getElementById('blogDetailModal');
  const articleBook = articleDialog?.querySelector('.blog-detail-book');
  articleBook?.addEventListener('click', () => articleDialog.close(), { capture: true });
})();

/* Functional EN / DE / ES selector with visible on-page translations. */
(() => {
  const footerInner = document.querySelector('.final-cta .final-inner');
  if (!footerInner || footerInner.querySelector('.language-switcher')) return;

  const translations = {
    en: {
      nav: ['HOME','ABOUT','SERVICES','GALLERY','BLOG','CONTACT'],
      heroSubtitle: 'Luxury care. Happy tails.',
      book: 'BOOK APPOINTMENT', watch: 'WATCH VIDEO', chipTitle: 'ONE-ON-ONE CARE', chipText: 'Each pet enjoys our<br>undivided attention.',
      servicesKicker: 'OUR SERVICES', servicesHeading: 'DOG GROOMING,<br><span>BATHING &amp; COAT CARE</span>', servicesIntro: 'From refreshing baths to complete makeovers,<br>we provide exceptional care tailored to<br>your pet’s unique needs.', servicesLink: 'VIEW ALL SERVICES',
      experienceKicker: 'THE GRÜM EXPERIENCE', experienceHeading: 'MORE THAN A GROOM.<br>IT’S A MOMENT OF <span>CARE.</span>', learnMore: 'LEARN MORE ABOUT US',
      galleryKicker: 'FOLLOW OUR JOURNEY!', galleryHeading: 'ON INSTAGRAM', galleryMore: 'VIEW MORE ON INSTAGRAM',
      finalKicker: 'READY FOR THEIR', finalHeading: 'BEST DAY EVER?', finalBody: 'We can’t wait to meet your best friend.', clickToBook: 'CLICK TO BOOK', privacy: 'Privacy Policy', terms: 'Terms & Conditions',
      bookingKicker: 'BOOK THEIR BEST DAY', bookingHeading: 'REQUEST AN APPOINTMENT.', request: 'REQUEST APPOINTMENT'
    },
    de: {
      nav: ['START','ÜBER UNS','SERVICES','GALERIE','BLOG','KONTAKT'],
      heroSubtitle: 'Luxuriöse Pflege. Glückliche Pfoten.',
      book: 'TERMIN BUCHEN', watch: 'VIDEO ANSEHEN', chipTitle: 'INDIVIDUELLE BETREUUNG', chipText: 'Jedes Tier bekommt unsere<br>volle Aufmerksamkeit.',
      servicesKicker: 'UNSERE SERVICES', servicesHeading: 'HUNDEPFLEGE,<br><span>BAD & FELLPFLEGE</span>', servicesIntro: 'Vom erfrischenden Bad bis zum kompletten Styling –<br>wir passen jede Behandlung individuell<br>an die Bedürfnisse deines Hundes an.', servicesLink: 'ALLE SERVICES ANSEHEN',
      experienceKicker: 'DAS GRÜM ERLEBNIS', experienceHeading: 'MEHR ALS PFLEGE.<br>EIN MOMENT VOLLER <span>FÜRSORGE.</span>', learnMore: 'MEHR ÜBER UNS',
      galleryKicker: 'FOLGE UNSERER REISE!', galleryHeading: 'AUF INSTAGRAM', galleryMore: 'MEHR AUF INSTAGRAM',
      finalKicker: 'BEREIT FÜR DEN', finalHeading: 'BESTEN TAG?', finalBody: 'Wir freuen uns darauf, deinen besten Freund kennenzulernen.', clickToBook: 'JETZT BUCHEN', privacy: 'Datenschutz', terms: 'AGB',
      bookingKicker: 'BUCHE DEN BESTEN TAG', bookingHeading: 'TERMIN ANFRAGEN.', request: 'TERMIN ANFRAGEN'
    },
    es: {
      nav: ['INICIO','NOSOTROS','SERVICIOS','GALERÍA','BLOG','CONTACTO'],
      heroSubtitle: 'Cuidado premium. Colitas felices.',
      book: 'RESERVAR CITA', watch: 'VER VIDEO', chipTitle: 'ATENCIÓN INDIVIDUAL', chipText: 'Cada mascota recibe<br>toda nuestra atención.',
      servicesKicker: 'NUESTROS SERVICIOS', servicesHeading: 'PELUQUERÍA CANINA,<br><span>BAÑO & CUIDADO DEL PELO</span>', servicesIntro: 'Desde baños refrescantes hasta cambios completos,<br>adaptamos cada servicio a las necesidades<br>únicas de tu mascota.', servicesLink: 'VER TODOS LOS SERVICIOS',
      experienceKicker: 'LA EXPERIENCIA GRÜM', experienceHeading: 'MÁS QUE PELUQUERÍA.<br>UN MOMENTO DE <span>CUIDADO.</span>', learnMore: 'CONÓCENOS MEJOR',
      galleryKicker: '¡SIGUE NUESTRO CAMINO!', galleryHeading: 'EN INSTAGRAM', galleryMore: 'VER MÁS EN INSTAGRAM',
      finalKicker: '¿LISTO PARA SU', finalHeading: 'MEJOR DÍA?', finalBody: 'Tenemos muchas ganas de conocer a tu mejor amigo.', clickToBook: 'HAZ CLIC PARA RESERVAR', privacy: 'Privacidad', terms: 'Términos y condiciones',
      bookingKicker: 'RESERVA SU MEJOR DÍA', bookingHeading: 'SOLICITAR UNA CITA.', request: 'SOLICITAR CITA'
    }
  };

  const supported = Object.keys(translations);
  const saved = localStorage.getItem('grum-language');
  const initial = supported.includes(saved) ? saved : 'en';

  const nav = document.createElement('nav');
  nav.className = 'language-switcher';
  nav.setAttribute('aria-label', 'Language selector');
  nav.innerHTML = '<button type="button" data-lang="en">EN</button><span aria-hidden="true">/</span><button type="button" data-lang="de">DE</button><span aria-hidden="true">/</span><button type="button" data-lang="es">ES</button>';
  footerInner.appendChild(nav);

  const setText = (selector, value) => { const el = document.querySelector(selector); if (el && value != null) el.textContent = value; };
  const setHTML = (selector, value) => { const el = document.querySelector(selector); if (el && value != null) el.innerHTML = value; };

  const applyLanguage = (lang) => {
    const t = translations[lang] || translations.en;
    document.documentElement.lang = lang;
    localStorage.setItem('grum-language', lang);

    document.querySelectorAll('.main-nav a').forEach((link, index) => { if (t.nav[index]) link.textContent = t.nav[index]; });
    setText('.hero-copy > p', t.heroSubtitle);
    setText('.btn-header', t.book);
    setText('.hero-actions .btn-primary', t.book);
    setText('.hero-actions .btn-secondary', t.watch);
    setText('.care-chip strong', t.chipTitle);
    setHTML('.care-chip small', t.chipText);

    setText('.services-head .kicker', t.servicesKicker);
    setHTML('.services-head h2', t.servicesHeading);
    setHTML('.services-intro p', t.servicesIntro);
    const servicesLink = document.querySelector('.services-intro a');
    if (servicesLink) servicesLink.firstChild.textContent = `${t.servicesLink} `;

    setText('.experience-copy .kicker', t.experienceKicker);
    setHTML('.experience-copy h2', t.experienceHeading);
    setText('.experience-copy .btn', t.learnMore);

    setText('.gallery-title .kicker', t.galleryKicker);
    setText('.gallery-title h2', t.galleryHeading);
    const galleryMore = document.querySelector('.gallery-more');
    if (galleryMore) galleryMore.firstChild.textContent = `${t.galleryMore} `;

    setText('.final-copy .kicker', t.finalKicker);
    setText('.final-copy h2', t.finalHeading);
    setText('.final-copy > p:last-child', t.finalBody);
    setText('.final-book strong', t.book);
    setText('.final-book small', t.clickToBook);
    document.querySelectorAll('.legal-links a').forEach((link) => {
      if (link.href.includes('privacy-policy')) link.textContent = t.privacy;
      if (link.href.includes('terms-and-conditions')) link.textContent = t.terms;
    });

    setText('#bookingModal .kicker', t.bookingKicker);
    setText('#bookingModal h2', t.bookingHeading);
    setText('#bookingModal .submit', t.request);
    setText('.blog-detail-book', t.book);
    setText('[data-service-detail-book]', t.book);

    nav.querySelectorAll('button').forEach((button) => {
      const active = button.dataset.lang === lang;
      button.classList.toggle('active', active);
      button.setAttribute('aria-current', active ? 'true' : 'false');
    });
  };

  nav.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-lang]');
    if (!button) return;
    applyLanguage(button.dataset.lang);
  });

  /* script.js renders shared content immediately after this file, so apply once
     more on the next task to ensure the selected language wins. */
  setTimeout(() => applyLanguage(initial), 0);
})();
