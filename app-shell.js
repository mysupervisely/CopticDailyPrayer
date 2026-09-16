const screens=[...document.querySelectorAll('.screen')];
const nav=[...document.querySelectorAll('.navItem')];
let suggestedPrayerKey='first';
let legacyReady=false;
let prayerHour='first';

function openScreen(name){
  screens.forEach(s=>s.classList.toggle('active',s.dataset.screen===name));
  nav.forEach(b=>b.classList.toggle('active',b.dataset.target===name));
  window.scrollTo({top:0,behavior:'instant'});
  history.replaceState(null,'','#'+name);
  if(name==='prayer') openPrayerShell();
}
nav.forEach(b=>b.addEventListener('click',()=>openScreen(b.dataset.target)));
document.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>openScreen(b.dataset.open)));

function localDateKey(d=new Date()){const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),day=String(d.getDate()).padStart(2,'0');return `${y}-${m}-${day}`}
function setSuggestedPrayer(){
  const h=new Date().getHours();let title='First Hour',meta='Agpeya · Morning prayer';suggestedPrayerKey='first';
  if(h>=9&&h<12){title='Third Hour';meta='Agpeya · Third Hour';suggestedPrayerKey='third'}
  else if(h>=12&&h<15){title='Sixth Hour';meta='Agpeya · Sixth Hour';suggestedPrayerKey='sixth'}
  else if(h>=15&&h<17){title='Ninth Hour';meta='Agpeya · Ninth Hour';suggestedPrayerKey='ninth'}
  else if(h>=17&&h<21){title='Eleventh Hour';meta='Agpeya · Evening prayer';suggestedPrayerKey='eleventh'}
  else if(h>=21||h<5){title='Compline';meta='Agpeya · Prayer before sleep';suggestedPrayerKey='compline'}
  document.getElementById('suggestedHour').textContent=title;document.getElementById('suggestedMeta').textContent=meta;
}
function readingEntries(value){if(!value)return[];if(Array.isArray(value))return value;return typeof value==='object'?[value]:[]}
function flattenReading(reading){const verses=[];for(const chapter of reading?.chapters||[])for(const verse of chapter?.verses||[])if(verse?.text)verses.push(String(verse.text).trim());return verses.join(' ')}
function firstReading(data,names){for(const name of names){for(const r of readingEntries(data?.[name])){const text=flattenReading(r);if(text)return {text,ref:r.bookName||name}}}return null}
async function loadChurchDay(){
  const label=document.getElementById('churchDay'),greg=document.getElementById('gregorianDay'),excerpt=document.getElementById('wordExcerpt'),ref=document.getElementById('wordRef');
  greg.textContent=new Intl.DateTimeFormat(undefined,{weekday:'long',month:'long',day:'numeric',year:'numeric'}).format(new Date());
  try{
    const key=localDateKey();const [calendarResponse,readingsResponse]=await Promise.all([fetch('/api/church?path='+encodeURIComponent('/calendar/'+key)).then(r=>r.json()),fetch('/api/church?path='+encodeURIComponent('/readings/'+key+'?detailed=true')).then(r=>r.json())]);
    const c=calendarResponse.data||calendarResponse;const coptic=c.copticDate||c.coptic_date||c.date;const season=c.season||c.seasonName;const feast=c.feast||c.celebration;const parts=[coptic,season,feast].filter(v=>typeof v==='string'&&v.trim());if(parts.length)label.textContent=parts.join(' · ');
    const raw=readingsResponse.data||readingsResponse;const selected=firstReading(raw,['MGospel','VGospel','LGospel','EPGospel','Gospel']);if(selected){const clean=selected.text.replace(/\s+/g,' ').trim();excerpt.textContent='“'+(clean.length>220?clean.slice(0,217).replace(/\s+\S*$/,'')+'…':clean)+'”';ref.textContent=selected.ref}
  }catch(e){excerpt.textContent='Today’s sourced reading is available in Readings.';ref.textContent=''}
}

