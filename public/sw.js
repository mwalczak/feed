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
    "url": "fontawesome-free-5.6.3-web/css/all.css",
    "revision": "3d2a69e85c794b98344b798d13de058a"
  },
  {
    "url": "fontawesome-free-5.6.3-web/css/all.min.css",
    "revision": "dc93d584e41f8417f6b7163320d34329"
  },
  {
    "url": "fontawesome-free-5.6.3-web/css/brands.css",
    "revision": "84e9ba355e882513755e8c7f1766aaf7"
  },
  {
    "url": "fontawesome-free-5.6.3-web/css/brands.min.css",
    "revision": "71226d3b7693d3899fbc7fa4cff57475"
  },
  {
    "url": "fontawesome-free-5.6.3-web/css/fontawesome.css",
    "revision": "5cb0915521af89b80a44fb1109c1368a"
  },
  {
    "url": "fontawesome-free-5.6.3-web/css/fontawesome.min.css",
    "revision": "b6009a254297c158494998664d7f78c7"
  },
  {
    "url": "fontawesome-free-5.6.3-web/css/regular.css",
    "revision": "ce090eed38906194dc2c57ab443b7bea"
  },
  {
    "url": "fontawesome-free-5.6.3-web/css/regular.min.css",
    "revision": "53dc095c6c91a8cc50b385fa5f093e8b"
  },
  {
    "url": "fontawesome-free-5.6.3-web/css/solid.css",
    "revision": "6b1df5629c4d836241dae7c714908066"
  },
  {
    "url": "fontawesome-free-5.6.3-web/css/solid.min.css",
    "revision": "964e1996ee2b531da090fe8920209ee8"
  },
  {
    "url": "fontawesome-free-5.6.3-web/css/svg-with-js.css",
    "revision": "2374d930e5976a555f7aee9fb124d547"
  },
  {
    "url": "fontawesome-free-5.6.3-web/css/svg-with-js.min.css",
    "revision": "25ae4489a89c35c7129c1a0ec928a4b5"
  },
  {
    "url": "fontawesome-free-5.6.3-web/css/v4-shims.css",
    "revision": "4743493a0d5ff9fb4258cec6dbfebf80"
  },
  {
    "url": "fontawesome-free-5.6.3-web/css/v4-shims.min.css",
    "revision": "c217bda6dbb0d3e301283e4118777ac0"
  },
  {
    "url": "fontawesome-free-5.6.3-web/js/all.js",
    "revision": "c435edabacf3ec944b7190585e08b966"
  },
  {
    "url": "fontawesome-free-5.6.3-web/js/all.min.js",
    "revision": "7b6ab1d5b8de4d3b0e2d8084ad292818"
  },
  {
    "url": "fontawesome-free-5.6.3-web/js/brands.js",
    "revision": "49b6ad2ba77455cc7c898df6bbac50ac"
  },
  {
    "url": "fontawesome-free-5.6.3-web/js/brands.min.js",
    "revision": "ad3648b29a6c274e51b2b8267ea31835"
  },
  {
    "url": "fontawesome-free-5.6.3-web/js/fontawesome.js",
    "revision": "f130f31957d872745a572b2248966e8f"
  },
  {
    "url": "fontawesome-free-5.6.3-web/js/fontawesome.min.js",
    "revision": "c333c2e655f872f2b9db930a32151557"
  },
  {
    "url": "fontawesome-free-5.6.3-web/js/regular.js",
    "revision": "ccd5a65c9b179efb418e2ca78fc91bc0"
  },
  {
    "url": "fontawesome-free-5.6.3-web/js/regular.min.js",
    "revision": "77d068664b38ceb6a352ecb01c93260c"
  },
  {
    "url": "fontawesome-free-5.6.3-web/js/solid.js",
    "revision": "c0e79267809c4a65b6c1faa343232fbe"
  },
  {
    "url": "fontawesome-free-5.6.3-web/js/solid.min.js",
    "revision": "7766ce2ff7e86f5870a91bbbb22459e4"
  },
  {
    "url": "fontawesome-free-5.6.3-web/js/v4-shims.js",
    "revision": "bd0bbadd4409e5f19baf56eb75addb0c"
  },
  {
    "url": "fontawesome-free-5.6.3-web/js/v4-shims.min.js",
    "revision": "6fefaf25ceea1caad6bb18bfeba4330a"
  },
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
    "revision": "db8da029ff28e32015ff5ff5d690e67c"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/(\/|\/products|\/product\/.+)$/, workbox.strategies.staleWhileRevalidate({ "cacheName":"pages", plugins: [] }), 'GET');
workbox.routing.registerRoute(/\.(?:png|gif|jpg|jpeg|svg).*$/, workbox.strategies.cacheFirst({ "cacheName":"images", plugins: [new workbox.expiration.Plugin({"maxEntries":100,"maxAgeSeconds":2592000,"purgeOnQuotaError":false})] }), 'GET');
workbox.routing.registerRoute(/.+\.(?:png|gif|jpg|jpeg|svg).*$/, workbox.strategies.cacheFirst({ "cacheName":"remote-images", plugins: [new workbox.cacheableResponse.Plugin({"statuses":[0,200]}), new workbox.expiration.Plugin({"maxEntries":100,"maxAgeSeconds":2592000,"purgeOnQuotaError":false})] }), 'GET');
workbox.routing.registerRoute(/\.(?:js|css|woff2|webmanifest)$/, workbox.strategies.staleWhileRevalidate({ "cacheName":"static-resources", plugins: [] }), 'GET');
