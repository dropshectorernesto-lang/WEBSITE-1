(()=>{
  const booking=document.getElementById('bookingModal');
  const video=document.getElementById('videoModal');
  const serviceSelect=document.getElementById('serviceSelect');
  const main=document.querySelector('main');
  const header=document.querySelector('.site-header');
  const BASE_WIDTH=1024;
  const DESKTOP_MIN=851;

  const syncReferenceScale=()=>{
    const viewport=document.documentElement.clientWidth;
    if(viewport>=DESKTOP_MIN){
      const scale=viewport/BASE_WIDTH;
      document.body.classList.add('reference-scale');
      if(main){
        main.style.width=BASE_WIDTH+'px';
        main.style.zoom=String(scale);
      }
      if(header){
        header.style.width=BASE_WIDTH+'px';
        header.style.left='0';
        header.style.transform='none';
        header.style.zoom=String(scale);
      }
    }else{
      document.body.classList.remove('reference-scale');
      if(main){main.style.width='';main.style.zoom=''}
      if(header){header.style.width='';header.style.left='';header.style.transform='';header.style.zoom=''}
    }
  };

  syncReferenceScale();
  addEventListener('resize',syncReferenceScale,{passive:true});

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
      if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}
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
