(()=>{
  const booking=document.getElementById('bookingModal');
  const video=document.getElementById('videoModal');
  const serviceSelect=document.getElementById('serviceSelect');
  const main=document.querySelector('main');
  const header=document.querySelector('.site-header');
  const BASE_WIDTH=1024;

  const syncReferenceScale=()=>{
    const viewport=document.documentElement.clientWidth;
    if(viewport>BASE_WIDTH){
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

  const openBooking=(service)=>{if(service && serviceSelect){[...serviceSelect.options].forEach((o,i)=>{if(o.textContent===service)serviceSelect.selectedIndex=i})}booking.showModal()};
  document.querySelectorAll('[data-book]').forEach(btn=>btn.addEventListener('click',()=>openBooking()));
  document.querySelectorAll('.service-card').forEach(card=>{
    const activate=()=>openBooking(card.dataset.service);
    card.addEventListener('click',activate);
    card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activate()}});
  });
  document.querySelector('[data-video]')?.addEventListener('click',()=>video.showModal());
  document.querySelector('[data-close-video]')?.addEventListener('click',()=>video.close());
  document.querySelector('[data-about]')?.addEventListener('click',()=>document.getElementById('experience')?.scrollIntoView({behavior:'smooth'}));
  [booking,video].forEach(dlg=>dlg.addEventListener('click',e=>{const r=dlg.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dlg.close()}));
  const form=document.getElementById('bookingForm');
  form?.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;booking.close();form.reset()});
})();
