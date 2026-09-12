(() => {
  const frame = document.getElementById('customer-demo');
  if (!frame) return;

  const slug = (() => {
    const parts = location.pathname.split('/').filter(Boolean);
    const i = parts.indexOf('demos');
    return i >= 0 ? parts[i + 1] : '';
  })();

  const DATA = {
    'bub-bub-scp': {
      name: 'BUB BUB S.C.P.',
      phoneDisplay: '+34 934 41 71 48',
      phoneHref: 'tel:+34934417148',
      email: null,
      addressLine1: 'Carrer de Sant Antoni Abat, 34',
      addressLine2: 'Ciutat Vella, 08001 Barcelona',
      mapsUrl: 'https://maps.app.goo.gl/tH4SL27JoDqM7MwG8',
      mapEmbed: 'https://www.google.com/maps?q=BUB%20BUB%20S.C.P.%2C%20Carrer%20de%20Sant%20Antoni%20Abat%2C%2034%2C%2008001%20Barcelona&output=embed',
      description: 'BUB BUB S.C.P. pet grooming in Ciutat Vella, Barcelona.',
      copy: {
        en: {
          hours: 'Mon/Wed/Fri, 09:00–14:00 & 16:30–20:00<br>Tue/Thu, 09:00–13:30 & 16:30–20:00<br>Sat, 09:00–14:00 · Sun closed',
          reviewKicker: 'GOOGLE REVIEWS · 4.8/5 · 88 REVIEWS', reviewLabel: 'Google review',
          aboutHero: 'BUB BUB S.C.P. is a long-standing neighborhood pet groomer in Ciutat Vella, Barcelona, praised for patient handling, friendly service and personal attention.',
          story1: 'At Carrer de Sant Antoni Abat 34, BUB BUB S.C.P. has served local pet owners since 1996. Reviews mention both grooming care and a trusted neighborhood relationship built over many years.',
          story2: 'Customers regularly highlight calm handling with nervous dogs, clean and soft coats, good de-shedding results and useful pet-care products in the shop.',
          values: [['Patient Handling','Reviews repeatedly mention patience, affection and calm treatment, including with nervous dogs.'],['Long-Standing Local Care','The business has been serving Barcelona pet owners since 1996.'],['Grooming Results','Clients praise clean coats, careful de-shedding and pets leaving comfortable and happy.'],['Neighborhood Service','Long-time customers value the friendly attention and useful pet-care products available in store.']],
          reviews: [['Albert Borràs','Very happy with the de-shedding treatment: good attention, fair pricing and a happy dog at the end.'],['N T','The grooming is consistently good, the staff connect well with dogs, and the shop also has useful pet products at good prices.'],['Jairo Ivan Calvache Babilonia','A long-time customer who values the attentive, cordial service and the care shown to his dog Ariel over many years.'],['Rosete 13','Their nervous dog Oso gradually gained confidence thanks to the team’s patience and affection, and now leaves calm and happy.']]
        },
        de: {
          hours: 'Mo/Mi/Fr, 09:00–14:00 & 16:30–20:00<br>Di/Do, 09:00–13:30 & 16:30–20:00<br>Sa, 09:00–14:00 · So geschlossen',
          reviewKicker: 'GOOGLE-BEWERTUNGEN · 4,8/5 · 88 BEWERTUNGEN', reviewLabel: 'Google-Bewertung',
          aboutHero: 'BUB BUB S.C.P. ist ein traditionsreicher Tierpflegesalon in Ciutat Vella, Barcelona. Kundinnen und Kunden loben den geduldigen Umgang, den freundlichen Service und die persönliche Betreuung.',
          story1: 'In der Carrer de Sant Antoni Abat 34 betreut BUB BUB S.C.P. seit 1996 Haustiere aus der Nachbarschaft. Bewertungen erwähnen sowohl die Pflege als auch die langjährige persönliche Beziehung zu Stammkunden.',
          story2: 'Besonders oft genannt werden der ruhige Umgang mit nervösen Hunden, saubere und weiche Felle, gute Ergebnisse beim Enthaaren sowie nützliche Pflegeprodukte im Laden.',
          values: [['Geduldiger Umgang','Bewertungen heben Geduld, Zuwendung und einen ruhigen Umgang hervor, auch bei nervösen Hunden.'],['Seit vielen Jahren vor Ort','Das Geschäft betreut Haustiere in Barcelona seit 1996.'],['Gute Pflegeergebnisse','Kunden loben saubere Felle, sorgfältige Fellpflege und entspannte Tiere nach dem Termin.'],['Nachbarschaftsservice','Stammkunden schätzen die freundliche Betreuung und nützliche Produkte für Haustiere im Geschäft.']],
          reviews: [['Albert Borràs','Sehr zufrieden mit der Enthaarungsbehandlung: gute Betreuung, faire Preise und am Ende ein glücklicher Hund.'],['N T','Die Pflege ist konstant gut, das Team hat einen tollen Zugang zu Hunden und im Laden gibt es nützliche Tierprodukte zu guten Preisen.'],['Jairo Ivan Calvache Babilonia','Ein langjähriger Kunde, der den aufmerksamen, herzlichen Service und die jahrelange Betreuung seiner Hündin Ariel schätzt.'],['Rosete 13','Der ängstliche Oso fasste dank Geduld und Zuwendung des Teams immer mehr Vertrauen und geht heute ruhig und glücklich nach Hause.']]
        },
        es: {
          hours: 'Lun/Mié/Vie, 09:00–14:00 y 16:30–20:00<br>Mar/Jue, 09:00–13:30 y 16:30–20:00<br>Sáb, 09:00–14:00 · Dom cerrado',
          reviewKicker: 'RESEÑAS DE GOOGLE · 4,8/5 · 88 RESEÑAS', reviewLabel: 'Reseña de Google',
          aboutHero: 'BUB BUB S.C.P. es una peluquería de mascotas de larga trayectoria en Ciutat Vella, Barcelona, valorada por el trato paciente, la amabilidad y la atención personal.',
          story1: 'En Carrer de Sant Antoni Abat 34, BUB BUB S.C.P. atiende a mascotas del barrio desde 1996. Las reseñas hablan tanto del cuidado de peluquería como de la relación de confianza construida durante años con sus clientes.',
          story2: 'Los clientes destacan el trato tranquilo con perros miedosos, los pelajes limpios y suaves, los buenos resultados de deslanado y los productos para mascotas disponibles en la tienda.',
          values: [['Trato paciente','Las reseñas destacan paciencia, cariño y calma, también con perros nerviosos.'],['Trayectoria local','El negocio atiende a mascotas de Barcelona desde 1996.'],['Buenos resultados','Los clientes valoran pelajes limpios, deslanados cuidadosos y mascotas que salen tranquilas y contentas.'],['Servicio de barrio','Los clientes habituales aprecian la atención cercana y los productos útiles para mascotas disponibles en tienda.']],
          reviews: [['Albert Borràs','Muy contento con el deslanado: buena atención, buen precio y el perro salió feliz.'],['N T','La peluquería funciona siempre muy bien, conectan genial con los perros y además tienen productos útiles para mascotas a buen precio.'],['Jairo Ivan Calvache Babilonia','Cliente de muchos años que valora la atención cordial y el cuidado que han dado a su perrita Ariel durante todo este tiempo.'],['Rosete 13','Su perro Oso, que es miedoso, fue ganando confianza gracias a la paciencia y el cariño del equipo y ahora sale tranquilo y feliz.']]
        },
        ca: {
          hours: 'Dl/Dc/Dv, 09:00–14:00 i 16:30–20:00<br>Dt/Dj, 09:00–13:30 i 16:30–20:00<br>Ds, 09:00–14:00 · Dg tancat',
          reviewKicker: 'RESSENYES DE GOOGLE · 4,8/5 · 88 RESSENYES', reviewLabel: 'Ressenya de Google',
          aboutHero: 'BUB BUB S.C.P. és una perruqueria de mascotes amb una llarga trajectòria a Ciutat Vella, Barcelona, valorada pel tracte pacient, l’amabilitat i l’atenció personal.',
          story1: 'Al carrer de Sant Antoni Abat 34, BUB BUB S.C.P. atén mascotes del barri des de 1996. Les ressenyes parlen tant de la cura de perruqueria com de la relació de confiança construïda durant anys amb la clientela.',
          story2: 'Els clients destaquen el tracte tranquil amb gossos porucs, els pelatges nets i suaus, els bons resultats de desllanat i els productes per a mascotes disponibles a la botiga.',
          values: [['Tracte pacient','Les ressenyes destaquen paciència, afecte i calma, també amb gossos nerviosos.'],['Trajectòria local','El negoci atén mascotes de Barcelona des de 1996.'],['Bons resultats','Els clients valoren pelatges nets, desllanats acurats i mascotes que surten tranquil·les i contentes.'],['Servei de barri','La clientela habitual aprecia l’atenció propera i els productes útils per a mascotes disponibles a la botiga.']],
          reviews: [['Albert Borràs','Molt content amb el desllanat: bona atenció, bon preu i el gos va sortir feliç.'],['N T','La perruqueria funciona sempre molt bé, connecten genial amb els gossos i també tenen productes útils per a mascotes a bon preu.'],['Jairo Ivan Calvache Babilonia','Client de molts anys que valora l’atenció cordial i la cura que han donat a la seva gossa Ariel durant tot aquest temps.'],['Rosete 13','El seu gos Oso, que és poruc, va anar guanyant confiança gràcies a la paciència i l’afecte de l’equip i ara surt tranquil i content.']]
        }
      }
    },

    'bigotis': {
      name: 'BIGOTIS',
      phoneDisplay: '+34 934 24 05 05',
      phoneHref: 'tel:+34934240505',
      email: 'bigotis_rocafort@hotmail.com',
      addressLine1: 'Carrer de Rocafort, 143, local 3',
      addressLine2: 'Eixample, 08015 Barcelona',
      mapsUrl: 'https://maps.app.goo.gl/XgAoDycxUiWgzJYx9',
      mapEmbed: 'https://www.google.com/maps?q=BIGOTIS%2C%20Carrer%20de%20Rocafort%2C%20143%2C%20local%203%2C%2008015%20Barcelona&output=embed',
      description: 'BIGOTIS dog grooming in Eixample, Barcelona.',
      copy: {
        en: {
          hours: 'Mon–Fri, 10:00–17:00<br>Sat, 10:00–14:00 · Sun closed',
          reviewKicker: 'GOOGLE REVIEWS · 5.0/5 · 59 REVIEWS', reviewLabel: 'Google review',
          aboutHero: 'BIGOTIS is a neighborhood dog grooming salon in Eixample, Barcelona, known in customer reviews for affectionate handling, careful grooming and professional results.',
          story1: 'At Carrer de Rocafort 143, local 3, BIGOTIS combines dog grooming by appointment with pet food and accessories. Reviews repeatedly praise the team’s friendly treatment and consistent results.',
          story2: 'Clients mention first-time puppies, thick-coated breeds, dogs with sensitivities and precise haircuts, often highlighting how comfortable their pets seem after the visit.',
          values: [['Affectionate Handling','Customers repeatedly describe kind, reassuring treatment and dogs that leave happy.'],['Careful Coat Work','Reviews praise baths, de-shedding and grooming results on different coat types.'],['Tailored Cuts','Clients value cuts that follow their instructions and suit each dog.'],['Neighborhood Service','The shop combines grooming by appointment with pet food and accessories in Eixample.']],
          reviews: [['Sandra Andreu Muñoz','They found room in a busy schedule for her dog’s first bath, and the dog came out shiny and beautifully cared for.'],['Oscar','Their Siberian husky has a huge amount of coat, but the grooming result still came out excellent.'],['Amaya Infantes','Her puppy’s first grooming visit went extremely well: clean, happy, nails done and even a finishing bow tie.'],['Mike Kapsalis','His dog normally dislikes baths but became comfortable here; he values leaving the dog in caring hands and collecting a clean, happy pet.']]
        },
        de: {
          hours: 'Mo–Fr, 10:00–17:00<br>Sa, 10:00–14:00 · So geschlossen',
          reviewKicker: 'GOOGLE-BEWERTUNGEN · 5,0/5 · 59 BEWERTUNGEN', reviewLabel: 'Google-Bewertung',
          aboutHero: 'BIGOTIS ist ein Hundepflegesalon im Eixample in Barcelona. In Kundenbewertungen werden der liebevolle Umgang, die sorgfältige Pflege und die professionellen Ergebnisse besonders hervorgehoben.',
          story1: 'In der Carrer de Rocafort 143, Lokal 3, verbindet BIGOTIS Hundepflege nach Termin mit Tierfutter und Zubehör. Bewertungen loben immer wieder den freundlichen Umgang und die zuverlässigen Ergebnisse.',
          story2: 'Kunden berichten von Welpen beim ersten Besuch, Hunden mit dichtem Fell oder empfindlicher Haut sowie präzisen Haarschnitten und betonen oft, wie wohl sich ihre Tiere nach dem Termin fühlen.',
          values: [['Liebevoller Umgang','Kunden beschreiben eine freundliche, beruhigende Betreuung und Hunde, die glücklich nach Hause gehen.'],['Sorgfältige Fellpflege','Bewertungen loben Bäder, Enthaarung und Pflegeergebnisse bei unterschiedlichen Felltypen.'],['Individuelle Schnitte','Kunden schätzen Schnitte, die ihren Wünschen entsprechen und zum jeweiligen Hund passen.'],['Service im Viertel','Das Geschäft verbindet Hundepflege nach Termin mit Tierfutter und Zubehör im Eixample.']],
          reviews: [['Sandra Andreu Muñoz','Trotz vollem Terminplan wurde Platz für das erste Bad ihres Hundes gefunden, der danach glänzend und wunderschön gepflegt war.'],['Oscar','Ihr Siberian Husky hat sehr viel Fell, trotzdem war das Pflegeergebnis ausgezeichnet.'],['Amaya Infantes','Der erste Pflegebesuch ihres Welpen lief hervorragend: sauber, glücklich, Krallen gepflegt und sogar mit einer kleinen Fliege zum Abschluss.'],['Mike Kapsalis','Sein Hund mag Bäder normalerweise nicht, fühlte sich hier aber wohl; er schätzt das Vertrauen und einen sauberen, glücklichen Hund beim Abholen.']]
        },
        es: {
          hours: 'Lun–Vie, 10:00–17:00<br>Sáb, 10:00–14:00 · Dom cerrado',
          reviewKicker: 'RESEÑAS DE GOOGLE · 5,0/5 · 59 RESEÑAS', reviewLabel: 'Reseña de Google',
          aboutHero: 'BIGOTIS es una peluquería canina de barrio en el Eixample de Barcelona, conocida en las reseñas por el trato cariñoso, el cuidado del pelaje y los resultados profesionales.',
          story1: 'En Carrer de Rocafort 143, local 3, BIGOTIS combina peluquería canina con cita previa y venta de alimentación y accesorios para mascotas. Las reseñas destacan de forma constante el trato cercano y los buenos resultados.',
          story2: 'Los clientes hablan de cachorros en su primera visita, perros con mucho pelo o sensibilidades y cortes hechos tal como los piden, además de mascotas que salen cómodas y contentas.',
          values: [['Trato cariñoso','Los clientes describen una atención amable y tranquilizadora, con perros que salen contentos.'],['Cuidado del pelaje','Las reseñas valoran baños, deslanado y resultados de peluquería en distintos tipos de pelo.'],['Cortes a medida','Los clientes aprecian que los cortes sigan sus indicaciones y se adapten a cada perro.'],['Servicio de barrio','La tienda combina peluquería con cita previa y alimentación y accesorios para mascotas en el Eixample.']],
          reviews: [['Sandra Andreu Muñoz','Le hicieron un hueco aunque tenían la agenda llena para el primer baño de su perra, que salió brillante y muy bien cuidada.'],['Oscar','Su husky siberiano tiene muchísimo pelo y aun así el resultado de la peluquería fue excelente.'],['Amaya Infantes','La primera visita de su cachorro fue genial: salió limpio, contento, con las uñas perfectas y hasta con una pajarita de acabado.'],['Mike Kapsalis','Su perro normalmente no disfruta de los baños pero aquí se sintió cómodo; valora poder dejarlo en buenas manos y recogerlo limpio y feliz.']]
        },
        ca: {
          hours: 'Dl–Dv, 10:00–17:00<br>Ds, 10:00–14:00 · Dg tancat',
          reviewKicker: 'RESSENYES DE GOOGLE · 5,0/5 · 59 RESSENYES', reviewLabel: 'Ressenya de Google',
          aboutHero: 'BIGOTIS és una perruqueria canina de barri a l’Eixample de Barcelona, coneguda a les ressenyes pel tracte afectuós, la cura del pelatge i els resultats professionals.',
          story1: 'Al carrer de Rocafort 143, local 3, BIGOTIS combina perruqueria canina amb cita prèvia i venda d’alimentació i accessoris per a mascotes. Les ressenyes destaquen de manera constant el tracte proper i els bons resultats.',
          story2: 'Els clients parlen de cadells en la seva primera visita, gossos amb molt pèl o sensibilitats i talls fets tal com els demanen, a més de mascotes que surten còmodes i contentes.',
          values: [['Tracte afectuós','Els clients descriuen una atenció amable i tranquil·litzadora, amb gossos que surten contents.'],['Cura del pelatge','Les ressenyes valoren banys, desllanat i resultats de perruqueria en diferents tipus de pèl.'],['Talls a mida','Els clients aprecien que els talls segueixin les seves indicacions i s’adaptin a cada gos.'],['Servei de barri','La botiga combina perruqueria amb cita prèvia i alimentació i accessoris per a mascotes a l’Eixample.']],
          reviews: [['Sandra Andreu Muñoz','Li van fer un lloc tot i tenir l’agenda plena per al primer bany de la seva gossa, que va sortir brillant i molt ben cuidada.'],['Oscar','El seu husky siberià té moltíssim pèl i, tot i així, el resultat de la perruqueria va ser excel·lent.'],['Amaya Infantes','La primera visita del seu cadell va anar genial: va sortir net, content, amb les ungles perfectes i fins i tot amb un llacet final.'],['Mike Kapsalis','El seu gos normalment no gaudeix dels banys però aquí es va sentir còmode; valora poder deixar-lo en bones mans i recollir-lo net i feliç.']]
        }
      }
    }
  };

  const customer = DATA[slug];
  if (!customer) { frame.style.visibility = 'visible'; return; }

  const brandReplace = (value = '') => String(value)
    .replaceAll('GRÜM', customer.name)
    .replaceAll('Grüm', customer.name)
    .replaceAll('grüm', customer.name)
    .replaceAll('GRUM', customer.name)
    .replaceAll('Grum', customer.name);

  const langFor = (doc) => {
    const lang = (doc.documentElement.lang || 'en').toLowerCase();
    return customer.copy[lang] ? lang : 'en';
  };

  const replaceBrandText = (doc, root = doc.body) => {
    if (!root) return;
    const walker = doc.createTreeWalker(root, doc.defaultView.NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const parent = node.parentElement;
      if (!parent || ['SCRIPT','STYLE','NOSCRIPT'].includes(parent.tagName)) return;
      if (parent.closest('a[href^="mailto:"]')) return;
      const next = brandReplace(node.nodeValue);
      if (next !== node.nodeValue) node.nodeValue = next;
    });
    root.querySelectorAll('[aria-label],[title],[alt]').forEach((el) => {
      ['aria-label','title','alt'].forEach((attr) => {
        if (el.hasAttribute(attr)) el.setAttribute(attr, brandReplace(el.getAttribute(attr)));
      });
    });
  };

  const ensureReviewStyles = (doc) => {
    if (doc.getElementById('customer-review-fixes')) return;
    const style = doc.createElement('style');
    style.id = 'customer-review-fixes';
    style.textContent = '.reviews-section{display:block!important;background:#fffaf6!important}.reviews-section .kicker{color:#01463c!important}.review-card{opacity:1!important;visibility:visible!important;color:#fff!important}.review-card.vc-green{background:#01463c!important}.review-card.vc-black{background:#232121!important}.review-card.vc-orange{background:#f26312!important}.review-card.vc-pink{background:#f87686!important}.review-card p,.review-card strong{color:#fff!important}.review-card span{color:rgba(255,255,255,.78)!important}.review-stars{color:#fff3b0!important}';
    doc.head?.appendChild(style);
  };

  const updateContact = (doc, lang) => {
    const cards = [...doc.querySelectorAll('.contact-info-grid .value-card')];
    if (cards.length < 4) return;
    const phone = cards[0].querySelector('a') || cards[0].querySelector('p');
    if (phone) { if (phone.tagName === 'A') phone.href = customer.phoneHref; phone.textContent = customer.phoneDisplay; }
    if (customer.email) {
      const email = cards[1].querySelector('a') || cards[1].querySelector('p');
      if (email) { if (email.tagName === 'A') email.href = `mailto:${customer.email}`; email.textContent = customer.email; }
    }
    const address = cards[2].querySelector('p');
    if (address) address.innerHTML = `${customer.addressLine1}<br>${customer.addressLine2}`;
    const hours = cards[3].querySelector('p');
    if (hours) hours.innerHTML = customer.copy[lang].hours;
  };

  const updateAbout = (doc, lang) => {
    const c = customer.copy[lang];
    const mapLink = doc.querySelector('.about-map-link');
    if (mapLink) {
      mapLink.href = customer.mapsUrl;
      mapLink.setAttribute('aria-label', `Open ${customer.name} on Google Maps`);
      const map = mapLink.querySelector('iframe');
      if (map) { map.src = customer.mapEmbed; map.title = `${customer.name} location on Google Maps`; }
    }
    const pageHero = doc.querySelector('.page-hero-copy');
    if (pageHero) {
      const intro = [...pageHero.children].find((el) => el.tagName === 'P' && !el.classList.contains('kicker'));
      if (intro) intro.textContent = c.aboutHero;
    }
    const story = [...doc.querySelectorAll('.story-split .content-lede')];
    if (story[0]) story[0].textContent = c.story1;
    if (story[1]) story[1].textContent = c.story2;
    const valueCards = [...doc.querySelectorAll('.value-grid .value-card')];
    c.values.forEach(([heading, body], i) => {
      const card = valueCards[i]; if (!card) return;
      const h3 = card.querySelector('h3'); const p = card.querySelector('p');
      if (h3) h3.textContent = heading; if (p) p.textContent = body;
    });
  };

  const updateReviews = (doc, lang) => {
    const section = doc.querySelector('.reviews-section');
    if (!section) return;
    ensureReviewStyles(doc);
    const c = customer.copy[lang];
    const kicker = section.querySelector(':scope > .section-width > .kicker');
    if (kicker) kicker.textContent = c.reviewKicker;
    [...section.querySelectorAll('.review-card')].forEach((card, i) => {
      const [name, body] = c.reviews[i % c.reviews.length];
      const p = card.querySelector('p'); const strong = card.querySelector('strong'); const label = card.querySelector('span');
      if (p) p.textContent = body; if (strong) strong.textContent = name; if (label) label.textContent = c.reviewLabel;
    });
  };

  const updateInstagramPhone = (doc) => {
    const phone = doc.querySelector('.instaphone-frame');
    if (!phone) return;
    const apply = () => { try { const pdoc = phone.contentDocument; if (!pdoc) return; replaceBrandText(pdoc); pdoc.title = brandReplace(pdoc.title || ''); } catch (_) {} };
    if (!phone.dataset.customerBound) { phone.dataset.customerBound = '1'; phone.addEventListener('load', apply); }
    apply();
  };

  const customize = (doc) => {
    if (!doc?.documentElement) return;
    const lang = langFor(doc);
    doc.title = brandReplace(doc.title || '');
    const meta = doc.querySelector('meta[name="description"]');
    if (meta) meta.content = brandReplace(meta.content);
    const brand = doc.querySelector('.brand');
    if (brand) { brand.textContent = customer.name; brand.setAttribute('aria-label', `${customer.name} home`); }
    const cfg = doc.defaultView.SITE_CONFIG;
    if (cfg?.business) { cfg.business.name = customer.name; cfg.business.title = `${customer.name} — Dog Grooming`; cfg.business.description = customer.description; }
    replaceBrandText(doc);
    updateContact(doc, lang);
    updateAbout(doc, lang);
    updateReviews(doc, lang);
    updateInstagramPhone(doc);
    replaceBrandText(doc);
  };

  const bind = () => {
    try {
      const doc = frame.contentDocument;
      if (!doc?.documentElement) return;
      customize(doc);
      if (!doc.documentElement.dataset.customerSkinBound) {
        doc.documentElement.dataset.customerSkinBound = '1';
        const observer = new doc.defaultView.MutationObserver(() => doc.defaultView.setTimeout(() => customize(doc), 0));
        observer.observe(doc.documentElement, { attributes:true, attributeFilter:['lang'] });
        doc.addEventListener('click', (event) => {
          if (event.target.closest('.language-switcher, .legal-links, [data-legal-link]')) {
            doc.defaultView.setTimeout(() => customize(doc), 0);
            doc.defaultView.setTimeout(() => customize(doc), 60);
          }
        }, true);
      }
    } catch (_) {}
    frame.style.visibility = 'visible';
  };

  frame.addEventListener('load', bind);
  try { if (frame.contentDocument?.readyState === 'complete') bind(); } catch (_) {}
})();