(()=>{
  const labels={first:'First Hour',third:'Third Hour',sixth:'Sixth Hour',ninth:'Ninth Hour',eleventh:'Eleventh Hour',compline:'Compline',midnight:'Midnight Prayer'};
  function titleFor(section,index){
    const raw=String(section?.title||`Prayer ${index+1}`).trim();
    return raw.replace(/\s+/g,' ');
  }
  function ensureJumpUI(){
    const header=document.querySelector('.prayerHeader');
    if(!header||document.getElementById('shellJumpButton'))return;
    const tools=document.querySelector('.prayerTools');
    const jump=document.createElement('button');
    jump.id='shellJumpButton';jump.className='prayerJump';jump.type='button';jump.setAttribute('aria-label','Jump within this Hour');jump.textContent='☰';
    if(tools)header.insertBefore(jump,tools);else header.appendChild(jump);
    const sheet=document.createElement('div');sheet.id='shellJumpSheet';sheet.className='prayerSheet jumpSheet hide';
    sheet.innerHTML='<button class="sheetClose" id="shellJumpClose">Done</button><div class="eyebrow">Current Hour</div><h2 id="shellJumpTitle">Jump to Prayer</h2><p class="jumpHint">Jump directly to a prayer, Psalm, Gospel, litany, absolution, or other section in this Hour.</p><div class="jumpList" id="shellJumpList"></div>';
    document.body.appendChild(sheet);
    jump.onclick=()=>{renderJumpList();sheet.classList.remove('hide')};
    sheet.querySelector('#shellJumpClose').onclick=()=>sheet.classList.add('hide');
  }
  function renderJumpList(){
    const list=window.agpeya?.[window.prayerHour];
    const host=document.getElementById('shellJumpList');
    if(!host)return;
    document.getElementById('shellJumpTitle').textContent=(labels[window.prayerHour]||'Agpeya')+' Prayers';
    if(!Array.isArray(list)){host.innerHTML='<p class="jumpHint">Prayer sections are still loading.</p>';return}
    host.innerHTML=list.map((s,i)=>`<button type="button" data-jump-step="${i}" class="${i===window.prayerStep?'current':''}"><span class="jumpNumber">${i+1}</span><span class="jumpName">${titleFor(s,i)}</span><span class="jumpChevron">›</span></button>`).join('');
    host.querySelectorAll('[data-jump-step]').forEach(b=>b.onclick=()=>{
      window.prayerStep=Number(b.dataset.jumpStep);
      localStorage.setItem('agpeya_'+window.prayerHour+'_step',String(window.prayerStep));
      if(typeof window.renderPrayer==='function')window.renderPrayer();
      document.getElementById('shellJumpSheet').classList.add('hide');window.scrollTo({top:0,behavior:'smooth'});
    });
  }
  function exposeState(){
    try{
      Object.defineProperties(window,{agpeya:{get:()=>eval('agpeya'),configurable:true},prayerHour:{get:()=>eval('prayerHour'),set:v=>eval('prayerHour=v'),configurable:true},prayerStep:{get:()=>eval('prayerStep'),set:v=>eval('prayerStep=v'),configurable:true}});
    }catch(e){}
  }
  const boot=()=>{ensureJumpUI();exposeState()};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  const observer=new MutationObserver(()=>ensureJumpUI());observer.observe(document.body,{childList:true,subtree:true});
})();