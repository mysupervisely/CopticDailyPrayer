(()=>{
  const labels={first:'First Hour',third:'Third Hour',sixth:'Sixth Hour',ninth:'Ninth Hour',eleventh:'Eleventh Hour',compline:'Compline',midnight:'Midnight Prayer'};
  const style=document.createElement('style');style.textContent=`.prayerJump{position:absolute;right:58px;top:0;border:0;background:transparent;color:var(--wine);font-size:20px;font-weight:700;min-width:44px;min-height:44px}.jumpSheet{max-height:84vh}.jumpHint{color:var(--muted);font-size:12px;line-height:1.5;margin:-12px 0 16px}.jumpList{border:1px solid var(--line);border-radius:18px;overflow:hidden}.jumpList button{width:100%;min-height:58px;padding:8px 14px;border:0;border-bottom:1px solid var(--line);background:transparent;display:grid;grid-template-columns:28px 1fr 18px;gap:10px;align-items:center;text-align:left;color:var(--ink)}.jumpList button:last-child{border-bottom:0}.jumpList button.current{background:var(--soft);color:var(--wine)}.jumpNumber{font:600 12px Georgia,serif;color:var(--muted);text-align:center}.jumpName{font:600 15px/1.25 Georgia,serif}.jumpChevron{color:var(--muted);font-size:20px;text-align:right}`;document.head.appendChild(style);
  function titleFor(section,index){return String(section?.title||`Prayer ${index+1}`).trim().replace(/\s+/g,' ')}
  function state(){try{return{data:eval('agpeya'),hour:eval('prayerHour'),step:eval('prayerStep')}}catch(e){return{data:null,hour:'first',step:0}}}
  function setStep(n){try{eval('prayerStep='+Number(n));if(typeof renderPrayer==='function')renderPrayer()}catch(e){}}
  function ensureJumpUI(){
    const header=document.querySelector('.prayerHeader');if(!header||document.getElementById('shellJumpButton'))return;
    const jump=document.createElement('button');jump.id='shellJumpButton';jump.className='prayerJump';jump.type='button';jump.setAttribute('aria-label','Jump within this Hour');jump.textContent='☰';header.appendChild(jump);
    const sheet=document.createElement('div');sheet.id='shellJumpSheet';sheet.className='prayerSheet jumpSheet hide';sheet.innerHTML='<button class="sheetClose" id="shellJumpClose">Done</button><div class="eyebrow">Current Hour</div><h2 id="shellJumpTitle">Jump to Prayer</h2><p class="jumpHint">Choose a prayer, Psalm, Gospel, litany, absolution, or other section within this Hour.</p><div class="jumpList" id="shellJumpList"></div>';document.body.appendChild(sheet);
    jump.onclick=()=>{renderJumpList();sheet.classList.remove('hide')};sheet.querySelector('#shellJumpClose').onclick=()=>sheet.classList.add('hide');
  }
  function renderJumpList(){
    const s=state(),list=s.data?.[s.hour],host=document.getElementById('shellJumpList');if(!host)return;document.getElementById('shellJumpTitle').textContent=(labels[s.hour]||'Agpeya')+' Prayers';
    if(!Array.isArray(list)){host.innerHTML='<p class="jumpHint" style="padding:16px">Prayer sections are still loading.</p>';return}
    host.innerHTML=list.map((section,i)=>`<button type="button" data-jump-step="${i}" class="${i===s.step?'current':''}"><span class="jumpNumber">${i+1}</span><span class="jumpName">${titleFor(section,i)}</span><span class="jumpChevron">›</span></button>`).join('');
    host.querySelectorAll('[data-jump-step]').forEach(b=>b.onclick=()=>{const n=Number(b.dataset.jumpStep);localStorage.setItem('agpeya_'+s.hour+'_step',String(n));setStep(n);document.getElementById('shellJumpSheet').classList.add('hide');window.scrollTo({top:0,behavior:'smooth'})});
  }
  const boot=()=>ensureJumpUI();if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();new MutationObserver(ensureJumpUI).observe(document.body,{childList:true,subtree:true});
})();