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

  const replaceBrand = (doc) => {
    if (!doc.body) return;
    const walker = doc.createTreeWalker(doc.body, doc.defaultView.NodeFilter.SHOW_TEXT);
    const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node=>{
      const p=node.parentElement;
      if(!p || ['SCRIPT','STYLE','NOSCRIPT'].includes(p.tagName)) return;
      if(!c.email && p.closest('.contact-info-grid .value-card:nth-child(2)')) return;
      const next=brandReplace(node.nodeValue);
      if(next!==node.nodeValue) node.nodeValue=next;
    });
    doc.querySelectorAll('[aria-label],[title],[alt]').forEach(el=>['aria-label','title','alt'].forEach(a=>{
      if(el.hasAttribute(a)) el.setAttribute(a,brandReplace(el.getAttribute(a)));
    }));
    doc.title=brandReplace(doc.title||'');
    const meta=doc.querySelector('meta[name="description"]'); if(meta) meta.content=brandReplace(meta.content);
    const brand=doc.querySelector('.brand'); if(brand){brand.textContent=c.name;brand.setAttribute('aria-label',`${c.name} home`);}
    const cfg=doc.defaultView.SITE_CONFIG;
    if(cfg?.business){
      cfg.business.name=c.name;
      cfg.business.title=`${c.name} — Dog Grooming`;
      cfg.business.description=`${c.name} dog grooming in Barcelona.`;
      if(c.social) cfg.business.instagramUrl=c.social;
    }
    if(c.social){const g=doc.querySelector('.gallery-more');if(g)g.href=c.social;}
  };

  const customize = (doc) => {
    if(!doc?.documentElement) return;
    const lang=langOf(doc);
    const copy=c.copy[lang]||c.copy.en;
    replaceBrand(doc);

    const cards=[...doc.querySelectorAll('.contact-info-grid .value-card')];
    if(cards.length>=4){
      const phone=cards[0].querySelector('a,p');
      if(phone){if(phone.tagName==='A')phone.href=c.phoneHref;phone.textContent=c.phoneDisplay;}
      if(c.email){const email=cards[1].querySelector('a,p');if(email){if(email.tagName==='A')email.href=`mailto:${c.email}`;email.textContent=c.email;}}
      const address=cards[2].querySelector('p'); if(address) address.innerHTML=`${c.addressLine1}<br>${c.addressLine2}`;
      const hours=cards[3].querySelector('p'); if(hours) hours.innerHTML=copy.hours;
    }

    const mapLink=doc.querySelector('.about-map-link');
    if(mapLink){
      mapLink.href=c.mapsUrl;
      mapLink.setAttribute('aria-label',`Open ${c.name} on Google Maps`);
      const map=mapLink.querySelector('iframe');
      if(map){map.src=c.mapEmbed;map.title=`${c.name} location on Google Maps`;}
    }

    const hero=doc.querySelector('.page-hero-copy');
    if(hero){const intro=[...hero.children].find(el=>el.tagName==='P'&&!el.classList.contains('kicker'));if(intro)intro.textContent=copy.aboutHero;}
    const story=[...doc.querySelectorAll('.story-split .content-lede')];
    if(story[0])story[0].textContent=copy.story1;
    if(story[1])story[1].textContent=copy.story2;
    [...doc.querySelectorAll('.value-grid .value-card')].slice(0,4).forEach((card,i)=>{
      const pair=copy.values[i]; if(!pair)return;
      const h=card.querySelector('h3'),p=card.querySelector('p');
      if(h)h.textContent=pair[0]; if(p)p.textContent=pair[1];
    });

    const section=doc.querySelector('.reviews-section');
    if(section){
      const kicker=section.querySelector(':scope > .section-width > .kicker');
      const rating=lang==='en'?c.rating:c.rating.replace('.',',');
      if(kicker) kicker.textContent=`${labels[lang].reviews} · ${rating}/5 · ${c.reviewCount} ${lang==='de'?'BEWERTUNGEN':lang==='es'?'RESEÑAS':lang==='ca'?'RESSENYES':'REVIEWS'}`;
      const reviews=copy.reviews;
      [...section.querySelectorAll('.review-card')].forEach((card,i)=>{
        const r=reviews[i%reviews.length];
        const p=card.querySelector('p'),s=card.querySelector('strong'),label=card.querySelector('span');
        if(p)p.textContent=r[1]; if(s)s.textContent=r[0]; if(label)label.textContent=labels[lang].review;
      });
    }
    replaceBrand(doc);
  };

  frame.addEventListener('load',()=>{
    try{
      const doc=frame.contentDocument;
      customize(doc);
      if(doc?.documentElement&&!doc.documentElement.dataset.customerProfileBound){
        doc.documentElement.dataset.customerProfileBound='1';
        new doc.defaultView.MutationObserver(()=>doc.defaultView.setTimeout(()=>customize(doc),0))
          .observe(doc.documentElement,{attributes:true,attributeFilter:['lang']});
      }
      frame.style.visibility='visible';
    }catch(_){frame.style.visibility='visible';}
  });
})();
