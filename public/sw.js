importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

// Note: Ignore the error that Glitch raises about workbox being undefined.
workbox.skipWaiting();
workbox.clientsClaim();

// Use a stale-while-revalidate strategy for all other requests.
workbox.routing.setDefaultHandler(
    workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
    new RegExp('(\\/|\\/\\?utm_source=a2hs|\\/products.*|\\/product.*|\\/cart|\\/registration|\\/delivery|\\/payment|\\/checkout)$'),
    async ({event}) => {
        return await workbox.strategies.networkFirst().handle({event})
            .then((response) => {
                return response || caches.match('/fallback');
            })
            .catch((error) => caches.match('/fallback'));
    }
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
            console.log("test fallback");
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
    "url": "cart.js",
    "revision": "c0fd2cdff043cb0a0cd56998f11f7f7c"
  },
  {
    "url": "lib.js",
    "revision": "77136f393819aa6e7e2b4d5b1d3a502b"
  },
  {
    "url": "style.css",
    "revision": "339f29e4bc25a3b50d8e6b126e226962"
  }
]);