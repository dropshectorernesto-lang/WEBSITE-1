(()=>{
  const config=window.SITE_CONFIG;
  if(!config){
    console.error('SITE_CONFIG is missing. Load site.config.js before script.js.');
    return;
  }

  const get=(path)=>path.split('.').reduce((value,key)=>value?.[key],config);

  // ---------------------------------------------
  // PAGE / SEO / THEME
  // ---------------------------------------------
  document.title=config.business?.title||document.title;
  const description=document.querySelector('meta[name="description"]');
  if(description&&config.business?.description)description.content=config.business.description;

  const themeMap={
    cream:'--cream',surface:'--surface',experience:'--experience',final:'--final',
    green:'--green',greenDark:'--green-dark',pink:'--pink',pinkSoft:'--pink-soft',
    ink:'--ink',orange:'--orange'
  };
  Object.entries(themeMap).forEach(([key,cssVar])=>{
    if(config.theme?.[key])document.documentElement.style.setProperty(cssVar,config.theme[key]);
  });

  // ---------------------------------------------
  // GENERIC CONTENT BINDINGS
  // ---------------------------------------------
  document.querySelectorAll('[data-bind]').forEach(el=>{
    const value=get(el.dataset.bind);
    if(value!==undefined&&value!==null)el.textContent=value;
  });
  document.querySelectorAll('[data-bind-html]').forEach(el=>{
    const value=get(el.dataset.bindHtml);
    if(value!==undefined&&value!==null)el.innerHTML=value;
  });
  document.querySelectorAll('[data-bind-src]').forEach(el=>{
    const value=get(el.dataset.bindSrc);
    if(value)el.src=value;
  });
  document.querySelectorAll('[data-bind-alt]').forEach(el=>{
    const value=get(el.dataset.bindAlt);
    if(value!==undefined)el.alt=value;
  });

  // ---------------------------------------------
  // NAVIGATION — edit array in site.config.js
  // ---------------------------------------------
  const nav=document.getElementById('main-nav');
  if(nav){
    nav.innerHTML=(config.navigation||[]).map((item,index)=>
      `<a class="${index===0?'active':''}" href="${item.target}">${item.label}</a>`
    ).join('');
  }

  // ---------------------------------------------
  // SERVICES — add/remove/reorder cards in config
  // ---------------------------------------------
  const cards=document.getElementById('service-cards');
  const serviceSelect=document.getElementById('serviceSelect');
  if(cards){
    cards.innerHTML=(config.services?.cards||[]).map((card,index)=>{
      const style=['green','black','orange'].includes(card.style)?card.style:'green';
      return `
        <article class="service-card card-${style}${card.featured?' featured':''}" data-service="${card.title.replace(/"/g,'&quot;')}" tabindex="0" role="button" aria-label="Book ${card.title.replace(/"/g,'&quot;')}">
          <div class="service-number">${card.number||String(index+1).padStart(2,'0')}</div>
          <img src="${card.image}" alt="${card.imageAlt||''}" loading="lazy" />
          <div class="service-info">
            <div><h3>${card.title}</h3><p>${card.descriptionHtml||''}</p></div>
            <span class="card-arrow" aria-hidden="true"></span>
          </div>
        </article>`;
    }).join('');
  }
  if(serviceSelect){
    serviceSelect.innerHTML=(config.services?.cards||[]).map(card=>`<option>${card.title}</option>`).join('');
  }

  // ---------------------------------------------
  // GALLERY — replace as many images as you want
  // ---------------------------------------------
  const grid=document.getElementById('ig-grid');
  if(grid){
    grid.innerHTML=(config.gallery?.images||[]).map(image=>
      `<img src="${image.src}" alt="${image.alt||''}" loading="lazy" />`
    ).join('');
  }
  const galleryLink=document.getElementById('gallery-link');
  if(galleryLink)galleryLink.href=config.business?.instagramUrl||'#';

  // ---------------------------------------------
  // DESKTOP REFERENCE SCALE
  // Keeps the approved 1024px composition proportional.
  // ---------------------------------------------
  const main=document.querySelector('main');
  const header=document.querySelector('.site-header');
  const BASE_WIDTH=1024;
  const DESKTOP_MIN=851;
  const syncReferenceScale=()=>{
    const viewport=document.documentElement.clientWidth;
    if(viewport>=DESKTOP_MIN){
      const scale=viewport/BASE_WIDTH;
      document.body.classList.add('reference-scale');
      if(main){main.style.width=BASE_WIDTH+'px';main.style.zoom=String(scale)}
      if(header){header.style.width=BASE_WIDTH+'px';header.style.left='0';header.style.transform='none';header.style.zoom=String(scale)}
    }else{
      document.body.classList.remove('reference-scale');
      if(main){main.style.width='';main.style.zoom=''}
      if(header){header.style.width='';header.style.left='';header.style.transform='';header.style.zoom=''}
    }
  };
  syncReferenceScale();
  addEventListener('resize',syncReferenceScale,{passive:true});

  // ---------------------------------------------
  // INTERACTIONS
  // ---------------------------------------------
  const booking=document.getElementById('bookingModal');
  const video=document.getElementById('videoModal');

  const openBooking=(service)=>{
    if(!booking)return;
    if(service&&serviceSelect){
      [...serviceSelect.options].forEach((option,index)=>{
        if(option.textContent===service)serviceSelect.selectedIndex=index;
      });
    }
    booking.showModal();
  };

  document.querySelectorAll('[data-book]').forEach(btn=>btn.addEventListener('click',()=>openBooking()));
  document.querySelectorAll('.service-card').forEach(card=>{
    const activate=()=>openBooking(card.dataset.service);
    card.addEventListener('click',activate);
    card.addEventListener('keydown',event=>{
      if(event.key==='Enter'||event.key===' '){event.preventDefault();activate()}
    });
  });

  document.querySelector('[data-video]')?.addEventListener('click',()=>video?.showModal());
  document.querySelector('[data-close-video]')?.addEventListener('click',()=>video?.close());
  document.querySelector('[data-about]')?.addEventListener('click',()=>document.getElementById('experience')?.scrollIntoView({behavior:'smooth'}));

  [booking,video].filter(Boolean).forEach(dialog=>dialog.addEventListener('click',event=>{
    const rect=dialog.getBoundingClientRect();
    if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();
  }));

  const form=document.getElementById('bookingForm');
  form?.addEventListener('submit',event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    booking?.close();
    form.reset();
  });
})();
