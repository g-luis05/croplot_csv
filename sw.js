const CACHE_NAME = "croplot-csv-v1";

const urlsToCache = [
    "./",
    "./index.html",
    "./styles.css",
    "./script.js",
    "./manifest.json",
    "./assets/icon-logo-off.png"
];

// LETS INSTALL THE SERVICEE WORKER AND THEN SAVE THE CACHE
self.addEventListener('install', event =>  {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});


// ANSWER WITH CACHED FILES IF THEY'RE AVAILABLE
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

//ACTIVATE SERVICE WORKER AND CLEAN OLD CACHE

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            )
        }).then(() => self.clients.claim())
    )
})