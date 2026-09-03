(()=>{
  const booking=document.getElementById('bookingModal');
  const video=document.getElementById('videoModal');
  const serviceSelect=document.getElementById('serviceSelect');
  const openBooking=(service)=>{if(service && serviceSelect){[...serviceSelect.options].forEach((o,i)=>{if(o.textContent===service)serviceSelect.selectedIndex=i})}booking.showModal()};
  document.querySelectorAll('[data-book]').forEach(btn=>btn.addEventListener('click',()=>openBooking()));
  document.querySelectorAll('.service-card').forEach(card=>{
    const activate=()=>openBooking(card.dataset.service);
    card.addEventListener('click',activate);
    card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activate()}});
  });
  document.querySelector('[data-video]')?.addEventListener('click',()=>video.showModal());
  document.querySelector('[data-close-video]')?.addEventListener('click',()=>video.close());
  document.querySelector('[data-about]')?.addEventListener('click',()=>document.getElementById('gallery').scrollIntoView({behavior:'smooth'}));
  [booking,video].forEach(dlg=>dlg.addEventListener('click',e=>{const r=dlg.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dlg.close()}));
  const form=document.getElementById('bookingForm');
  form?.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;booking.close();form.reset()});
})();
