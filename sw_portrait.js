const CACHE = 'manie-v3-portrait';
const FILES = [
  './ManieMalan_PWA_V3_Portrait.html',
  './icon-512.png',
  './manifest_portrait.json'
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
