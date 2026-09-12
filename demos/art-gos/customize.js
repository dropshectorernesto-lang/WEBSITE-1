(() => {
  const frame = document.getElementById('customer-demo');
  if (!frame) return;

  const CUSTOMER = {
    name: 'ART GOS',
    phoneDisplay: '+34 692 11 12 12',
    phoneHref: 'tel:+34692111212',
    email: 'artgoslapeludelgos@gmail.com',
    addressLine1: 'Carrer de Blai, 51',
    addressLine2: '08004 Barcelona',
    mapsUrl: 'https://maps.app.goo.gl/dqdUBmTZKLii8C177',
    mapEmbed: 'https://www.google.com/maps?q=ART%20GOS%2C%20Carrer%20de%20Blai%2C%2051%2C%2008004%20Barcelona&output=embed'
  };

  const COPY = {
    en: {
      hours: 'Mon–Fri, 10:00–20:00<br>Sat–Sun closed',
      reviewKicker: 'GOOGLE REVIEWS · 4.8/5 · 60 REVIEWS',
      reviewLabel: 'Google review',
      aboutHero: 'ART GOS is a dog grooming salon in Poble-sec, Barcelona, known for professional grooming, personal attention and thoughtful coat-care advice.',
      story1: 'At Carrer de Blai 51, ART GOS offers professional dog grooming with an individual approach. Reviews repeatedly highlight Belén’s skill, careful handling and practical advice for maintaining the coat at home.',
      story2: 'Clients also mention tailored scissor work, attention to senior dogs and specific skin or coat needs, together with a calm and welcoming atmosphere.',
      values: [
        ['Personal Grooming', 'Grooming is adapted to the dog’s coat, condition, age and individual needs.'],
        ['Skilled Scissor Work', 'Clients specifically praise careful scissor styling and coat-conscious techniques.'],
        ['Coat-Care Advice', 'Reviews highlight useful guidance for maintaining the coat between appointments.'],
        ['Thoughtful Care', 'Senior dogs and pets with special skin or coat needs receive considered attention.']
      ]
    },
    de: {
      hours: 'Mo–Fr, 10:00–20:00<br>Sa–So geschlossen',
      reviewKicker: 'GOOGLE-BEWERTUNGEN · 4,8/5 · 60 BEWERTUNGEN',
      reviewLabel: 'Google-Bewertung',
      aboutHero: 'ART GOS ist ein Hundesalon in Poble-sec, Barcelona, bekannt für professionelle Pflege, persönliche Betreuung und hilfreiche Fellpflege-Beratung.',
      story1: 'In der Carrer de Blai 51 bietet ART GOS professionelle Hundepflege mit individuellem Ansatz. Bewertungen heben regelmäßig Beléns Können, den sorgfältigen Umgang und praktische Tipps für die Fellpflege zu Hause hervor.',
      story2: 'Kundinnen und Kunden erwähnen außerdem präzise Scherenarbeit, Rücksicht auf ältere Hunde und besondere Haut- oder Fellbedürfnisse sowie eine ruhige, angenehme Atmosphäre.',
      values: [
        ['Individuelle Pflege', 'Die Pflege wird an Fell, Zustand, Alter und individuelle Bedürfnisse des Hundes angepasst.'],
        ['Präzise Scherenarbeit', 'Kunden loben besonders sorgfältiges Styling mit der Schere und fellgerechte Techniken.'],
        ['Fellpflege-Beratung', 'Bewertungen heben hilfreiche Tipps für die Pflege zwischen den Terminen hervor.'],
        ['Aufmerksame Betreuung', 'Ältere Hunde sowie Tiere mit besonderen Haut- oder Fellbedürfnissen werden umsichtig betreut.']
      ]
    },
    es: {
      hours: 'Lun–Vie, 10:00–20:00<br>Sáb–Dom cerrado',
      reviewKicker: 'RESEÑAS DE GOOGLE · 4,8/5 · 60 RESEÑAS',
      reviewLabel: 'Reseña de Google',
      aboutHero: 'ART GOS es una peluquería canina de Poble-sec, Barcelona, conocida por su trabajo profesional, la atención personalizada y los consejos para cuidar el pelo.',
      story1: 'En Carrer de Blai 51, ART GOS ofrece peluquería canina profesional con un enfoque individual. Las reseñas destacan repetidamente la habilidad de Belén, el trato cuidadoso y sus consejos prácticos para mantener el pelo en casa.',
      story2: 'Los clientes también mencionan el trabajo a tijera, la atención a perros mayores y a necesidades específicas de piel o pelaje, además de un ambiente tranquilo y agradable.',
      values: [
        ['Atención personalizada', 'El arreglo se adapta al pelo, estado, edad y necesidades de cada perro.'],
        ['Trabajo a tijera', 'Los clientes destacan especialmente el corte cuidadoso a tijera y técnicas respetuosas con el pelaje.'],
        ['Consejos para el pelo', 'Las reseñas valoran los consejos útiles para mantener el pelaje entre visitas.'],
        ['Cuidado atento', 'Los perros mayores y las mascotas con necesidades especiales de piel o pelo reciben una atención considerada.']
      ]
    },
    ca: {
      hours: 'Dl–Dv, 10:00–20:00<br>Ds–Dg tancat',
      reviewKicker: 'RESSENYES DE GOOGLE · 4,8/5 · 60 RESSENYES',
      reviewLabel: 'Ressenya de Google',
      aboutHero: 'ART GOS és una perruqueria canina del Poble-sec, Barcelona, coneguda per la feina professional, l’atenció personalitzada i els consells per cuidar el pelatge.',
      story1: 'Al carrer de Blai 51, ART GOS ofereix perruqueria canina professional amb un enfocament individual. Les ressenyes destaquen sovint l’habilitat de la Belén, el tracte acurat i els seus consells pràctics per mantenir el pelatge a casa.',
      story2: 'Els clients també mencionen el treball amb tisora, l’atenció als gossos grans i a necessitats específiques de pell o pelatge, a més d’un ambient tranquil i agradable.',
      values: [
        ['Atenció personalitzada', 'L’arranjament s’adapta al pelatge, l’estat, l’edat i les necessitats de cada gos.'],
        ['Treball amb tisora', 'Els clients destaquen especialment el tall acurat amb tisora i tècniques respectuoses amb el pelatge.'],
        ['Consells de pelatge', 'Les ressenyes valoren els consells útils per mantenir el pelatge entre visites.'],
        ['Cura atenta', 'Els gossos grans i les mascotes amb necessitats especials de pell o pelatge reben una atenció considerada.']
      ]
    }
  };

  const REVIEWS = {
    en: [
      ['Francesca Angeles', 'Belén was skilled and very caring with my two senior dogs. They were relaxed when I picked them up and the price felt very reasonable.'],
      ['Carlos Aranda', 'Professional service with a very delicate way of handling pets. She also gave useful coat-maintenance tips and Lucas looked better than ever.'],
      ['Ángela Llurba Álvarez', 'Belén is affectionate with the dogs, leaves them looking beautiful and creates a very calm, positive atmosphere.'],
      ['Aris Cabré', 'We have been coming for two years. My dog always leaves clean, beautifully groomed, smelling great and with the nails done.'],
      ['Raquel Secall Ruiz', 'Professional, pleasant and respectful. I especially value the scissor work rather than relying on clippers for my Maltese.'],
      ['Elizabeth Loza', 'Belén takes great care of Lulú and adapts the products to her skin needs. We always leave very happy.'],
      ['Josh Feldberg', 'A great grooming salon. Everything feels done with love and genuine care.'],
      ['Francesca Angeles', 'The grooming takes each dog’s personality into account, and my older dogs were handled with real care.'],
      ['Carlos Aranda', 'The attention is excellent and the grooming result was exactly what we hoped for.'],
      ['Elizabeth Loza', 'Professional care, advice and attention to detail make this a place we trust.']
    ],
    de: [
      ['Francesca Angeles', 'Belén war sehr kompetent und liebevoll mit meinen beiden älteren Hunden. Beim Abholen waren beide entspannt und der Preis war sehr fair.'],
      ['Carlos Aranda', 'Professioneller Service und ein sehr behutsamer Umgang mit den Tieren. Dazu gab es hilfreiche Fellpflege-Tipps und Lucas sah besser aus als je zuvor.'],
      ['Ángela Llurba Álvarez', 'Belén geht liebevoll mit den Hunden um, sie sehen danach wunderschön aus und die Atmosphäre ist sehr ruhig und positiv.'],
      ['Aris Cabré', 'Wir kommen seit zwei Jahren. Mein Hund geht jedes Mal sauber, toll frisiert, gut duftend und mit gepflegten Krallen nach Hause.'],
      ['Raquel Secall Ruiz', 'Professionell, angenehm und respektvoll. Besonders wichtig ist mir die sorgfältige Scherenarbeit bei meinem Malteser.'],
      ['Elizabeth Loza', 'Belén kümmert sich sehr gut um Lulú und passt die Produkte an ihre Hautbedürfnisse an. Wir gehen immer sehr zufrieden nach Hause.'],
      ['Josh Feldberg', 'Ein großartiger Hundesalon. Alles wird mit echter Liebe und Sorgfalt gemacht.'],
      ['Francesca Angeles', 'Die Pflege berücksichtigt die Persönlichkeit jedes Hundes, und meine älteren Hunde wurden sehr umsichtig behandelt.'],
      ['Carlos Aranda', 'Die Betreuung ist ausgezeichnet und das Pflegeergebnis war genau so, wie wir es uns gewünscht hatten.'],
      ['Elizabeth Loza', 'Professionelle Pflege, Beratung und Liebe zum Detail schaffen viel Vertrauen.']
    ],
    es: [
      ['Francesca Angeles', 'Belén fue muy profesional y cariñosa con mis dos perros mayores. Cuando fui a buscarlos estaban relajados y el precio me pareció muy razonable.'],
      ['Carlos Aranda', 'Un servicio profesional y un trato muy delicado con las mascotas. Además dio buenos consejos para mantener el pelo y Lucas quedó mejor que nunca.'],
      ['Ángela Llurba Álvarez', 'Belén es cariñosa con los peludos, los deja preciosos y consigue un ambiente muy tranquilo y con buenas vibraciones.'],
      ['Aris Cabré', 'Llevamos dos años viniendo. Mi perro siempre sale limpio, bien peinado, oliendo genial y con las uñas cuidadas.'],
      ['Raquel Secall Ruiz', 'Profesional, agradable y respetuosa. Valoro especialmente el trabajo a tijera en lugar de depender de la máquina con mi bichón maltés.'],
      ['Elizabeth Loza', 'Belén cuida muchísimo a Lulú y adapta los productos a sus necesidades de piel. Siempre salimos muy contentas.'],
      ['Josh Feldberg', 'Una peluquería estupenda. Todo se hace con amor y cariño de verdad.'],
      ['Francesca Angeles', 'El arreglo tiene en cuenta la personalidad de cada perro y mis perros mayores fueron tratados con muchísimo cuidado.'],
      ['Carlos Aranda', 'La atención es excelente y el resultado del arreglo fue exactamente lo que queríamos.'],
      ['Elizabeth Loza', 'El cuidado profesional, los consejos y la atención al detalle hacen que confiemos en este sitio.']
    ],
    ca: [
      ['Francesca Angeles', 'La Belén va ser molt professional i afectuosa amb els meus dos gossos grans. Quan els vaig recollir estaven relaxats i el preu em va semblar molt raonable.'],
      ['Carlos Aranda', 'Un servei professional i un tracte molt delicat amb les mascotes. També va donar bons consells per mantenir el pelatge i en Lucas va quedar millor que mai.'],
      ['Ángela Llurba Álvarez', 'La Belén és afectuosa amb els peluts, els deixa preciosos i crea un ambient molt tranquil i positiu.'],
      ['Aris Cabré', 'Fa dos anys que hi venim. El meu gos sempre surt net, ben pentinat, amb molt bona olor i amb les ungles cuidades.'],
      ['Raquel Secall Ruiz', 'Professional, agradable i respectuosa. Valoro especialment el treball amb tisora en lloc de dependre de la màquina amb el meu bichon maltès.'],
      ['Elizabeth Loza', 'La Belén cuida molt la Lulú i adapta els productes a les seves necessitats de pell. Sempre en sortim molt contentes.'],
      ['Josh Feldberg', 'Una perruqueria fantàstica. Tot es fa amb amor i afecte de veritat.'],
      ['Francesca Angeles', 'L’arranjament té en compte la personalitat de cada gos i els meus gossos grans van rebre un tracte molt acurat.'],
      ['Carlos Aranda', 'L’atenció és excel·lent i el resultat de l’arranjament va ser exactament el que volíem.'],
      ['Elizabeth Loza', 'La cura professional, els consells i l’atenció al detall fan que confiem en aquest lloc.']
    ]
  };

  const brandReplace = (value = '') => String(value)
    .replaceAll('GRÜM', CUSTOMER.name)
    .replaceAll('Grüm', CUSTOMER.name)
    .replaceAll('grüm', CUSTOMER.name)
    .replaceAll('GRUM', CUSTOMER.name)
    .replaceAll('Grum', CUSTOMER.name)
    .replaceAll('grum', CUSTOMER.name);

  const currentLang = (doc) => {
    const lang = (doc.documentElement.lang || 'en').toLowerCase();
    return COPY[lang] ? lang : 'en';
  };

  const replaceBrandText = (doc, root = doc.body) => {
    if (!root) return;
    const walker = doc.createTreeWalker(root, doc.defaultView.NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const parent = node.parentElement;
      if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) return;
      const next = brandReplace(node.nodeValue);
      if (next !== node.nodeValue) node.nodeValue = next;
    });
    root.querySelectorAll('[aria-label],[title],[alt]').forEach((el) => {
      ['aria-label', 'title', 'alt'].forEach((attr) => {
        if (el.hasAttribute(attr)) el.setAttribute(attr, brandReplace(el.getAttribute(attr)));
      });
    });
  };

  const ensureStyles = (doc) => {
    if (!doc.head || doc.getElementById('art-gos-demo-fixes')) return;
    const style = doc.createElement('style');
    style.id = 'art-gos-demo-fixes';
    style.textContent = `
      .reviews-section{display:block!important;background:#fffaf6!important}
      .reviews-section .kicker{color:#01463c!important}
      .reviews-section .content-heading{color:#222121!important}
      .reviews-section .content-heading span{color:#01463c!important}
      .review-card{opacity:1!important;visibility:visible!important;color:#fff!important}
      .review-card.vc-green{background:#01463c!important}
      .review-card.vc-black{background:#232121!important}
      .review-card.vc-orange{background:#f26312!important}
      .review-card.vc-pink{background:#f87686!important}
      .review-card p,.review-card strong{color:#fff!important}
      .review-card span{color:rgba(255,255,255,.78)!important}
      .review-stars{color:#fff3b0!important}
    `;
    doc.head.appendChild(style);
  };

  const updateBrandAndMetadata = (doc) => {
    doc.title = brandReplace(doc.title || '');
    const meta = doc.querySelector('meta[name="description"]');
    if (meta) meta.content = brandReplace(meta.content);
    doc.querySelectorAll('script[type="application/ld+json"]').forEach((script) => {
      script.textContent = brandReplace(script.textContent || '');
    });
    const brand = doc.querySelector('.brand');
    if (brand) {
      brand.textContent = CUSTOMER.name;
      brand.setAttribute('aria-label', `${CUSTOMER.name} home`);
    }
    const cfg = doc.defaultView.SITE_CONFIG;
    if (cfg?.business) {
      cfg.business.name = CUSTOMER.name;
      cfg.business.title = `${CUSTOMER.name} — Dog Grooming Barcelona`;
      cfg.business.description = `${CUSTOMER.name} dog grooming in Poble-sec, Barcelona.`;
    }
    replaceBrandText(doc);
  };

  const updateContact = (doc, lang) => {
    const cards = [...doc.querySelectorAll('.contact-info-grid .value-card')];
    if (cards.length < 4) return;
    const phone = cards[0].querySelector('a') || cards[0].querySelector('p');
    if (phone) {
      if (phone.tagName === 'A') phone.href = CUSTOMER.phoneHref;
      phone.textContent = CUSTOMER.phoneDisplay;
    }
    const email = cards[1].querySelector('a') || cards[1].querySelector('p');
    if (email) {
      if (email.tagName === 'A') email.href = `mailto:${CUSTOMER.email}`;
      email.textContent = CUSTOMER.email;
    }
    const address = cards[2].querySelector('p');
    if (address) address.innerHTML = `${CUSTOMER.addressLine1}<br>${CUSTOMER.addressLine2}`;
    const hours = cards[3].querySelector('p');
    if (hours) hours.innerHTML = COPY[lang].hours;
  };

  const updateAbout = (doc, lang) => {
    const mapLink = doc.querySelector('.about-map-link');
    if (mapLink) {
      mapLink.href = CUSTOMER.mapsUrl;
      mapLink.setAttribute('aria-label', `Open ${CUSTOMER.name} on Google Maps`);
      const map = mapLink.querySelector('iframe');
      if (map) {
        map.src = CUSTOMER.mapEmbed;
        map.title = `${CUSTOMER.name} location on Google Maps`;
      }
    }
    const pageHero = doc.querySelector('.page-hero-copy');
    if (pageHero) {
      const intro = [...pageHero.children].find((el) => el.tagName === 'P' && !el.classList.contains('kicker'));
      if (intro) intro.textContent = COPY[lang].aboutHero;
    }
    const story = [...doc.querySelectorAll('.story-split .content-lede')];
    if (story[0]) story[0].textContent = COPY[lang].story1;
    if (story[1]) story[1].textContent = COPY[lang].story2;
    const valueCards = [...doc.querySelectorAll('.value-grid .value-card')];
    COPY[lang].values.forEach(([heading, body], index) => {
      const card = valueCards[index];
      if (!card) return;
      const h3 = card.querySelector('h3');
      const p = card.querySelector('p');
      if (h3) h3.textContent = heading;
      if (p) p.textContent = body;
    });
  };

  const updateReviews = (doc, lang) => {
    const section = doc.querySelector('.reviews-section');
    if (!section) return;
    const kicker = section.querySelector(':scope > .section-width > .kicker');
    if (kicker) kicker.textContent = COPY[lang].reviewKicker;
    const reviews = REVIEWS[lang];
    [...section.querySelectorAll('.review-card')].forEach((card, index) => {
      const [name, body] = reviews[index % reviews.length];
      const p = card.querySelector('p');
      const strong = card.querySelector('strong');
      const label = card.querySelector('span');
      if (p) p.textContent = body;
      if (strong) strong.textContent = name;
      if (label) label.textContent = COPY[lang].reviewLabel;
    });
  };

  const updateInstagramPhone = (doc) => {
    const phone = doc.querySelector('.instaphone-frame');
    if (!phone) return;
    const apply = () => {
      try {
        const phoneDoc = phone.contentDocument;
        if (!phoneDoc) return;
        replaceBrandText(phoneDoc);
        phoneDoc.title = brandReplace(phoneDoc.title || '');
      } catch (_) {}
    };
    if (!phone.dataset.artGosBound) {
      phone.dataset.artGosBound = '1';
      phone.addEventListener('load', apply);
    }
    apply();
  };

  const customize = (doc) => {
    if (!doc?.documentElement) return;
    const lang = currentLang(doc);
    ensureStyles(doc);
    updateBrandAndMetadata(doc);
    updateContact(doc, lang);
    updateAbout(doc, lang);
    updateReviews(doc, lang);
    updateInstagramPhone(doc);
    replaceBrandText(doc);
  };

  const bindChild = (doc) => {
    if (!doc?.documentElement) return;
    customize(doc);
    const observer = new doc.defaultView.MutationObserver(() => {
      doc.defaultView.setTimeout(() => customize(doc), 0);
    });
    observer.observe(doc.documentElement, { attributes: true, attributeFilter: ['lang'] });
    doc.addEventListener('click', (event) => {
      if (event.target.closest('.language-switcher, .legal-links, [data-legal-link]')) {
        doc.defaultView.setTimeout(() => customize(doc), 0);
        doc.defaultView.setTimeout(() => customize(doc), 60);
      }
    }, true);
    frame.style.visibility = 'visible';
  };

  frame.addEventListener('load', () => {
    try {
      bindChild(frame.contentDocument);
    } catch (_) {
      frame.style.visibility = 'visible';
    }
  });
})();