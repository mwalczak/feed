/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "infinite-scroll.pkgd.min.js",
    "revision": "b1552a6a432061f507aa8f295fb2f3c0"
  },
  {
    "url": "lib.js",
    "revision": "cd275eef931f83ea0e31beab6bbe8d49"
  },
  {
    "url": "style.css",
    "revision": "9323844d69c8cf9d1feaa4134591a161"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/(\/.*|\/products.*|\/product\/.+)$/, workbox.strategies.staleWhileRevalidate({ "cacheName":"pages", plugins: [] }), 'GET');
workbox.routing.registerRoute(/\.(?:png|gif|jpg|jpeg|svg).*$/, workbox.strategies.cacheFirst({ "cacheName":"images", plugins: [new workbox.expiration.Plugin({"maxEntries":100,"maxAgeSeconds":2592000,"purgeOnQuotaError":false})] }), 'GET');
workbox.routing.registerRoute(/.+\.(?:png|gif|jpg|jpeg|svg).*$/, workbox.strategies.cacheFirst({ "cacheName":"remote-images", plugins: [new workbox.cacheableResponse.Plugin({"statuses":[0,200]}), new workbox.expiration.Plugin({"maxEntries":100,"maxAgeSeconds":2592000,"purgeOnQuotaError":false})] }), 'GET');
workbox.routing.registerRoute(/.+\.(?:js|css|woff2|webmanifest)$/, workbox.strategies.staleWhileRevalidate({ "cacheName":"static-resources", plugins: [] }), 'GET');
