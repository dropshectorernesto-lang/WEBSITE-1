(() => {
  const frame = document.getElementById('customer-demo');
  const c = window.DEMO_CUSTOMER;
  if (!frame || !c || !/facebook\.com/i.test(c.social || '')) return;

  const locationText = [c.addressLine1,c.addressLine2].filter(Boolean).join(', ');
  c.copy = Object.assign({}, c.copy || {}, {
    en:{hours:'CURRENT HOURS<br>CHECK FACEBOOK',aboutHero:`${c.name} offers pet grooming services.`,story1:locationText?`Public business information places ${c.name} at ${locationText}.`:`Find current work, updates and contact information on the linked Facebook profile.`,story2:'For current services, prices, opening hours and appointment availability, contact the business directly through Facebook.',values:[['PET GROOMING','Grooming services and appointment information are available directly from the business.'],['FACEBOOK','Use the linked Facebook profile for current work, updates and contact details.'],['DIRECT CONTACT','Contact the business directly for current pricing and appointment availability.'],['CURRENT DETAILS','Unverified hours, ratings and reviews are intentionally not shown.']],reviews:[]},
    de:{hours:'AKTUELLE ÖFFNUNGSZEITEN<br>FACEBOOK PRÜFEN',aboutHero:`${c.name} bietet Tierpflege an.`,story1:locationText?`Öffentliche Geschäftsinformationen führen ${c.name} unter ${locationText}.`:`Aktuelle Arbeiten, Neuigkeiten und Kontaktdaten findest du im verlinkten Facebook-Profil.`,story2:'Aktuelle Leistungen, Preise, Öffnungszeiten und Terminverfügbarkeit bitte direkt über Facebook beim Betrieb erfragen.',values:[['TIERPFLEGE','Informationen zu Pflegeleistungen und Terminen gibt es direkt beim Betrieb.'],['FACEBOOK','Das verlinkte Facebook-Profil zeigt aktuelle Arbeiten, Neuigkeiten und Kontaktdaten.'],['DIREKTER KONTAKT','Aktuelle Preise und Terminverfügbarkeit bitte direkt beim Betrieb erfragen.'],['AKTUELLE ANGABEN','Nicht verifizierte Öffnungszeiten, Bewertungen und Rezensionen werden bewusst nicht angezeigt.']],reviews:[]},
    es:{hours:'HORARIO ACTUAL<br>CONSULTAR FACEBOOK',aboutHero:`${c.name} ofrece servicios de peluquería para mascotas.`,story1:locationText?`La información pública del negocio sitúa a ${c.name} en ${locationText}.`:`Consulta trabajos recientes, novedades y datos de contacto en el perfil de Facebook enlazado.`,story2:'Para servicios, precios, horarios y disponibilidad de citas actuales, contacta directamente con el negocio a través de Facebook.',values:[['PELUQUERÍA','La información sobre servicios y citas está disponible directamente a través del negocio.'],['FACEBOOK','Usa el perfil de Facebook enlazado para ver trabajos recientes, novedades y contacto.'],['CONTACTO DIRECTO','Consulta directamente con el negocio los precios y la disponibilidad actuales.'],['DATOS ACTUALES','Los horarios, valoraciones y reseñas no verificadas no se muestran.']],reviews:[]},
    ca:{hours:'HORARI ACTUAL<br>CONSULTA FACEBOOK',aboutHero:`${c.name} ofereix serveis de perruqueria per a mascotes.`,story1:locationText?`La informació pública del negoci situa ${c.name} a ${locationText}.`:`Consulta treballs recents, novetats i dades de contacte al perfil de Facebook enllaçat.`,story2:'Per a serveis, preus, horaris i disponibilitat de cites actuals, contacta directament amb el negoci a través de Facebook.',values:[['PERRUQUERIA','La informació sobre serveis i cites està disponible directament a través del negoci.'],['FACEBOOK','Fes servir el perfil de Facebook enllaçat per veure treballs recents, novetats i contacte.'],['CONTACTE DIRECTE','Consulta directament amb el negoci els preus i la disponibilitat actuals.'],['DADES ACTUALS','Els horaris, valoracions i ressenyes no verificats no es mostren.']],reviews:[]}
  });

  const labels = {
    en:{title:'ON FACEBOOK',link:'VIEW MORE ON FACEBOOK'},
    de:{title:'AUF FACEBOOK',link:'MEHR AUF FACEBOOK'},
    es:{title:'EN FACEBOOK',link:'VER MÁS EN FACEBOOK'},
    ca:{title:'A FACEBOOK',link:'VEURE MÉS A FACEBOOK'}
  };
  const langOf = (doc) => {
    const l = (doc.documentElement.lang || 'en').toLowerCase();
    return labels[l] ? l : 'en';
  };
  const apply = (doc) => {
    if (!doc?.documentElement) return;
    const label = labels[langOf(doc)];
    const cfg = doc.defaultView.SITE_CONFIG;
    if (cfg?.business && cfg.business.instagramUrl === c.social) cfg.business.instagramUrl = '';
    const title = doc.querySelector('.gallery-title h2');
    if (title) title.textContent = label.title;
    const link = doc.querySelector('.gallery-more');
    if (link) {
      link.href = c.social;
      link.style.removeProperty('display');
      link.setAttribute('aria-label', `Open ${c.name} on Facebook`);
      if (link.firstChild) link.firstChild.textContent = `${label.link} `;
    }
  };
  frame.addEventListener('load', () => {
    try {
      const doc = frame.contentDocument;
      apply(doc);
      if (doc?.documentElement && !doc.documentElement.dataset.facebookProfileBound) {
        doc.documentElement.dataset.facebookProfileBound = '1';
        new doc.defaultView.MutationObserver(() => doc.defaultView.setTimeout(() => apply(doc), 0)).observe(doc.documentElement,{attributes:true,attributeFilter:['lang']});
      }
    } catch (_) {}
  });
})();
