// mobile nav
const burger = document.getElementById('burgerBtn');
if (burger) {
  burger.addEventListener('click', () => {
    const open = document.body.classList.toggle('nav-open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}
document.querySelectorAll('.mobile-panel a').forEach(a=>{
  a.addEventListener('click', ()=> document.body.classList.remove('nav-open'));
});

// desktop services dropdown (click-toggle, accessible; CSS handles hover as enhancement)
const ddWrap = document.getElementById('servicesDropdown');
const ddBtn = document.getElementById('dropdownBtn');
if (ddWrap && ddBtn) {
  ddBtn.addEventListener('click', (e)=>{
    e.stopPropagation();
    const open = ddWrap.classList.toggle('open');
    ddBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.addEventListener('click', (e)=>{
    if(!ddWrap.contains(e.target)){ ddWrap.classList.remove('open'); ddBtn.setAttribute('aria-expanded','false'); }
  });
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){ ddWrap.classList.remove('open'); ddBtn.setAttribute('aria-expanded','false'); }
  });
  ddWrap.querySelectorAll('.dropdown-item, .dropdown-foot a').forEach(a=>{
    a.addEventListener('click', ()=>{ ddWrap.classList.remove('open'); ddBtn.setAttribute('aria-expanded','false'); });
  });
}

// scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const heroVisual = document.getElementById('heroVisual');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, {threshold:0.12});
revealEls.forEach(el=>io.observe(el));
// safety net: if something never intersects, reveal anyway
setTimeout(()=>{
  revealEls.forEach(el=>el.classList.add('in-view'));
  if (heroVisual) heroVisual.classList.add('in-view');
}, 2500);

// hero visual reveals shortly after load regardless of scroll (it's above the fold)
if (heroVisual) {
  requestAnimationFrame(()=> setTimeout(()=> heroVisual.classList.add('in-view'), 150));
}
