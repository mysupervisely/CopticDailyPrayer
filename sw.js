const CACHE='coptic-daily-prayer-v1';
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.add('/'))));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{if(event.request.method==='GET')event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));});
self.addEventListener('push',event=>{let data={title:'Coptic Daily Prayer',body:'It is time for prayer.',url:'/'};try{data={...data,...event.data.json()};}catch(_){if(event.data)data.body=event.data.text();}event.waitUntil(self.registration.showNotification(data.title,{body:data.body,data:{url:data.url||'/'}}));});
self.addEventListener('notificationclick',event=>{event.notification.close();event.waitUntil(clients.openWindow(event.notification.data?.url||'/'));});
