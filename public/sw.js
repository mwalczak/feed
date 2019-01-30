importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

// Note: Ignore the error that Glitch raises about workbox being undefined.
workbox.skipWaiting();
workbox.clientsClaim();

// Use a stale-while-revalidate strategy for all other requests.
workbox.routing.setDefaultHandler(
    workbox.strategies.networkFirst()
);

workbox.routing.registerRoute(
    new RegExp('(\\/|\\/\\?utm_source=a2hs|\\/products.*)$'),
    workbox.strategies.networkFirst()
);

workbox.routing.registerRoute(
    new RegExp('.+\\.(?:js|css|woff2|webmanifest)$'),
    workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
    new RegExp('\\.(?:png|gif|jpg|jpeg|svg).*$'),
    workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60
            }),
        ],
    })
);

workbox.routing.registerRoute(
    new RegExp('.+\\.(?:png|gif|jpg|jpeg|svg).*$'),
    workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60
            }),
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            })
        ],
    })
);



// This "catch" handler is triggered when any of the other routes fail to
// generate a response.
workbox.routing.setCatchHandler(({event}) => {
    // Use event, request, and url to figure out how to respond.
    // One approach would be to use request.destination, see
    // https://medium.com/dev-channel/service-worker-caching-strategies-based-on-request-types-57411dd7652c
    switch (event.request.destination) {
        case 'document':
            return caches.match('/fallback');
            break;
        //
        // case 'image':
        //     return caches.match(FALLBACK_IMAGE_URL);
        //     break;
        //
        // case 'font':
        //     return caches.match(FALLBACK_FONT_URL);
        //     break;

        default:
            // If we don't have a fallback, just return an error response.
            return Response.error();
    }
});

self.addEventListener('install', (event) => {
    console.log('WS Installed - warm up');
    const urls = ['/fallback'];
    const cacheName = workbox.core.cacheNames.runtime;
    event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(urls)));
});

workbox.precaching.precacheAndRoute([
  {
    "url": "lib.js",
    "revision": "cd275eef931f83ea0e31beab6bbe8d49"
  },
  {
    "url": "style.css",
    "revision": "f3848de17ab32bdea8ddf493ec83bf03"
  }
]);