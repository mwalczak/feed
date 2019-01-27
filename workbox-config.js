module.exports = {
    globDirectory: 'public/',
    globPatterns: [
        '**/*.{css,js}',
    ],
    swDest: 'public/sw.js',

    runtimeCaching: [
        {
            urlPattern: /(\/|\/products|\/product\/\\d+)/,
            handler: 'staleWhileRevalidate',
            options: {
                cacheName: 'pages'
            },
        },
        {
            urlPattern: /\.(?:png|gif|jpg|jpeg|svg)$/,
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
            urlPattern: /\.(?:js|css|woff2|webmanifest)$/,
            handler: 'staleWhileRevalidate',
            options: {
                cacheName: 'static-resources'
            },
        }]
};