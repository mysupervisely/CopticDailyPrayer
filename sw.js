const CACHE='coptic-daily-prayer-v2';

self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache=>cache.add('/')).catch(()=>undefined));
});

self.addEventListener('activate',event=>{
  event.waitUntil(Promise.all([
    caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))),
    self.clients.claim()
  ]));
});

self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;

  const url=new URL(request.url);
  if(url.origin!==self.location.origin)return;

  const freshAsset=request.mode==='navigate'||['document','script','style'].includes(request.destination);
  if(freshAsset){
    event.respondWith(
      fetch(request).catch(()=>caches.match(request).then(cached=>cached||caches.match('/')))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached=>cached||fetch(request).then(response=>{
      if(response.ok){
        const copy=response.clone();
        caches.open(CACHE).then(cache=>cache.put(request,copy));
      }
      return response;
    }))
  );
});

self.addEventListener('push',event=>{let data={title:'Coptic Daily Prayer',body:'It is time for prayer.',url:'/'};try{data={...data,...event.data.json()};}catch(_){if(event.data)data.body=event.data.text();}event.waitUntil(self.registration.showNotification(data.title,{body:data.body,data:{url:data.url||'/'}}));});
self.addEventListener('notificationclick',event=>{event.notification.close();event.waitUntil(clients.openWindow(event.notification.data?.url||'/'));});
