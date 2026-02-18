const CACHE = 'manie-v3-landscape';
const FILES = [
  './ManieMalan_PWA_VI_5.html',
  './icon-512.png',
  './manifest_landscape.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