function legacyWindow(){return document.getElementById('legacyPrayerEngine')?.contentWindow||null}
function legacyDoc(){try{return legacyWindow()?.document||null}catch(e){return null}}
function createLegacyEngine(){
  const frame=document.createElement('iframe');frame.id='legacyPrayerEngine';frame.className='legacyEngine';frame.src='/?shell-engine=1';frame.tabIndex=-1;frame.setAttribute('aria-hidden','true');
  frame.addEventListener('load',()=>{legacyReady=true;if(location.hash==='#prayer')openPrayerShell()});document.body.appendChild(frame);
}
function prayerMarkup(){return `<header class="prayerHeader"><button class="prayerBack" type="button" aria-label="Back home">‹ Home</button><button class="prayerTools" type="button">Aa ···</button><div class="eyebrow" id="shellPrayerHour">AGPEYA</div><h1 id="shellPrayerTitle">Prayer</h1><div class="prayerStep" id="shellPrayerStep">Preparing prayer…</div><div class="progress"><i id="shellPrayerBar"></i></div></header><article class="prayerReading" id="shellPrayerReading"><h2 id="shellSectionTitle"></h2><div class="prayerText" id="shellPrayerText">Connecting to the existing Agpeya…</div></article><section class="kyrieShell hide" id="shellKyrie"><div class="eyebrow">Kyrie Eleison</div><h2>Lord, have mercy.</h2><div class="kyrieCount"><span id="shellKyrieCount">0</span><small>/ 41</small></div><button id="shellMercy" class="mercyButton">LORD, HAVE MERCY</button><div id="shellKyrieRemain" class="kyrieRemain">41 remaining</div><button id="shellKyrieReset" class="resetLink">Reset</button></section><section class="fatherMoment hide" id="shellFather"><div class="eyebrow">Church Father</div><blockquote id="shellFatherQuote"></blockquote><strong id="shellFatherName"></strong><cite id="shellFatherWork"></cite></section><div class="prayerControls"><button id="shellPrev">Previous</button><button class="selah" id="shellSelah">Selah</button><button id="shellNext">Next</button></div><div class="prayerSheet hide" id="shellPrayerSheet"><button class="sheetClose" id="shellSheetClose">Done</button><h2>Prayer</h2><label>Text Size</label><div class="sizeRow"><button data-size="20">A−</button><button data-size="23">A</button><button data-size="27">A+</button></div><label>Choose Hour</label><div class="hourList">${[['first','First Hour'],['third','Third Hour'],['sixth','Sixth Hour'],['ninth','Ninth Hour'],['eleventh','Eleventh Hour'],['compline','Compline'],['midnight','Midnight Prayer']].map(([k,t])=>`<button data-hour="${k}">${t}<span>›</span></button>`).join('')}</div></div><div class="selahShell hide" id="shellSelahOverlay"><div class="selahWord">Selah</div><button id="shellContinue">Continue in Prayer</button></div>`}
function initPrayerShell(){
  const stage=document.querySelector('[data-screen="prayer"] .prayerStage');if(!stage||stage.dataset.ready)return;stage.dataset.ready='1';stage.innerHTML=prayerMarkup();
  document.querySelector('.prayerBack').onclick=()=>openScreen('home');
  document.querySelector('.prayerTools').onclick=()=>document.getElementById('shellPrayerSheet').classList.remove('hide');
  document.getElementById('shellSheetClose').onclick=()=>document.getElementById('shellPrayerSheet').classList.add('hide');
  document.getElementById('shellPrev').onclick=()=>engineAction('prev');document.getElementById('shellNext').onclick=()=>engineAction('next');
  document.getElementById('shellMercy').onclick=()=>engineAction('mercy');
  document.getElementById('shellKyrieReset').onclick=resetKyrie;
  document.getElementById('shellSelah').onclick=()=>document.getElementById('shellSelahOverlay').classList.remove('hide');
  document.getElementById('shellContinue').onclick=()=>document.getElementById('shellSelahOverlay').classList.add('hide');
  document.querySelectorAll('[data-hour]').forEach(b=>b.onclick=()=>{prayerHour=b.dataset.hour;selectPrayerHour(prayerHour);document.getElementById('shellPrayerSheet').classList.add('hide')});
  document.querySelectorAll('[data-size]').forEach(b=>b.onclick=()=>{document.getElementById('shellPrayerText').style.fontSize=b.dataset.size+'px';localStorage.setItem('copticDailyPrayer_shellTextSize',b.dataset.size)});
  const size=localStorage.getItem('copticDailyPrayer_shellTextSize');if(size)document.getElementById('shellPrayerText').style.fontSize=size+'px';
}
function openPrayerShell(){
  initPrayerShell();
  if(!legacyReady){document.getElementById('shellPrayerStep').textContent='Preparing the Agpeya…';return}
  const hasSaved=['first','third','sixth','ninth','eleventh','compline','midnight'].find(h=>Number(localStorage.getItem('agpeya_'+h+'_step')||0)>0);
  prayerHour=hasSaved||suggestedPrayerKey;selectPrayerHour(prayerHour);
}
function selectPrayerHour(hour){
  const w=legacyWindow();if(!w||typeof w.selectHour!=='function')return;try{w.selectHour(hour);setTimeout(syncPrayerFromEngine,30)}catch(e){document.getElementById('shellPrayerStep').textContent='Prayer engine is still loading…'}
}
function engineAction(action){const w=legacyWindow();if(!w||typeof w[action]!=='function')return;try{w[action]();setTimeout(syncPrayerFromEngine,20);window.scrollTo({top:0,behavior:'smooth'})}catch(e){}}
function resetKyrie(){
  const d=legacyDoc();if(!d)return;const step=(d.getElementById('stepLabel')?.textContent||'1').split(' ')[0];const index=Math.max(0,Number(step)-1);localStorage.setItem('agpeya_'+prayerHour+'_kyrie_'+index,'0');const w=legacyWindow();try{w.render();setTimeout(syncPrayerFromEngine,20)}catch(e){}
}
function syncPrayerFromEngine(){
  const d=legacyDoc();if(!d)return;
  const sectionTitle=d.getElementById('title')?.textContent||'';const text=d.getElementById('text')?.textContent||'';const step=d.getElementById('stepLabel')?.textContent||'';const pct=d.getElementById('pct')?.textContent||'';
  const titles={first:'First Hour',third:'Third Hour',sixth:'Sixth Hour',ninth:'Ninth Hour',eleventh:'Eleventh Hour',compline:'Compline',midnight:'Midnight Prayer'};
  document.getElementById('shellPrayerHour').textContent=titles[prayerHour]||'Agpeya';document.getElementById('shellPrayerTitle').textContent=sectionTitle||titles[prayerHour]||'Prayer';document.getElementById('shellPrayerStep').textContent=step?`Section ${step}`:'';document.getElementById('shellSectionTitle').textContent=sectionTitle;document.getElementById('shellPrayerText').textContent=text;document.getElementById('shellPrayerBar').style.width=pct||'0%';
  const kyrie=sectionTitle.includes('41');document.getElementById('shellKyrie').classList.toggle('hide',!kyrie);document.getElementById('shellPrayerReading').classList.toggle('hide',kyrie);
  if(kyrie){document.getElementById('shellKyrieCount').textContent=d.getElementById('count')?.textContent||'0';document.getElementById('shellKyrieRemain').textContent=d.getElementById('remain')?.textContent||'41 remaining'}
  const fatherTop=d.getElementById('fatherTop');const fatherVisible=fatherTop&&!fatherTop.classList.contains('hide');const father=document.getElementById('shellFather');father.classList.toggle('hide',!fatherVisible);
  if(fatherVisible){document.getElementById('shellFatherQuote').textContent=d.getElementById('fatherTopQuote')?.textContent||'';document.getElementById('shellFatherName').textContent=d.getElementById('fatherTopName')?.textContent||'';document.getElementById('shellFatherWork').textContent=d.getElementById('fatherTopWork')?.textContent||''}
  document.getElementById('shellPrev').disabled=step.startsWith('1 of ');
}

setSuggestedPrayer();loadChurchDay();initPrayerShell();createLegacyEngine();
const initial=location.hash.replace('#','');openScreen(['home','prayer','readings','calendar','more'].includes(initial)?initial:'home');