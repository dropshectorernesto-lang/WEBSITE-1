(() => {
  const frame = document.getElementById('customer-demo');
  const c = window.DEMO_CUSTOMER;
  if (!frame || !c) return;

  const langOf = (doc) => {
    const l = (doc.documentElement.lang || 'en').toLowerCase();
    return ['en','de','es','ca'].includes(l) ? l : 'en';
  };
  const brandReplace = (v='') => String(v).replace(/GRÜM|Grüm|grüm|GRUM|Grum|grum/g,c.name);
  const labels = {
    en:{reviews:'GOOGLE REVIEWS',review:'Google review'},
    de:{reviews:'GOOGLE-BEWERTUNGEN',review:'Google-Bewertung'},
    es:{reviews:'RESEÑAS DE GOOGLE',review:'Reseña de Google'},
    ca:{reviews:'RESSENYES DE GOOGLE',review:'Ressenya de Google'}
  };
  const mode = document.body?.dataset.demoMode || 'mobile';
  const modeLabel = mode === 'web-ipad' ? 'WEB IPAD' : mode === 'web' ? 'Web/Desktop' : 'Mobile';
  const locationText = [c.addressLine1,c.addressLine2].filter(Boolean).join(', ');

  const fallbackSeo = (lang) => ({
    en:{title:`${c.name} | Pet Grooming`,description:`Pet grooming demo for ${c.name}, based only on verified public business information.`},
    de:{title:`${c.name} | Tierpflege`,description:`Tierpflege-Demo für ${c.name}, ausschließlich auf verifizierten öffentlichen Geschäftsinformationen basierend.`},
    es:{title:`${c.name} | Peluquería canina`,description:`Demo de peluquería canina para ${c.name}, basada únicamente en información pública verificada del negocio.`},
    ca:{title:`${c.name} | Perruqueria canina`,description:`Demo de perruqueria canina per a ${c.name}, basada només en informació pública verificada del negoci.`}
  }[lang] || null);

  const fallbackCopy = (lang) => {
    const byLang = {
      en:{
        hours:'CURRENT HOURS<br>CHECK INSTAGRAM',
        aboutHero:`${c.name} offers pet grooming services.`,
        story1:locationText?`Public business information places ${c.name} at ${locationText}.`:`Find current work, updates and contact information on the linked Instagram profile.`,
        story2:'For current services, prices, opening hours and appointment availability, contact the business directly through Instagram.',
        values:[['PET GROOMING','Grooming services and appointment information are available directly from the business.'],['INSTAGRAM','Use the linked Instagram profile for current work, updates and contact details.'],['DIRECT CONTACT','Contact the business directly for current pricing and appointment availability.'],['CURRENT DETAILS','Unverified hours, ratings and reviews are intentionally not shown.']],
        reviews:[]
      },
      de:{
        hours:'AKTUELLE ÖFFNUNGSZEITEN<br>INSTAGRAM PRÜFEN',
        aboutHero:`${c.name} bietet Tierpflege an.`,
        story1:locationText?`Öffentliche Geschäftsinformationen führen ${c.name} unter ${locationText}.`:`Aktuelle Arbeiten, Neuigkeiten und Kontaktdaten findest du im verlinkten Instagram-Profil.`,
        story2:'Aktuelle Leistungen, Preise, Öffnungszeiten und Terminverfügbarkeit bitte direkt über Instagram beim Betrieb erfragen.',
        values:[['TIERPFLEGE','Informationen zu Pflegeleistungen und Terminen gibt es direkt beim Betrieb.'],['INSTAGRAM','Das verlinkte Instagram-Profil zeigt aktuelle Arbeiten, Neuigkeiten und Kontaktdaten.'],['DIREKTER KONTAKT','Aktuelle Preise und Terminverfügbarkeit bitte direkt beim Betrieb erfragen.'],['AKTUELLE ANGABEN','Nicht verifizierte Öffnungszeiten, Bewertungen und Rezensionen werden bewusst nicht angezeigt.']],
        reviews:[]
      },
      es:{
        hours:'HORARIO ACTUAL<br>CONSULTAR INSTAGRAM',
        aboutHero:`${c.name} ofrece servicios de peluquería para mascotas.`,
        story1:locationText?`La información pública del negocio sitúa a ${c.name} en ${locationText}.`:`Consulta trabajos recientes, novedades y datos de contacto en el perfil de Instagram enlazado.`,
        story2:'Para servicios, precios, horarios y disponibilidad de citas actuales, contacta directamente con el negocio a través de Instagram.',
        values:[['PELUQUERÍA','La información sobre servicios y citas está disponible directamente a través del negocio.'],['INSTAGRAM','Usa el perfil de Instagram enlazado para ver trabajos recientes, novedades y contacto.'],['CONTACTO DIRECTO','Consulta directamente con el negocio los precios y la disponibilidad actuales.'],['DATOS ACTUALES','Los horarios, valoraciones y reseñas no verificadas no se muestran.']],
        reviews:[]
      },
      ca:{
        hours:'HORARI ACTUAL<br>CONSULTA INSTAGRAM',
        aboutHero:`${c.name} ofereix serveis de perruqueria per a mascotes.`,
        story1:locationText?`La informació pública del negoci situa ${c.name} a ${locationText}.`:`Consulta treballs recents, novetats i dades de contacte al perfil d'Instagram enllaçat.`,
        story2:'Per a serveis, preus, horaris i disponibilitat de cites actuals, contacta directament amb el negoci a través d’Instagram.',
        values:[['PERRUQUERIA','La informació sobre serveis i cites està disponible directament a través del negoci.'],['INSTAGRAM','Fes servir el perfil d’Instagram enllaçat per veure treballs recents, novetats i contacte.'],['CONTACTE DIRECTE','Consulta directament amb el negoci els preus i la disponibilitat actuals.'],['DADES ACTUALS','Els horaris, valoracions i ressenyes no verificats no es mostren.']],
        reviews:[]
      }
    };
    return byLang[lang] || byLang.en;
  };

  const ensureMeta = (doc, name) => {
    let meta = doc.querySelector(`meta[name="${name}"]`);
    if (!meta) { meta = doc.createElement('meta'); meta.name = name; doc.head?.appendChild(meta); }
    return meta;
  };

  const syncSeo = (doc) => {
    const lang = langOf(doc);
    const seo = c.seo?.[lang] || c.seo?.en || fallbackSeo(lang);
    if (!seo?.title || !seo?.description) return;
    doc.title = seo.title;
    const innerMeta = ensureMeta(doc, 'description'); if (innerMeta) innerMeta.content = seo.description;
    document.title = `${seo.title} — ${modeLabel} Demo`;
    const outerMeta = ensureMeta(document, 'description'); if (outerMeta) outerMeta.content = seo.description;
    const cfg = doc.defaultView.SITE_CONFIG;
    if (cfg?.business) { cfg.business.name = c.name; cfg.business.title = seo.title; cfg.business.description = seo.description; if (c.social) cfg.business.instagramUrl = c.social; }
  };

  const replaceBrand = (doc) => {
    if (!doc.body) return;
    const walker = doc.createTreeWalker(doc.body, doc.defaultView.NodeFilter.SHOW_TEXT);
    const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node=>{
      const p=node.parentElement;
      if(!p || ['SCRIPT','STYLE','NOSCRIPT'].includes(p.tagName)) return;
      if(!c.email && p.closest('.contact-info-grid .value-card:nth-child(2)')) return;
      const next=brandReplace(node.nodeValue); if(next!==node.nodeValue) node.nodeValue=next;
    });
    doc.querySelectorAll('[aria-label],[title],[alt]').forEach(el=>['aria-label','title','alt'].forEach(a=>{ if(el.hasAttribute(a)) el.setAttribute(a,brandReplace(el.getAttribute(a))); }));
    doc.title=brandReplace(doc.title||'');
    const meta=doc.querySelector('meta[name="description"]'); if(meta) meta.content=brandReplace(meta.content);
    const brand=doc.querySelector('.brand'); if(brand){brand.textContent=c.name;brand.setAttribute('aria-label',`${c.name} home`);}
    const cfg=doc.defaultView.SITE_CONFIG;
    if(cfg?.business){ cfg.business.name=c.name; cfg.business.title=`${c.name} — Pet Grooming`; cfg.business.description=c.seo?.en?.description || `${c.name} pet grooming.`; if(c.social) cfg.business.instagramUrl=c.social; }
    const g=doc.querySelector('.gallery-more');
    if(c.social){if(g){g.href=c.social;g.style.removeProperty('display');}} else if(g){g.style.setProperty('display','none','important');}
  };

  const customize = (doc) => {
    if(!doc?.documentElement) return;
    const lang=langOf(doc); const copy=c.copy?.[lang] || c.copy?.en || fallbackCopy(lang); replaceBrand(doc);
    const cards=[...doc.querySelectorAll('.contact-info-grid .value-card')];
    if(cards.length>=4){
      if(c.phoneDisplay){ const phone=cards[0].querySelector('a,p'); cards[0].style.removeProperty('display'); if(phone){if(phone.tagName==='A'&&c.phoneHref)phone.href=c.phoneHref;phone.textContent=c.phoneDisplay;} }
      else { cards[0].style.setProperty('display','none','important'); }
      if(c.email){ const email=cards[1].querySelector('a,p'); cards[1].style.removeProperty('display'); if(email){if(email.tagName==='A')email.href=`mailto:${c.email}`;email.textContent=c.email;} }
      else { cards[1].style.setProperty('display','none','important'); }
      if(c.addressLine1||c.addressLine2){ const address=cards[2].querySelector('p'); cards[2].style.removeProperty('display'); if(address) address.innerHTML=[c.addressLine1,c.addressLine2].filter(Boolean).join('<br>'); }
      else { cards[2].style.setProperty('display','none','important'); }
      const hours=cards[3].querySelector('p'); if(hours) hours.innerHTML=copy.hours;
    }
    const mapLink=doc.querySelector('.about-map-link');
    if(mapLink){
      if(c.mapsUrl&&c.mapEmbed){ mapLink.style.removeProperty('display'); mapLink.href=c.mapsUrl; mapLink.setAttribute('aria-label',`Open ${c.name} on Google Maps`); const map=mapLink.querySelector('iframe'); if(map){map.src=c.mapEmbed;map.title=`${c.name} location on Google Maps`;} }
      else { mapLink.style.setProperty('display','none','important'); }
    }
    const hero=doc.querySelector('.page-hero-copy'); if(hero){const intro=[...hero.children].find(el=>el.tagName==='P'&&!el.classList.contains('kicker'));if(intro)intro.textContent=copy.aboutHero;}
    const story=[...doc.querySelectorAll('.story-split .content-lede')]; if(story[0])story[0].textContent=copy.story1; if(story[1])story[1].textContent=copy.story2;
    [...doc.querySelectorAll('.value-grid .value-card')].slice(0,4).forEach((card,i)=>{ const pair=copy.values[i]; if(!pair)return; const h=card.querySelector('h3'),p=card.querySelector('p'); if(h)h.textContent=pair[0]; if(p)p.textContent=pair[1]; });
    const section=doc.querySelector('.reviews-section');
    if(section){
      const reviews=Array.isArray(copy.reviews)?copy.reviews.filter(r=>Array.isArray(r)&&r.length>=2):[];
      const hasReviewMeta=c.rating!==null&&c.rating!==undefined&&c.rating!==''&&c.reviewCount!==null&&c.reviewCount!==undefined&&c.reviewCount!=='';
      if(!hasReviewMeta||!reviews.length){ section.style.setProperty('display','none','important'); }
      else { section.style.removeProperty('display'); const kicker=section.querySelector(':scope > .section-width > .kicker'); const ratingText=String(c.rating); const rating=lang==='en'?ratingText:ratingText.replace('.',','); if(kicker) kicker.textContent=`${labels[lang].reviews} · ${rating}/5 · ${c.reviewCount} ${lang==='de'?'BEWERTUNGEN':lang==='es'?'RESEÑAS':lang==='ca'?'RESSENYES':'REVIEWS'}`; [...section.querySelectorAll('.review-card')].forEach((card,i)=>{ const r=reviews[i%reviews.length]; const p=card.querySelector('p'),s=card.querySelector('strong'),label=card.querySelector('span'); if(p)p.textContent=r[1]; if(s)s.textContent=r[0]; if(label)label.textContent=labels[lang].review; }); }
    }
    replaceBrand(doc); syncSeo(doc);
  };

  frame.addEventListener('load',()=>{
    try{ const doc=frame.contentDocument; customize(doc); if(doc?.documentElement&&!doc.documentElement.dataset.customerProfileBound){ doc.documentElement.dataset.customerProfileBound='1'; new doc.defaultView.MutationObserver(()=>doc.defaultView.setTimeout(()=>customize(doc),0)).observe(doc.documentElement,{attributes:true,attributeFilter:['lang']}); } frame.style.visibility='visible'; }
    catch(_){frame.style.visibility='visible';}
  });
})();
