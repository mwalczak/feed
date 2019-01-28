importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

// Note: Ignore the error that Glitch raises about workbox being undefined.
workbox.skipWaiting();
workbox.clientsClaim();

workbox.routing.registerRoute(
    /(\/|\/\?utm_source=a2hs|\/products.*)$/,
    workbox.strategies.staleWhileRevalidate()
);

const FALLBACK_PRODUCT_URL = '/product/0';

workbox.routing.registerRoute(
    /\/product\/.+$/,
    async ({event}) => {
        try {
            return await workbox.strategies.cacheFirst().handle({event});
        } catch (error) {
            console.log("Fallback route: "+FALLBACK_PRODUCT_URL);
            const cacheName = workbox.core.cacheNames.runtime;
            return caches.match(FALLBACK_PRODUCT_URL);
        }
    }
);

workbox.routing.registerRoute(
    /.+\.(?:js|css|woff2|webmanifest)$/,
    workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg).*$/,
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
    /.+\.(?:png|gif|jpg|jpeg|svg).*$/,
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

self.addEventListener('install', (event) => {
    console.log('WS Installed - warm up');
    const urls = ['/product/0'];
    const cacheName = workbox.core.cacheNames.runtime;
    event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(urls)));
});

workbox.precaching.precacheAndRoute([]);