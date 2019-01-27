module.exports = {
    globDirectory: 'public/',
    globPatterns: [
        '**/*.{css,js}',
    ],
    swDest: 'public/sw.js',

    runtimeCaching: [
        {
            urlPattern: /(\/|\/products|\/product\/.+)$/,
            handler: 'staleWhileRevalidate',
            options: {
                cacheName: 'pages'
            },
        },
        {
            urlPattern: /\.(?:png|gif|jpg|jpeg|svg).*$/,
            handler: 'cacheFirst',
            options: {
                cacheName: 'images',
                expiration: {
                    maxEntries: 100,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                },
            },
        },
        {
            urlPattern: /.+\.(?:png|gif|jpg|jpeg|svg).*$/,
            handler: 'cacheFirst',
            options: {
                cacheName: 'remote-images',
                cacheableResponse: {
                    statuses: [0, 200]
                },
                expiration: {
                    maxEntries: 100,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                },
            },
        },
        {
            urlPattern: /\.(?:js|css|woff2|webmanifest)$/,
            handler: 'staleWhileRevalidate',
            options: {
                cacheName: 'static-resources'
            },
        }]
};