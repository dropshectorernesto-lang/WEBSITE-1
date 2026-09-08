(() => {
  const config = window.SITE_CONFIG;

  const supportedLangs = ['en', 'de', 'es'];
  const getLang = () => {
    const lang = document.documentElement.lang || localStorage.getItem('grum-language') || 'en';
    return supportedLangs.includes(lang) ? lang : 'en';
  };

  const serviceLocale = {
    en: {
      labels: { details:'SERVICE DETAILS', included:'What’s Included', prices:'Price By Dog Size', menuPrices:'Menu Pricing', note:'Final pricing can change based on coat condition, matting, temperament, and the time needed to groom your pet safely.', book:'BOOK APPOINTMENT' },
      services: {}
    },
    de: {
      labels: { details:'SERVICE-DETAILS', included:'Enthalten', prices:'Preis nach Hundegröße', menuPrices:'Menüpreise', note:'Der endgültige Preis kann je nach Fellzustand, Verfilzung, Temperament und benötigter Pflegezeit variieren.', book:'TERMIN BUCHEN' },
      services: {
        'BATH & BRUSH': { title:'BAD & BÜRSTEN', lead:'Eine sanfte Auffrischung für sauberes Fell, frischen Duft und leichteres Bürsten.', includes:['Warmes Bad mit fellfreundlichem Shampoo','Pflegespülung','Föhnen','Gründliches Ausbürsten','Leichtes Finish-Spray'], pricing:[['Kleine Hunde','€35+'],['Mittelgroße Hunde','€45+'],['Große Hunde','€60+']] },
        'HAIRCUT & STYLING': { title:'SCHNITT & STYLING', lead:'Ein kompletter Pflegetermin, abgestimmt auf Fell, Komfort und gewünschten Look deines Hundes.', includes:['Bad und Föhnen','Rassegerechter oder individueller Schnitt','Gesicht, Pfoten und Hygienebereich','Ausbürsten und Styling-Finish','Krallen-Check'], pricing:[['Kleine Hunde','€55+'],['Mittelgroße Hunde','€70+'],['Große Hunde','€90+']] },
        'NAIL CLIPPING': { title:'KRALLEN SCHNEIDEN', lead:'Schnelle und sorgfältige Krallenpflege für bequemes und sicheres Laufen.', includes:['Krallen kürzen','Sanfte Pfotenbehandlung','Bei Bedarf Feilen und Glätten','Kurzer Komfort-Check'], pricing:[['Kleine Hunde','€15+'],['Mittelgroße Hunde','€18+'],['Große Hunde','€22+']] },
        'TEETH CLEANING': { title:'ZAHNREINIGUNG', lead:'Eine sanfte Mundpflege für frischeren Atem und ein gepflegtes Lächeln.', includes:['Sanftes Zähneputzen','Tierfreundliche Zahnpflegeprodukte','Atemerfrischung','Kurzer Sicht- und Komfortcheck'], pricing:[['Alle Größen','€20+'],['Mit Grooming-Service','€15+']] },
        'EAR CLEANING': { title:'OHRENREINIGUNG', lead:'Eine ruhige Ohrenreinigung für frische, saubere und reizfreie Ohren.', includes:['Reinigung des äußeren Ohrs','Tierfreundlicher Reiniger','Sanftes Auswischen','Komfortcheck zum Abschluss'], pricing:[['Alle Größen','€15+'],['Mit Grooming-Service','€12+']] },
        'DE-SHEDDING TREATMENT': { title:'ENTHAARUNGSBEHANDLUNG', lead:'Eine intensivere Fellpflege gegen lose Unterwolle und saisonalen Fellwechsel.', includes:['De-Shedding-Shampoo','Pflegebehandlung','Föhnen mit hoher Luftleistung','Ausbürsten der Unterwolle','Abschließendes Durchkämmen'], pricing:[['Kleine Hunde','€40+'],['Mittelgroße Hunde','€55+'],['Große Hunde','€75+']] },
        'COMBO': { title:'COMBO', lead:'Kombiniere mehrere Services in einem ruhigen Spa-Termin.', includes:['Zwei oder mehr Services aus dem Pflegemenü','Bad, Bürsten, Schnitt, Krallen, Zähne, Ohren, De-Shedding, Welpen-Kennenlernen, À-la-carte oder Zusatzpflege','Ein Terminablauf mit weniger Hin und Her','Empfehlung passend zu Fell und Komfort'], pricing:[['Zwei Services','Individuelles Angebot'],['Drei oder mehr Services','Individuelles Angebot'],['Beste Kombis','Frag uns']] },
        'A LA CARTE': { title:'A LA CARTE', lead:'Wähle einen einzelnen Service aus unserem Pflegemenü, wenn dein Hund nur einen Touch-up braucht.', includes:['Bad & Bürsten','Schnitt & Styling','Krallen schneiden','Zahnreinigung','Ohrenreinigung','Enthaarungsbehandlung','Welpen-Kennenlernen','Pfoten trimmen','Gesicht trimmen','Hygienetrim','Analdrüsen'], pricing:[['Bad & Bürsten','€35+'],['Schnitt & Styling','€55+'],['Krallen schneiden','€15+'],['Zahnreinigung','€20+'],['Ohrenreinigung','€15+'],['Enthaarungsbehandlung','€40+'],['Welpen-Kennenlernen','€25+'],['Pfoten trimmen','€40+'],['Gesicht trimmen','€30+'],['Hygienetrim','€30+'],['Analdrüsen','€30+']] },
        'ADD-ON SERVICES': { title:'ZUSATZSERVICES', lead:'Ergänze jeden Grooming-Termin mit zusätzlicher Pflege aus unserem Menü.', includes:['Zu Bad & Bürsten hinzufügen','Zu Schnitt & Styling hinzufügen','Zu Krallen schneiden hinzufügen','Zu Zahnreinigung hinzufügen','Zu Ohrenreinigung hinzufügen','Zu Enthaarungsbehandlung hinzufügen','Zu Welpen-Kennenlernen hinzufügen','Pawdicure','Blueberry Facial','Aromatherapie-Bad','Massage','Schleife oder Bandana'], pricing:[['Zähne putzen','€10+'],['Ohrenreinigung','€15+'],['Krallen schneiden','€15+'],['Pawdicure','€40+'],['Floh- und Zeckenbehandlung','€40+'],['Beruhigende Hautpflege','€30+'],['Fellpflegebehandlung','€30+'],['De-Shedding-Boost','€40+'],['Blueberry Facial','€20+'],['Aromatherapie-Bad','€20+'],['Massage','€30+'],['Schleife oder Bandana','€10+']] }
      }
    },
    es: {
      labels: { details:'DETALLES DEL SERVICIO', included:'Qué incluye', prices:'Precio según tamaño', menuPrices:'Precios del menú', note:'El precio final puede variar según el estado del pelo, nudos, temperamento y el tiempo necesario para trabajar de forma segura.', book:'RESERVAR CITA' },
      services: {
        'BATH & BRUSH': { title:'BAÑO & CEPILLADO', lead:'Un cuidado suave para dejar el pelo limpio, fresco y más fácil de cepillar.', includes:['Baño templado con champú apto para el pelo','Acondicionador','Secado','Cepillado completo','Spray de acabado ligero'], pricing:[['Perros pequeños','€35+'],['Perros medianos','€45+'],['Perros grandes','€60+']] },
        'HAIRCUT & STYLING': { title:'CORTE & STYLING', lead:'Una sesión completa adaptada al pelo, comodidad y estilo de tu perro.', includes:['Baño y secado','Corte de raza o personalizado','Recorte de cara, patas y zona higiénica','Cepillado y acabado de styling','Revisión de uñas'], pricing:[['Perros pequeños','€55+'],['Perros medianos','€70+'],['Perros grandes','€90+']] },
        'NAIL CLIPPING': { title:'CORTE DE UÑAS', lead:'Un corte rápido y cuidadoso para mantener las patas cómodas y el movimiento natural.', includes:['Corte de uñas','Manipulación suave de las patas','Limado opcional cuando sea necesario','Revisión rápida de comodidad'], pricing:[['Perros pequeños','€15+'],['Perros medianos','€18+'],['Perros grandes','€22+']] },
        'TEETH CLEANING': { title:'LIMPIEZA DENTAL', lead:'Un cuidado bucal suave para un aliento más fresco y una sonrisa más limpia.', includes:['Cepillado dental suave','Productos bucales seguros para mascotas','Refresco del aliento','Revisión visual de comodidad'], pricing:[['Todos los tamaños','€20+'],['Con servicio de peluquería','€15+']] },
        'EAR CLEANING': { title:'LIMPIEZA DE OÍDOS', lead:'Una limpieza tranquila para mantener los oídos frescos y sin irritaciones.', includes:['Limpieza del oído externo','Limpiador seguro para mascotas','Limpieza suave','Revisión final de comodidad'], pricing:[['Todos los tamaños','€15+'],['Con servicio de peluquería','€12+']] },
        'DE-SHEDDING TREATMENT': { title:'TRATAMIENTO DESLANADO', lead:'Un tratamiento profundo para retirar subpelo suelto y controlar la muda estacional.', includes:['Champú deslanador','Tratamiento acondicionador','Secado de alta velocidad','Cepillado del subpelo','Peinado final'], pricing:[['Perros pequeños','€40+'],['Perros medianos','€55+'],['Perros grandes','€75+']] },
        'COMBO': { title:'COMBO', lead:'Combina varios servicios en una sola cita de spa tranquila.', includes:['Dos o más servicios del menú de peluquería','Baño, cepillado, corte, uñas, dientes, oídos, deslanado, cachorro, a la carta o extras','Una cita más sencilla con menos idas y vueltas','Recomendación según pelo y comodidad'], pricing:[['Dos servicios','Presupuesto personalizado'],['Tres o más servicios','Presupuesto personalizado'],['Mejores combos','Pregúntanos']] },
        'A LA CARTE': { title:'A LA CARTA', lead:'Elige un servicio suelto de nuestro menú cuando tu perro solo necesita un retoque.', includes:['Baño & cepillado','Corte & styling','Corte de uñas','Limpieza dental','Limpieza de oídos','Tratamiento deslanado','Intro cachorro','Recorte de patas','Recorte de cara','Recorte higiénico','Glándulas anales'], pricing:[['Baño & cepillado','€35+'],['Corte & styling','€55+'],['Corte de uñas','€15+'],['Limpieza dental','€20+'],['Limpieza de oídos','€15+'],['Tratamiento deslanado','€40+'],['Intro cachorro','€25+'],['Recorte de patas','€40+'],['Recorte de cara','€30+'],['Recorte higiénico','€30+'],['Glándulas anales','€30+']] },
        'ADD-ON SERVICES': { title:'SERVICIOS EXTRA', lead:'Añade cualquier cuidado extra de nuestro menú a una cita de peluquería.', includes:['Añadir a baño & cepillado','Añadir a corte & styling','Añadir a corte de uñas','Añadir a limpieza dental','Añadir a limpieza de oídos','Añadir a tratamiento deslanado','Añadir a intro cachorro','Pawdicure','Facial blueberry','Baño de aromaterapia','Masaje','Lazo o bandana'], pricing:[['Cepillado dental','€10+'],['Limpieza de oídos','€15+'],['Corte de uñas','€15+'],['Pawdicure','€40+'],['Antipulgas y garrapatas','€40+'],['Tratamiento calmante de piel','€30+'],['Acondicionador de pelo','€30+'],['Refuerzo deslanado','€40+'],['Facial blueberry','€20+'],['Baño de aromaterapia','€20+'],['Masaje','€30+'],['Lazo o bandana','€10+']] }
      }
    }
  };

  const blogLocale = {
    de: {
      'HOW OFTEN SHOULD YOU ACTUALLY BATHE YOUR DOG?': { category:'GROOMING-BASICS', title:'WIE OFT SOLLTE MAN EINEN HUND WIRKLICH BADEN?', body:['Für die meisten Hunde ist ein Bad alle vier bis sechs Wochen passend. Der richtige Rhythmus hängt jedoch von Felltyp, Hautempfindlichkeit, Aktivität und Zeit im Freien ab.','Kurzhaarige Hunde brauchen oft seltener ein Bad, während lockiges, langes oder doppellagiges Fell regelmäßiger professionelle Pflege benötigt, um Ablagerungen und Verfilzungen zu vermeiden.','Wenn dein Hund riecht, sich fettig anfühlt, mehr kratzt als sonst oder deutlich mehr Schmutz hinterlässt, kann es Zeit für ein Bad sein. Bei trockener oder gereizter Haut helfen wir, einen sanfteren Rhythmus zu finden.'] },
      'BRUSHING BETWEEN VISITS: A 5-MINUTE ROUTINE THAT WORKS': { category:'FELLPFLEGE', title:'BÜRSTEN ZWISCHEN TERMINEN: EINE 5-MINUTEN-ROUTINE, DIE FUNKTIONIERT', body:['Eine kurze Bürstenroutine mehrmals pro Woche macht einen großen Unterschied, besonders an Ohren, Brust, Rute, Bauch und Beinen, wo Verfilzungen schnell entstehen.','Arbeite langsam in kleinen Partien und stoppe, wenn dein Hund unruhig wird. Es geht um Regelmäßigkeit, nicht um einen Kampf.','Regelmäßiges Bürsten macht Grooming-Termine entspannter, weil sich das Fell leichter waschen, trocknen und stylen lässt. Außerdem fallen Hautveränderungen früher auf.'] },
      "SIGNS YOUR DOG'S NAILS ARE OVERDUE FOR A TRIM": { category:'KRALLEN & PFOTEN', title:'ANZEICHEN, DASS DIE KRALLEN DEINES HUNDES GESCHNITTEN WERDEN SOLLTEN', body:['Wenn du auf harten Böden ein Klicken hörst, die Krallen im Stand den Boden berühren oder sich die Spitzen einrollen, ist es wahrscheinlich Zeit für einen Schnitt.','Zu lange Krallen können die Haltung verändern und das Laufen unangenehmer machen. Manche Hunde rutschen auch häufiger, weil die Pfoten nicht mehr natürlich aufliegen.','Für nervöse Hunde sind kurze, häufigere Krallentermine oft angenehmer, als sehr lange Krallen auf einmal zu kürzen.'] },
      "WHAT TO EXPECT AT YOUR DOG'S FIRST GRÜM APPOINTMENT": { category:'ERSTER BESUCH', title:'WAS DICH BEIM ERSTEN GRÜM-TERMIN DEINES HUNDES ERWARTET', body:['Der erste Besuch beginnt mit einem kurzen Check-in zu Fell, Komfort, gesundheitlichen Hinweisen und dem gewünschten Service.','Danach arbeiten wir im Tempo deines Hundes. Ein Einzeltermin ist ruhiger, weil dein Tier nicht in einem vollen Raum warten muss.','Nach dem Grooming erklären wir, wie das Fell reagiert hat, welche Pflege zu Hause hilft und wann der nächste Termin sinnvoll ist.'] }
    },
    es: {
      'HOW OFTEN SHOULD YOU ACTUALLY BATHE YOUR DOG?': { category:'BÁSICOS DE PELUQUERÍA', title:'¿CADA CUÁNTO DEBERÍAS BAÑAR REALMENTE A TU PERRO?', body:['A la mayoría de los perros les va bien un baño cada cuatro a seis semanas, pero la frecuencia correcta depende del tipo de pelo, sensibilidad de la piel, actividad y tiempo al aire libre.','Los perros de pelo corto pueden necesitar menos baños, mientras que los de pelo rizado, largo o doble suelen necesitar cuidados profesionales más regulares para evitar acumulación y nudos.','Si tu perro huele, tiene el pelo graso, se rasca más de lo normal o deja más suciedad, puede ser momento de bañarlo. Si la piel está seca o irritada, podemos ayudarte a encontrar un ritmo más suave.'] },
      'BRUSHING BETWEEN VISITS: A 5-MINUTE ROUTINE THAT WORKS': { category:'CUIDADO DEL PELO', title:'CEPILLADO ENTRE VISITAS: UNA RUTINA DE 5 MINUTOS QUE FUNCIONA', body:['Una rutina corta de cepillado varias veces por semana marca una gran diferencia, especialmente alrededor de orejas, pecho, cola, barriga y patas, donde aparecen nudos más rápido.','Haz pasadas lentas, trabaja por pequeñas zonas y para si tu perro se incomoda. El objetivo es la constancia, no una lucha.','El cepillado regular hace que las citas sean más tranquilas porque el pelo se lava, seca y estiliza con más facilidad. También ayuda a detectar cambios en la piel antes.'] },
      "SIGNS YOUR DOG'S NAILS ARE OVERDUE FOR A TRIM": { category:'UÑAS & PATAS', title:'SEÑALES DE QUE TU PERRO NECESITA UN CORTE DE UÑAS', body:['Si escuchas clics en suelos duros, ves que las uñas tocan el suelo al estar de pie o notas puntas curvadas, probablemente sea hora de cortarlas.','Las uñas largas pueden cambiar la postura y hacer que caminar sea menos cómodo. Algunos perros también resbalan más porque las patas no apoyan de forma natural.','Para perros nerviosos, las citas más cortas y frecuentes suelen ser más fáciles que esperar a que las uñas estén demasiado largas.'] },
      "WHAT TO EXPECT AT YOUR DOG'S FIRST GRÜM APPOINTMENT": { category:'PRIMERA VISITA', title:'QUÉ ESPERAR EN LA PRIMERA CITA DE TU PERRO EN GRÜM', body:['La primera visita empieza con una breve conversación para conocer el pelo, nivel de comodidad, datos de salud y el servicio que buscas.','A partir de ahí vamos al ritmo de tu mascota. Una cita individual mantiene todo más tranquilo porque tu perro no espera en un espacio lleno.','Después del grooming te contamos cómo respondió el pelo, qué mantenimiento ayuda en casa y cuándo recomendamos la siguiente cita.'] }
    }
  };

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

    function syncPhoneImage(activeConfig = window.SITE_CONFIG) {
      const lang = getLang();
      const src = activeConfig.gallery?.phoneImages?.[lang] || activeConfig.gallery?.phoneImage;
      setImage('.phone-mock img', src, activeConfig.gallery?.phoneAlt);
    }
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

    /* Do not wipe the localized headline layers on the homepage. */
    if (!document.querySelector('#hero-title .hero-headline-language')) setHtml('#hero-title', config.hero?.headlineHtml);
    else setImage('#hero-title .hero-headline-img', 'assets/hero-headline-tailored-hd.png', 'Tailored grooming for distinguished pets');
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
      cards.innerHTML = config.services.cards.map((card) => {
        const style = ['green', 'black', 'orange'].includes(card.style) ? card.style : 'green';
        const title = escapeAttribute(card.title);
        return `<article class="service-card card-${style}${card.featured ? ' featured' : ''}" data-service="${title}" tabindex="0" role="button" aria-label="Book ${title}"><img src="${escapeAttribute(card.image)}" alt="${escapeAttribute(card.imageAlt)}" loading="lazy" draggable="false" /><div class="service-info"><div><h3>${card.title}</h3><p>${card.descriptionHtml || ''}</p></div></div></article>`;
      }).join('');
    }
    const select = document.getElementById('serviceSelect');
    if (select && config.booking?.serviceOptions) {
      select.innerHTML = config.booking.serviceOptions.map((label) => `<option value="${escapeAttribute(label)}">${label}</option>`).join('');
    }

    setText('.experience-copy .kicker', config.experience?.kicker);
    setHtml('.experience-copy h2', config.experience?.headingHtml);
    setInlineButtonText('.experience-copy .btn', config.experience?.button);
    setImage('.experience-img img', config.experience?.image, config.experience?.imageAlt);

    setText('.gallery-title .kicker', config.gallery?.kicker);
    setText('.gallery-title h2', config.gallery?.heading);
    syncPhoneImage(config);
    const galleryLink = document.querySelector('.gallery-more');
    if (galleryLink) {
      if (config.business?.instagramUrl) galleryLink.href = config.business.instagramUrl;
      if (config.gallery?.linkLabel) galleryLink.firstChild.textContent = `${config.gallery.linkLabel} `;
    }
    const grid = document.querySelector('.ig-grid');
    if (grid && config.gallery?.images) {
      grid.innerHTML = config.gallery.images.map((image) => `<a href="gallery.html" aria-label="View ${escapeAttribute(image.alt)} in the gallery"><img src="${escapeAttribute(image.src)}" alt="${escapeAttribute(image.alt)}" loading="lazy" /></a>`).join('');
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
    document.querySelectorAll('.legal-links').forEach((nav) => { if (config.legal?.length) nav.innerHTML = legalMarkup(); });
    document.querySelectorAll('.final-inner').forEach((inner) => {
      if (!inner.querySelector('.site-copyright')) {
        const copy = document.createElement('p');
        copy.className = 'site-copyright';
        copy.textContent = '© Copyright 2026';
        inner.appendChild(copy);
      }
    });

    setText('#bookingModal .kicker', config.booking?.kicker);
    setText('#bookingModal h2', config.booking?.heading);
    setText('#bookingModal .submit', config.booking?.submitLabel);

    const sections = { hero:document.querySelector('.hero'), services:document.querySelector('.services'), experience:document.querySelector('.experience'), gallery:document.querySelector('.gallery'), 'final-cta':document.querySelector('.final-cta') };
    if (config.layout?.sectionOrder) {
      const enabled = new Set(config.layout.sectionOrder);
      Object.entries(sections).forEach(([name, section]) => { if (section) section.hidden = !enabled.has(name); });
      const pageMain = document.querySelector('main');
      config.layout.sectionOrder.forEach((name) => { if (sections[name]) pageMain.appendChild(sections[name]); });
    }
  }

  const booking = document.getElementById('bookingModal');
  const video = document.getElementById('videoModal');
  const serviceDetail = document.getElementById('serviceDetailModal');
  const blogDetail = document.getElementById('blogDetailModal');
  const serviceSelect = document.getElementById('serviceSelect');
  const setModalScrollLock = () => {
    const locked = [booking, video, serviceDetail, blogDetail, document.querySelector('.gallery-lightbox')]
      .filter(Boolean)
      .some((dialog) => dialog.open);
    document.body.classList.toggle('modal-open', locked);
  };
  const showDialog = (dialog) => {
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    setModalScrollLock();
  };
  const main = document.querySelector('main');
  const header = document.querySelector('.site-header');
  const BASE_WIDTH = 1024;
  const DESKTOP_MIN = 851;

  const syncReferenceScale = () => {
    const viewport = document.documentElement.clientWidth;
    if (viewport >= DESKTOP_MIN) {
      const scale = viewport / BASE_WIDTH;
      document.body.classList.add('reference-scale');
      if (main) { main.style.width = `${BASE_WIDTH}px`; main.style.zoom = String(scale); }
      if (header) { header.style.width = `${BASE_WIDTH}px`; header.style.left = '0'; header.style.transform = 'none'; header.style.zoom = String(scale); }
    } else {
      document.body.classList.remove('reference-scale');
      if (main) { main.style.width = ''; main.style.zoom = ''; }
      if (header) { header.style.width = ''; header.style.left = ''; header.style.transform = ''; header.style.zoom = ''; }
    }
  };

  syncReferenceScale();
  addEventListener('resize', syncReferenceScale, { passive:true });


  const syncHeroHeadline = () => {
    const lang = getLang();
    const img = document.querySelector('.hero-headline-img');
    const de = document.querySelector('.hero-headline-de');
    const es = document.querySelector('.hero-headline-es');
    if (!img && !de && !es) return;
    if (img) { img.style.display = lang === 'en' ? 'block' : 'none'; img.setAttribute('aria-hidden', lang === 'en' ? 'false' : 'true'); }
    if (de) { de.style.display = lang === 'de' ? 'block' : 'none'; de.setAttribute('aria-hidden', lang === 'de' ? 'false' : 'true'); }
    if (es) { es.style.display = lang === 'es' ? 'block' : 'none'; es.setAttribute('aria-hidden', lang === 'es' ? 'false' : 'true'); }
  };

  const setButtonTextPreserveIcon = (button, text) => {
    if (!button) return;
    let node = [...button.childNodes].find((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
    if (node) node.textContent = text;
    else if (button.querySelector('strong')) button.querySelector('strong').textContent = text;
  };

  const localizeServiceName = (key, lang=getLang()) => serviceLocale[lang]?.services?.[key]?.title || key;

  const syncBookingOptions = () => {
    if (!serviceSelect) return;
    const lang = getLang();
    [...serviceSelect.options].forEach((option) => {
      const key = option.value || option.dataset.serviceKey || option.textContent;
      option.dataset.serviceKey = key;
      option.textContent = localizeServiceName(key, lang);
    });
  };

  const openBooking = (service) => {
    if (!booking) return;
    syncBookingOptions();
    if (service && serviceSelect) {
      [...serviceSelect.options].forEach((option, index) => {
        if ((option.value || option.dataset.serviceKey) === service) serviceSelect.selectedIndex = index;
      });
    }
    showDialog(booking);
  };

  let activeDetailService = '';
  const serviceDetails = config?.services?.details || {};
  const normalizeService = (service='') => { const key = String(service).replaceAll('&amp;', '&').trim(); return key === 'DE-SHEDDING' ? 'DE-SHEDDING TREATMENT' : key; };
  const renderServiceDetail = (service) => {
    const key = normalizeService(service);
    const lang = getLang();
    const base = serviceDetails[key];
    const localized = serviceLocale[lang]?.services?.[key];
    const detail = localized || base;
    if (!detail) return false;
    activeDetailService = key;
    serviceDetail?.setAttribute('data-service', key);
    const labels = serviceLocale[lang]?.labels || serviceLocale.en.labels;
    const titleEl = document.getElementById('serviceDetailTitle');
    const leadEl = document.getElementById('serviceDetailLead');
    const includesEl = document.getElementById('serviceDetailIncludes');
    const pricesEl = document.getElementById('serviceDetailPrices');
    const kicker = serviceDetail?.querySelector('.service-detail-scroll > .kicker');
    const blocks = serviceDetail?.querySelectorAll('.service-detail-block h3');
    const note = serviceDetail?.querySelector('.service-note');
    const book = serviceDetail?.querySelector('[data-service-detail-book]');
    if (kicker) kicker.textContent = labels.details;
    if (blocks?.[0]) blocks[0].textContent = labels.included;
    if (blocks?.[1]) blocks[1].textContent = ['COMBO','A LA CARTE','ADD-ON SERVICES'].includes(key) ? labels.menuPrices : labels.prices;
    if (note) note.textContent = labels.note;
    setButtonTextPreserveIcon(book, labels.book);
    if (titleEl) titleEl.textContent = `${localized?.title || key}.`;
    if (leadEl) leadEl.textContent = detail.lead || '';
    if (includesEl) includesEl.innerHTML = (detail.includes || []).map((item) => `<li>${escapeAttribute(item)}</li>`).join('');
    if (includesEl?.parentElement) includesEl.parentElement.hidden = ['A LA CARTE','ADD-ON SERVICES'].includes(key);
    if (pricesEl) pricesEl.innerHTML = (detail.pricing || []).map(([label, price]) => `<div class="price-row"><span>${escapeAttribute(label)}</span><strong>${escapeAttribute(price)}</strong></div>`).join('');
    return true;
  };

  const openServiceDetail = (service) => {
    const key = normalizeService(service);
    if (!serviceDetail || !renderServiceDetail(key)) { openBooking(key); return; }
    showDialog(serviceDetail);
  };

  document.querySelectorAll('[data-book]').forEach((button) => button.addEventListener('click', () => openBooking()));
  document.querySelector('[data-close-service]')?.addEventListener('click', () => serviceDetail?.close());
  document.querySelector('[data-service-detail-book]')?.addEventListener('click', () => { serviceDetail?.close(); openBooking(activeDetailService); });

  let activeBlogPost = null;
  const setBlogPageScrollLock = (locked) => document.body.classList.toggle('blog-modal-open', locked);
  const renderBlogDetail = (post) => {
    if (!blogDetail || !post) return;
    const originalTitle = post.dataset.blogTitle || post.querySelector('h3')?.dataset.originalText || post.querySelector('h3')?.textContent || 'Blog post';
    const lang = getLang();
    const localized = blogLocale[lang]?.[originalTitle];
    const title = localized?.title || originalTitle;
    const category = localized?.category || post.dataset.blogCategory || post.querySelector('.blog-date')?.textContent || 'Blog';
    const image = post.dataset.blogDetailImage || post.dataset.blogImage || post.querySelector('img')?.getAttribute('src') || '';
    const body = localized?.body || (post.dataset.blogBody || '').split('|').filter(Boolean);
    const titleEl = document.getElementById('blogDetailTitle');
    const categoryEl = document.getElementById('blogDetailCategory');
    const imageEl = document.getElementById('blogDetailImage');
    const bodyEl = document.getElementById('blogDetailBody');
    if (titleEl) titleEl.textContent = title;
    if (categoryEl) categoryEl.textContent = category;
    if (imageEl && image) { imageEl.src = image; imageEl.alt = title; }
    if (bodyEl) bodyEl.innerHTML = body.map((paragraph) => `<p>${escapeAttribute(paragraph)}</p>`).join('');
    const blogBook = blogDetail.querySelector('.blog-detail-book');
    setButtonTextPreserveIcon(blogBook, getLang() === 'de' ? 'TERMIN BUCHEN' : getLang() === 'es' ? 'RESERVAR CITA' : 'BOOK APPOINTMENT');
  };

  const openBlogDetail = (post) => {
    if (!blogDetail) return;
    activeBlogPost = post;
    renderBlogDetail(post);
    showDialog(blogDetail);
    setBlogPageScrollLock(true);
  };
  blogDetail?.addEventListener('close', () => setBlogPageScrollLock(false));
  document.querySelector('[data-close-blog]')?.addEventListener('click', () => blogDetail?.close());
  document.querySelectorAll('.blog-post').forEach((post) => {
    const h3 = post.querySelector('h3');
    if (h3 && !h3.dataset.originalText) h3.dataset.originalText = post.dataset.blogTitle || h3.textContent;
    post.addEventListener('click', () => openBlogDetail(post));
    post.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openBlogDetail(post); } });
  });

  const syncDynamicLocale = () => {
    syncHeroHeadline();
    syncPhoneImage(window.SITE_CONFIG);
    syncBookingOptions();
    if (serviceDetail?.open && activeDetailService) renderServiceDetail(activeDetailService);
    if (blogDetail?.open && activeBlogPost) renderBlogDetail(activeBlogPost);
  };
  new MutationObserver(syncDynamicLocale).observe(document.documentElement, { attributes:true, attributeFilter:['lang'] });
  setTimeout(syncDynamicLocale, 0);

  const activateServiceCard = (card) => openServiceDetail(card.dataset.service);
  document.querySelectorAll('.service-card').forEach((card) => {
    card.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); activateServiceCard(card); } });
  });

  const carousel = document.querySelector('.service-carousel');
  const track = document.querySelector('.service-cards');
  const carouselCards = [...document.querySelectorAll('.service-card')];
  const pager = document.querySelector('.pager');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeSlide = 0, railX = 0, dragStartX = 0, dragStartRailX = 0, dragging = false, dragged = false, pressedCard = null;
  const cardOffset = (index) => carouselCards[index]?.offsetLeft || 0;
  const maxRail = () => Math.max(0, (track?.scrollWidth || 0) - (carousel?.clientWidth || 0));
  const slidePositions = () => { const end = Math.round(maxRail()); return [0, Math.round(end/3), Math.round((end*2)/3), end]; };
  const nearestSlide = (position) => slidePositions().reduce((best,target,index,positions) => Math.abs(target-position) < Math.abs(positions[best]-position) ? index : best, 0);
  const paintRail = () => { if (track) track.style.transform = `translate3d(${-railX}px,0,0)`; pager?.querySelectorAll('button').forEach((button,index) => { button.classList.toggle('active',index===activeSlide); button.setAttribute('aria-current',index===activeSlide?'true':'false'); }); };
  const goToSlide = (index) => { const positions = slidePositions(); activeSlide = Math.max(0, Math.min(positions.length-1,index)); railX = positions[activeSlide] || 0; paintRail(); };

  if (carousel && track && carouselCards.length) {
    carousel.addEventListener('dragstart', (event) => event.preventDefault());
    carousel.addEventListener('selectstart', (event) => event.preventDefault());
    if (pager) { pager.innerHTML = slidePositions().map((position,index) => `<button type="button" aria-label="Show service group ${index+1}"></button>`).join(''); pager.querySelectorAll('button').forEach((button,index)=>button.addEventListener('click',()=>goToSlide(index))); }
    carousel.addEventListener('pointerdown', (event) => { if (event.button !== 0) return; event.preventDefault(); dragging=true; dragged=false; pressedCard=event.target.closest('.service-card'); dragStartX=event.clientX; dragStartRailX=railX; carousel.setPointerCapture(event.pointerId); carousel.classList.add('dragging'); });
    carousel.addEventListener('pointermove', (event) => { if (!dragging) return; const delta=event.clientX-dragStartX; if (Math.abs(delta)>5) dragged=true; railX=Math.max(0,Math.min(maxRail(),dragStartRailX-delta)); activeSlide=nearestSlide(railX); paintRail(); });
    const finishDrag = (event) => { if (!dragging) return; const wasDragged=dragged; const card=pressedCard; dragging=false; pressedCard=null; carousel.classList.remove('dragging'); if (carousel.hasPointerCapture(event.pointerId)) carousel.releasePointerCapture(event.pointerId); goToSlide(nearestSlide(railX)); if (!wasDragged && card) activateServiceCard(card); };
    carousel.addEventListener('pointerup', finishDrag); carousel.addEventListener('pointercancel', finishDrag);
    carousel.addEventListener('click', (event) => { if (dragged) { event.preventDefault(); event.stopPropagation(); dragged=false; return; } const card=event.target.closest('.service-card'); if (card) activateServiceCard(card); }, true);
    addEventListener('resize', () => goToSlide(activeSlide), { passive:true }); goToSlide(0);
  }

  document.querySelectorAll('.svc-card').forEach((card) => {
    const openDetail = () => openServiceDetail(card.dataset.service);
    card.addEventListener('click', openDetail);
    card.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openDetail(); } });
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
      document.querySelectorAll('.bubble').forEach((bubble,index) => { bubble.style.transform = `translate3d(0,${(travelled * (index % 2 ? -9 : -5)).toFixed(2)}px,0)`; });
    }
    carouselCards.forEach((card) => { const rect=card.getBoundingClientRect(); const proximity=Math.max(0,Math.min(1,1-Math.abs(rect.top+rect.height/2-innerHeight*.55)/(innerHeight*.7))); card.style.setProperty('--scroll-lift',`${(-proximity*8).toFixed(2)}px`); card.style.setProperty('--scroll-scale',(1+proximity*.035).toFixed(4)); });
  };
  const queueScrollMotion = () => { if (!scrollFrame) scrollFrame=requestAnimationFrame(updateScrollMotion); };
  addEventListener('scroll', queueScrollMotion, { passive:true }); addEventListener('resize', queueScrollMotion, { passive:true }); queueScrollMotion();

  document.querySelector('[data-video]')?.addEventListener('click', () => showDialog(video));
  document.querySelector('[data-close-video]')?.addEventListener('click', () => video?.close());
  document.querySelector('[data-about]')?.addEventListener('click', () => document.getElementById('experience')?.scrollIntoView({ behavior:'smooth' }));

  [booking, video, serviceDetail, blogDetail].filter(Boolean).forEach((dialog) => {
    dialog.addEventListener('close', setModalScrollLock);
    dialog.addEventListener('click', (event) => {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
  });

  const form = document.getElementById('bookingForm');
  form?.addEventListener('submit', (event) => {
    if (event.submitter && event.submitter.value === 'cancel') return;
    event.preventDefault();
    if (!form.reportValidity()) return;
    booking?.close();
    form.reset();
  });
})();
