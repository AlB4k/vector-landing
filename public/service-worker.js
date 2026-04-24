const CACHE_NAME = 'vector-v2.4.0';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo_icon.png',
  '/logo_site.png',
  '/logo_full.png',
  '/favicon.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
