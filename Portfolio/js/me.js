
// Service worker FLÔDÔ UNIVERS
// Met en cache la coquille de l'application pour
un accès rapide et
// un fonctionnement minimal hors-ligne une
fois le site hébergé en ligne.
const CACHE_NAME = 'flodo-univers-v1';
const APP_SHELL = [
'./',
'./index.html',
'./manifest.json',
'./icons/icon.svg'
];
self.addEventListener('install', (event) => {
event.waitUntil(
caches.open(CACHE_NAME)
.then((cache) => cache.addAll(APP_SHELL))
.catch(() => {})

);
self.skipWaiting();
});
self.addEventListener('activate', (event) => {
event.waitUntil(
caches.keys().then((keys) =>
Promise.all(keys.filter((k) => k !==
CACHE_NAME).map((k) => caches.delete(k)))
)
);
self.clients.claim();
});
self.addEventListener('fetch', (event) => {
if (event.request.method !== 'GET') return;
event.respondWith(
caches.match(event.request).then((cached) => {
if (cached) return cached;
return fetch(event.request).catch(() => cached);

})
);
});
