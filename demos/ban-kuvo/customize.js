(() => {
  const frame = document.getElementById('customer-demo');
  if (!frame) return;

  const CUSTOMER = {
    name: 'BAN-KUVO',
    phoneDisplay: '+34 931 63 35 14',
    phoneHref: 'tel:+34931633514',
    email: 'bankuvo@gmail.com',
    addressLine1: 'Carrer de Tamarit, 113',
    addressLine2: '08015 Barcelona',
    mapsUrl: 'https://maps.app.goo.gl/4EmmUdxpb33HLGz19',
    mapEmbed: 'https://www.google.com/maps?q=BAN-KUVO%2C%20Carrer%20de%20Tamarit%2C%20113%2C%2008015%20Barcelona&output=embed'
  };

  const COPY = {
    en: {
      hours: 'Mon–Fri, 10:00–14:00 & 17:00–20:00<br>Sat, 11:00–14:00 · Sun closed',
      reviewKicker: 'GOOGLE REVIEWS · 4.8/5 · 58 REVIEWS',
      reviewLabel: 'Google review',
      aboutHero: 'BAN-KUVO is a neighborhood pet shop and dog grooming salon in Sant Antoni, Barcelona, known by clients for patient, affectionate care and personal advice.',
      story1: 'At Carrer de Tamarit 113, BAN-KUVO combines pet supplies with professional dog grooming. Reviews regularly mention Yolanda’s patience, affection and honest advice.',
      story2: 'Clients especially value the calm treatment of nervous dogs and the personal attention given to each pet.',
      values: [
        ['Personal Care', 'Clients consistently highlight patient, individual attention for each pet.'],
        ['Affectionate Handling', 'Reviews often mention kind, loving treatment, especially with nervous dogs.'],
        ['Honest Advice', 'Customers value practical recommendations and straightforward guidance.'],
        ['Pet Shop & Grooming', 'BAN-KUVO combines pet supplies and dog grooming in its Sant Antoni shop.']
      ]
    },
    de: {
      hours: 'Mo–Fr, 10:00–14:00 & 17:00–20:00<br>Sa, 11:00–14:00 · So geschlossen',
      reviewKicker: 'GOOGLE-BEWERTUNGEN · 4,8/5 · 58 BEWERTUNGEN',
      reviewLabel: 'Google-Bewertung',
      aboutHero: 'BAN-KUVO ist eine Tierhandlung mit Hundepflege in Sant Antoni, Barcelona. Kundinnen und Kunden heben besonders die geduldige, liebevolle Betreuung und persönliche Beratung hervor.',
      story1: 'In der Carrer de Tamarit 113 verbindet BAN-KUVO Tierbedarf mit professioneller Hundepflege. In Bewertungen werden Yolandas Geduld, Herzlichkeit und ehrliche Beratung regelmäßig hervorgehoben.',
      story2: 'Besonders geschätzt werden der ruhige Umgang mit nervösen Hunden und die persönliche Aufmerksamkeit für jedes Tier.',
      values: [
        ['Persönliche Betreuung', 'Kundinnen und Kunden loben die geduldige, individuelle Aufmerksamkeit für jedes Tier.'],
        ['Liebevoller Umgang', 'Bewertungen erwähnen häufig den freundlichen und liebevollen Umgang, besonders mit nervösen Hunden.'],
        ['Ehrliche Beratung', 'Geschätzt werden praktische Empfehlungen und eine klare, ehrliche Beratung.'],
        ['Tierladen & Hundepflege', 'BAN-KUVO verbindet Tierbedarf und Hundepflege in seinem Geschäft in Sant Antoni.']
      ]
    },
    es: {
      hours: 'Lun–Vie, 10:00–14:00 y 17:00–20:00<br>Sáb, 11:00–14:00 · Dom cerrado',
      reviewKicker: 'RESEÑAS DE GOOGLE · 4,8/5 · 58 RESEÑAS',
      reviewLabel: 'Reseña de Google',
      aboutHero: 'BAN-KUVO es una tienda para mascotas y peluquería canina de Sant Antoni, Barcelona, valorada por sus clientes por el trato paciente, cariñoso y el asesoramiento personalizado.',
      story1: 'En Carrer de Tamarit 113, BAN-KUVO combina productos para mascotas con peluquería canina profesional. Las reseñas mencionan con frecuencia la paciencia, el cariño y los consejos honestos de Yolanda.',
      story2: 'Los clientes valoran especialmente el trato tranquilo con perros nerviosos y la atención personal que recibe cada mascota.',
      values: [
        ['Atención personal', 'Los clientes destacan la paciencia y la atención individual dedicada a cada mascota.'],
        ['Trato cariñoso', 'Las reseñas mencionan a menudo un trato amable y cariñoso, especialmente con perros nerviosos.'],
        ['Consejo honesto', 'Los clientes valoran las recomendaciones prácticas y el asesoramiento sincero.'],
        ['Tienda & peluquería', 'BAN-KUVO combina productos para mascotas y peluquería canina en su tienda de Sant Antoni.']
      ]
    },
    ca: {
      hours: 'Dl–Dv, 10:00–14:00 i 17:00–20:00<br>Ds, 11:00–14:00 · Dg tancat',
      reviewKicker: 'RESSENYES DE GOOGLE · 4,8/5 · 58 RESSENYES',
      reviewLabel: 'Ressenya de Google',
      aboutHero: 'BAN-KUVO és una botiga per a mascotes i perruqueria canina de Sant Antoni, Barcelona, valorada pels clients pel tracte pacient, afectuós i l’assessorament personalitzat.',
      story1: 'Al carrer de Tamarit 113, BAN-KUVO combina productes per a mascotes amb perruqueria canina professional. Les ressenyes destaquen sovint la paciència, l’afecte i els consells honestos de la Yolanda.',
      story2: 'Els clients valoren especialment el tracte tranquil amb gossos nerviosos i l’atenció personal que rep cada mascota.',
      values: [
        ['Atenció personal', 'Els clients destaquen la paciència i l’atenció individual dedicada a cada mascota.'],
        ['Tracte afectuós', 'Les ressenyes mencionen sovint un tracte amable i afectuós, especialment amb gossos nerviosos.'],
        ['Consell honest', 'Els clients valoren les recomanacions pràctiques i l’assessorament sincer.'],
        ['Botiga & perruqueria', 'BAN-KUVO combina productes per a mascotes i perruqueria canina a la seva botiga de Sant Antoni.']
      ]
    }
  };

  const REVIEWS = {
    en: [
      ['Andrea del Valle S. G.', 'Our first visit came from a recommendation and I was delighted. You can tell they genuinely care about what they do.'],
      ['Jeroni Muñoz i Verdaguer', 'Kira is a little nervous, but they treat her wonderfully and she always leaves happy.'],
      ['Oscar Fernandez', 'You can tell they truly love animals and pay attention to what each one needs.'],
      ['Jaume Llargues', 'Chiara is scared of water, but Yolanda calms her with patience, affection and treats.'],
      ['Fernanda Lemos', 'Bond’s first bath here was a great experience. Yolanda was very affectionate and he came out looking even better.'],
      ['Isis Marelli', 'Woody loves coming here. He gets lots of affection and always leaves happy and smelling great.'],
      ['Maite T. B.', 'Yolanda is professional and caring. CoCó came out beautifully groomed, very clean and with a great cut.'],
      ['Karlota G. V.', 'Yolanda gives honest advice and treats the animals with real affection.'],
      ['Santi', 'Excellent treatment and lots of patience with Max. They advise you on everything.'],
      ['Airbici', 'Atena is always very happy to come here.']
    ],
    de: [
      ['Andrea del Valle S. G.', 'Wir kamen auf Empfehlung zum ersten Mal und waren begeistert. Man merkt, dass hier mit echter Hingabe gearbeitet wird.'],
      ['Jeroni Muñoz i Verdaguer', 'Kira ist etwas nervös, wird aber wunderbar behandelt und geht immer glücklich nach Hause.'],
      ['Oscar Fernandez', 'Man merkt, dass Tiere hier wirklich geliebt werden und auf ihre individuellen Bedürfnisse geachtet wird.'],
      ['Jaume Llargues', 'Chiara hat Angst vor Wasser, aber Yolanda beruhigt sie mit Geduld, Zuwendung und Leckerlis.'],
      ['Fernanda Lemos', 'Bonds erstes Bad hier war eine tolle Erfahrung. Yolanda war sehr liebevoll und er sah danach noch schöner aus.'],
      ['Isis Marelli', 'Woody kommt sehr gern hierher. Er bekommt viel Zuwendung und geht immer glücklich und frisch duftend nach Hause.'],
      ['Maite T. B.', 'Yolanda ist professionell und herzlich. CoCó war wunderschön gepflegt, sehr sauber und toll geschnitten.'],
      ['Karlota G. V.', 'Yolanda berät ehrlich und behandelt die Tiere mit echter Herzlichkeit.'],
      ['Santi', 'Ausgezeichneter Umgang und sehr viel Geduld mit Max. Man wird bei allem gut beraten.'],
      ['Airbici', 'Atena kommt immer sehr gerne hierher.']
    ],
    es: [
      ['Andrea del Valle S. G.', 'Fuimos por primera vez por recomendación y salimos encantados. Se nota que les importa de verdad lo que hacen.'],
      ['Jeroni Muñoz i Verdaguer', 'Kira es un poco miedosa, pero la tratan de maravilla y siempre sale contenta.'],
      ['Oscar Fernandez', 'Se nota que aman a los animales y que están pendientes de lo que necesita cada uno.'],
      ['Jaume Llargues', 'Chiara tiene miedo al agua, pero Yolanda consigue tranquilizarla con paciencia, cariño y premios.'],
      ['Fernanda Lemos', 'El primer baño de Bond aquí fue una gran experiencia. Yolanda fue muy cariñosa y salió todavía más guapo.'],
      ['Isis Marelli', 'Woody adora venir. Le dan mucho cariño y siempre sale feliz y con un olor estupendo.'],
      ['Maite T. B.', 'Yolanda es profesional y cariñosa. CoCó salió guapísima, muy limpia y con un corte genial.'],
      ['Karlota G. V.', 'Yolanda aconseja con honestidad y trata a los animales con muchísimo cariño.'],
      ['Santi', 'Trato excelente y muchísima paciencia con Max. Te asesoran en todo.'],
      ['Airbici', 'Atena está siempre súper contenta de venir aquí.']
    ],
    ca: [
      ['Andrea del Valle S. G.', 'Hi vam anar per primera vegada per recomanació i en vam sortir encantats. Es nota que els importa de debò la feina que fan.'],
      ['Jeroni Muñoz i Verdaguer', 'La Kira és una mica poruga, però la tracten de meravella i sempre en surt contenta.'],
      ['Oscar Fernandez', 'Es nota que estimen els animals i que estan pendents del que necessita cadascun.'],
      ['Jaume Llargues', 'La Chiara té por de l’aigua, però la Yolanda aconsegueix tranquil·litzar-la amb paciència, afecte i premis.'],
      ['Fernanda Lemos', 'El primer bany del Bond aquí va ser una gran experiència. La Yolanda va ser molt afectuosa i va sortir encara més guapo.'],
      ['Isis Marelli', 'En Woody adora venir-hi. Li donen molt d’afecte i sempre surt content i amb molt bona olor.'],
      ['Maite T. B.', 'La Yolanda és professional i afectuosa. La CoCó va sortir guapíssima, molt neta i amb un tall genial.'],
      ['Karlota G. V.', 'La Yolanda aconsella amb honestedat i tracta els animals amb molt d’afecte.'],
      ['Santi', 'Tracte excel·lent i moltíssima paciència amb en Max. T’assessoren en tot.'],
      ['Airbici', 'L’Atena està sempre molt contenta de venir aquí.']
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

  const updateBrandAndMetadata = (doc) => {
    doc.title = brandReplace(doc.title || '');
    const meta = doc.querySelector('meta[name="description"]');
    if (meta) meta.content = brandReplace(meta.content);
    const brand = doc.querySelector('.brand');
    if (brand) {
      brand.textContent = CUSTOMER.name;
      brand.setAttribute('aria-label', `${CUSTOMER.name} home`);
    }
    const cfg = doc.defaultView.SITE_CONFIG;
    if (cfg?.business) {
      cfg.business.name = CUSTOMER.name;
      cfg.business.title = `${CUSTOMER.name} — Dog Grooming & Pet Shop`;
      cfg.business.description = `${CUSTOMER.name} pet shop and dog grooming in Sant Antoni, Barcelona.`;
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
    if (!phone.dataset.banKuvoBound) {
      phone.dataset.banKuvoBound = '1';
      phone.addEventListener('load', apply);
    }
    apply();
  };

  const customize = (doc) => {
    if (!doc?.documentElement) return;
    const lang = currentLang(doc);
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
