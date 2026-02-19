// ============================================================
// SERVICE WORKER - Manie Malan PWA
// ============================================================
// HOW TO UPDATE: Simply change APP_VERSION below, update the
// HTML filename in FILES array to match, then push to GitHub.
// The old cache will be automatically deleted on activation.
// ============================================================

const APP_VERSION = 'v8_1b';
const CACHE_NAME = 'manie-' + APP_VERSION;

const FILES = [
  './ManieMalan_PWA_VI_8_1.html',
  './icon-512.png',
  './manifest_landscape.json'
];

// Install: cache all files, skip waiting so new SW activates immediately
self.addEventListener('install', e => {
  console.log('[SW] Installing ' + CACHE_NAME);
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES))
      .then(() => self.skipWaiting())
  );
});

// Activate: delete ALL old caches, then claim clients immediately
self.addEventListener('activate', e => {
  console.log('[SW] Activating ' + CACHE_NAME);
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('[SW] Deleting old cache: ' + key);
            return caches.delete(key);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: serve from cache first, fall back to network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
