const CACHE='coptic-daily-prayer-v6';
const CORE=['/app.html','/app-shell.css','/agpeya-local-source.js','/agpeya-data.js','/prayer-native.js','/readings-native.js','/calendar-native.js','/prayer-life-native.js','/home-native.js',];
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE).then(cache=>Promise.all(CORE.map(url=>fetch(url,{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error(url+' '+r.status);return cache.put(url,r.clone())}).catch(()=>null)))));});
self.addEventListener('activate',event=>event.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))),self.clients.claim()])));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);
 if(url.origin!==self.location.origin)return;
 if(event.request.mode==='navigate'||/\.(?:html|js|css)$/.test(url.pathname)){
  event.respondWith(fetch(event.request,{cache:'no-store'}).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));}return r}).catch(()=>caches.match(event.request).then(r=>r||caches.match(url.pathname))));
  return;
 }
 event.respondWith(fetch(event.request).catch(()=>caches.match(event.request)));
});
self.addEventListener('push',event=>{let data={title:'Coptic Prayer',body:'It is time for prayer.',url:'/app.html#prayer'};try{data={...data,...event.data.json()};}catch(_){if(event.data)data.body=event.data.text();}event.waitUntil(self.registration.showNotification(data.title,{body:data.body,data:{url:data.url||'/app.html#prayer'}}));});
self.addEventListener('notificationclick',event=>{event.notification.close();event.waitUntil(clients.openWindow((event.notification.data&&event.notification.data.url)||'/app.html#prayer'));});