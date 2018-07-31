/**
 * @description Variables
 */
const staticCacheName = 'mws-restautant-v1';
const files = [
    '/',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css'
];

/**
 * @description Event Install
 */
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(staticCacheName)
        .then(cache => cache.addAll(files))
    );
});

/**
 * @description Event Activate
 */
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.filter(cacheName => cacheName.startsWith('mws-') && cacheName != staticCacheName)
                    .map(cacheName => caches.delete(cacheName))
                );
            })
    );
});

/**
 * @description Event Fetch
 */
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});