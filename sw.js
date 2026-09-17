const CACHE='coptic-daily-prayer-v3';
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(Promise.resolve());});
self.addEventListener('activate',event=>event.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))),self.clients.claim()])));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin)return;
  if(event.request.mode==='navigate'||/\.(?:html|js|css)$/.test(url.pathname)){
    event.respondWith(fetch(event.request,{cache:'no-store'}).catch(()=>caches.match(event.request)));
    return;
  }
  event.respondWith(fetch(event.request).catch(()=>caches.match(event.request)));
});
self.addEventListener('push',event=>{let data={title:'Coptic Daily Prayer',body:'It is time for prayer.',url:'/'};try{data={...data,...event.data.json()};}catch(_){if(event.data)data.body=event.data.text();}event.waitUntil(self.registration.showNotification(data.title,{body:data.body,data:{url:data.url||'/'}}));});
self.addEventListener('notificationclick',event=>{event.notification.close();event.waitUntil(clients.openWindow((event.notification.data&&event.notification.data.url)||'/'));});
