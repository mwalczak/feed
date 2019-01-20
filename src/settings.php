<?php
return [
    'settings' => [
        'displayErrorDetails' => true, // set to false in production
        'addContentLengthHeader' => false, // Allow the web server to send the content-length header

        // Renderer settings
        'renderer' => [
            'template_path' => __DIR__ . '/../templates/',
            'cache_path' => false
        ],

        // Monolog settings
        'logger' => [
            'name' => 'slim-app',
            'path' => isset($_ENV['docker']) ? 'php://stdout' : __DIR__ . '/../logs/app.log',
            'level' => \Monolog\Logger::DEBUG,
        ],

        // Feed settings
        'feed' => [
//            'url' => 'http://a.cdn.searchspring.net/help/feeds/sample.xml',
            'url' => 'http://feed.inistrack.net/api/v1/feeds/feed/756e1cb2e6ca818f0335f6a48837fd2ae7aaac6ca2fd926f5a8197517f55dd5e/file/rss2/display',
            'cache' => __DIR__ . '/../cache/feed.xml',
//            'product_element' => "{}Product"
            'product_element' => "{}item"
        ],
    ],
];
