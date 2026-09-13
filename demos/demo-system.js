(() => {
  const frame = document.getElementById('customer-demo');
  if (!frame) return;

  const parts = location.pathname.split('/').filter(Boolean);
  const demosIndex = parts.indexOf('demos');
  const slug = demosIndex >= 0 ? parts[demosIndex + 1] : '';
  const mode = document.body?.dataset.demoMode || (parts.includes('web-ipad') ? 'web-ipad' : parts.includes('web') ? 'web' : 'mobile');
  const modeLabel = mode === 'web-ipad' ? 'WEB IPAD' : mode === 'web' ? 'Web/Desktop' : 'Mobile';

  // Shared demo-system rule: customer-specific data lives in profiles/customizers;
  // shared behavior lives here so previous, current and future demos inherit it.
  const LABELS = {
    dog: {
      en: 'Dog Grooming', de: 'Hundepflege', es: 'Peluquería canina', ca: 'Perruqueria canina'
    },
    dogcat: {
      en: 'Dog & Cat Grooming', de: 'Hunde- & Katzenpflege', es: 'Peluquería canina y felina', ca: 'Perruqueria canina i felina'
    },
    pet: {
      en: 'Pet Grooming', de: 'Tierpflege', es: 'Peluquería de mascotas', ca: 'Perruqueria de mascotes'
    },
    petshopdog: {
      en: 'Pet Shop & Dog Grooming', de: 'Tierbedarf & Hundepflege', es: 'Tienda de mascotas y peluquería canina', ca: 'Botiga de mascotes i perruqueria canina'
    }
  };

  const PROFILE_CONTEXT = {
    'lissy': { type:'dog', area:'Eixample, Barcelona' },
    'gusboral': { type:'dogcat', area:'Eixample, Barcelona' },
    'woodys': { type:'dog', area:'Eixample, Barcelona', titleName:"WOODY'S SALON" },
    'la-pelu-montjuic': { type:'pet', area:'Sants-Montjuïc, Barcelona', titleName:'La Pelu de Montjuïc' },
    'amigo-mio': { type:'dog', area:'Eixample, Barcelona' },
    'laika': { type:'dog', area:'Sarrià-Sant Gervasi, Barcelona' },
    'marc-oliva': { type:'dog', area:'Sarrià-Sant Gervasi, Barcelona', titleName:'Marc Oliva' },
    'midoki-maria-cubi': { type:'dog', area:'Sarrià-Sant Gervasi, Barcelona', titleName:'MIDOKI Marià Cubí' },
    'animalades-gracia': { type:'pet', area:'Gràcia, Barcelona' },
    'animals-amb-gracia': { type:'pet', area:'Gràcia, Barcelona' },
    'bamboo-mascotas': { type:'pet', area:'Sant Martí, Barcelona' },
    'el-can-amb-gracia': { type:'dog', area:'Gràcia, Barcelona' },
    'cris-perruqueria-canina-felina': { type:'dogcat', area:'Gràcia, Barcelona', titleName:'Cris Perruqueria Canina i Felina' },
    'urban-pets': { type:'pet', area:'Sarrià-Sant Gervasi, Barcelona' },
    'buf-peluqueria-canina': { type:'dog', area:'Gràcia, Barcelona', titleName:'Buf Peluquería Canina' },
    'kololo-pets': { type:'pet', area:'Gràcia, Barcelona' },
    'can-bau': { type:'dog', area:'Eixample, Barcelona', titleName:'Can Bau' }
  };

  const LEGACY = {
    'mai-friends': {
      name:'MAI FRIENDS', type:'dogcat', area:'Eixample, Barcelona',
      description:{
        en:'MAI FRIENDS is a dog and cat grooming salon on Carrer de Viladomat in Barcelona, also offering pet products and self-service washing.',
        de:'MAI FRIENDS ist ein Hunde- und Katzensalon in der Carrer de Viladomat in Barcelona und bietet außerdem Tierprodukte und Selbstwaschplätze.',
        es:'MAI FRIENDS es una peluquería canina y felina en Carrer de Viladomat, Barcelona, con productos para mascotas y servicio de autolavado.',
        ca:'MAI FRIENDS és una perruqueria canina i felina al carrer de Viladomat, Barcelona, amb productes per a mascotes i servei d’autorrentat.'
      }
    },
    'ban-kuvo': {
      name:'BAN-KUVO', type:'petshopdog', area:'Sant Antoni, Barcelona',
      description:{
        en:'BAN-KUVO is a neighborhood pet shop and dog grooming salon in Sant Antoni, Barcelona, known for patient, affectionate care and personal advice.',
        de:'BAN-KUVO ist eine Tierhandlung mit Hundepflege in Sant Antoni, Barcelona, bekannt für geduldige, liebevolle Betreuung und persönliche Beratung.',
        es:'BAN-KUVO es una tienda para mascotas y peluquería canina de Sant Antoni, Barcelona, valorada por el trato paciente, cariñoso y el asesoramiento personal.',
        ca:'BAN-KUVO és una botiga per a mascotes i perruqueria canina de Sant Antoni, Barcelona, valorada pel tracte pacient, afectuós i l’assessorament personal.'
      }
    },
    'art-gos': {
      name:'ART GOS', type:'dog', area:'Poble-sec, Barcelona',
      description:{
        en:'ART GOS is a dog grooming salon in Poble-sec, Barcelona, known for professional grooming, personal attention and thoughtful coat-care advice.',
        de:'ART GOS ist ein Hundesalon in Poble-sec, Barcelona, bekannt für professionelle Pflege, persönliche Betreuung und hilfreiche Fellpflege-Beratung.',
        es:'ART GOS es una peluquería canina de Poble-sec, Barcelona, conocida por su trabajo profesional, la atención personalizada y los consejos para el pelaje.',
        ca:'ART GOS és una perruqueria canina del Poble-sec, Barcelona, coneguda per la feina professional, l’atenció personalitzada i els consells per al pelatge.'
      }
    },
    'bub-bub-scp': {
      name:'BUB BUB S.C.P.', type:'pet', area:'Ciutat Vella, Barcelona',
      description:{
        en:'BUB BUB S.C.P. is a long-standing neighborhood pet groomer in Ciutat Vella, Barcelona, praised for patient handling, friendly service and personal attention.',
        de:'BUB BUB S.C.P. ist ein traditionsreicher Tierpflegesalon in Ciutat Vella, Barcelona, bekannt für geduldigen Umgang, freundlichen Service und persönliche Betreuung.',
        es:'BUB BUB S.C.P. es una peluquería de mascotas de larga trayectoria en Ciutat Vella, Barcelona, valorada por el trato paciente, amable y personal.',
        ca:'BUB BUB S.C.P. és una perruqueria de mascotes amb llarga trajectòria a Ciutat Vella, Barcelona, valorada pel tracte pacient, amable i personal.'
      }
    },
    'bigotis': {
      name:'BIGOTIS', type:'petshopdog', area:'Eixample, Barcelona',
      description:{
        en:'BIGOTIS is a dog grooming salon and pet shop in Eixample, Barcelona, known for affectionate handling, careful coat work and tailored grooming.',
        de:'BIGOTIS ist ein Hundesalon mit Tierbedarf im Eixample in Barcelona, bekannt für liebevollen Umgang, sorgfältige Fellpflege und individuelle Schnitte.',
        es:'BIGOTIS es una peluquería canina y tienda para mascotas en el Eixample de Barcelona, conocida por el trato cariñoso y los arreglos personalizados.',
        ca:'BIGOTIS és una perruqueria canina i botiga per a mascotes a l’Eixample de Barcelona, coneguda pel tracte afectuós i els arranjaments personalitzats.'
      }
    }
  };

  const langOf = (doc) => {
    const lang = (doc?.documentElement?.lang || 'en').toLowerCase();
    return ['en','de','es','ca'].includes(lang) ? lang : 'en';
  };

  const cleanDescription = (value, max = 175) => {
    const text = String(value || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    if (text.length <= max) return text;
    const cut = text.slice(0, max - 1);
    const safe = cut.slice(0, Math.max(cut.lastIndexOf(' '), max - 25)).trim();
    return `${safe}…`;
  };

  const buildProfileSeo = (lang) => {
    const c = window.DEMO_CUSTOMER;
    if (!c) return null;
    const explicit = c.seo?.[lang] || c.seo?.en;
    if (explicit?.title && explicit?.description) return explicit;

    const context = PROFILE_CONTEXT[slug];
    const about = c.copy?.[lang]?.aboutHero || c.copy?.en?.aboutHero;
    if (!context || !c.name || !about) return null;
    const label = LABELS[context.type]?.[lang] || LABELS.pet[lang];
    const titleName = context.titleName || c.name;
    return {
      title: `${titleName} | ${label} · ${context.area}`,
      description: cleanDescription(about)
    };
  };

  const buildLegacySeo = (lang) => {
    const d = LEGACY[slug];
    if (!d) return null;
    const label = LABELS[d.type]?.[lang] || LABELS.pet[lang];
    return {
      title: `${d.name} | ${label} · ${d.area}`,
      description: cleanDescription(d.description?.[lang] || d.description?.en)
    };
  };

  const ensureMetaName = (doc, name) => {
    let el = doc.querySelector(`meta[name="${name}"]`);
    if (!el && doc.head) {
      el = doc.createElement('meta');
      el.setAttribute('name', name);
      doc.head.appendChild(el);
    }
    return el;
  };

  const ensureMetaProperty = (doc, property) => {
    let el = doc.querySelector(`meta[property="${property}"]`);
    if (!el && doc.head) {
      el = doc.createElement('meta');
      el.setAttribute('property', property);
      doc.head.appendChild(el);
    }
    return el;
  };

  const applyMeta = (doc, seo, titleSuffix = '') => {
    if (!doc?.head || !seo?.title || !seo?.description) return;
    doc.title = titleSuffix ? `${seo.title} — ${titleSuffix}` : seo.title;
    const description = ensureMetaName(doc, 'description');
    if (description) description.content = seo.description;
    const ogTitle = ensureMetaProperty(doc, 'og:title');
    const ogDescription = ensureMetaProperty(doc, 'og:description');
    const twitterTitle = ensureMetaName(doc, 'twitter:title');
    const twitterDescription = ensureMetaName(doc, 'twitter:description');
    if (ogTitle) ogTitle.content = seo.title;
    if (ogDescription) ogDescription.content = seo.description;
    if (twitterTitle) twitterTitle.content = seo.title;
    if (twitterDescription) twitterDescription.content = seo.description;
  };

  const applyIpadEyes = (doc) => {
    if (mode !== 'web-ipad' || !doc?.head) return;
    let style = doc.getElementById('demo-system-web-ipad-static-eyes');
    if (!style) {
      style = doc.createElement('style');
      style.id = 'demo-system-web-ipad-static-eyes';
      style.textContent = '.hero-dog-eye{display:none!important}';
      doc.head.appendChild(style);
    }
  };

  const apply = () => {
    try {
      const doc = frame.contentDocument;
      if (!doc?.documentElement) return;
      const lang = langOf(doc);
      const seo = buildProfileSeo(lang) || buildLegacySeo(lang);
      applyIpadEyes(doc);
      if (!seo) return;

      applyMeta(doc, seo);
      applyMeta(document, seo, `${modeLabel} Demo`);
      document.documentElement.lang = lang;

      const cfg = doc.defaultView?.SITE_CONFIG;
      if (cfg?.business) {
        const customerName = window.DEMO_CUSTOMER?.name || LEGACY[slug]?.name;
        if (customerName) cfg.business.name = customerName;
        cfg.business.title = seo.title;
        cfg.business.description = seo.description;
      }
    } catch (_) {}
  };

  const bind = () => {
    apply();
    // Reapply after customer-specific load/language handlers finish so legacy
    // customizers cannot leave generic Grüm metadata behind.
    try {
      const win = frame.contentWindow;
      const refresh = () => {
        win?.setTimeout(apply, 0);
        win?.setTimeout(apply, 60);
      };
      refresh();
      const doc = frame.contentDocument;
      if (doc?.documentElement && !doc.documentElement.dataset.demoSystemBound) {
        doc.documentElement.dataset.demoSystemBound = '1';
        new win.MutationObserver(refresh)
          .observe(doc.documentElement, { attributes:true, attributeFilter:['lang'] });
      }
    } catch (_) {}
  };

  frame.addEventListener('load', bind);
  try {
    if (frame.contentDocument?.readyState === 'complete' || frame.contentDocument?.readyState === 'interactive') bind();
  } catch (_) {}

  window.DEMO_SYSTEM = { slug, mode, apply };
})();
