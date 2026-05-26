const CACHE_NAME = 'kool-cache-v1';
self.addEventListener('install', e => {
    self.skipWaiting();
    e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(['./','./index.html','./manifest.json','./icon.png'])));
});
self.addEventListener('activate', e => e.waitUntil(clients.claim()));
self.addEventListener('message', e => {
    if (e.data && e.data.type === 'SHOW_NOTIFICATION') {
        self.registration.showNotification(e.data.title, {
            body: e.data.body,
            icon: e.data.icon || '/icon.png',
            tag: e.data.tag || 'kool-notif',
            vibrate: [200,100,200]
        });
    }
});
self.addEventListener('notificationclick', e => {
    e.notification.close();
    e.waitUntil(clients.openWindow('/'));
});
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
