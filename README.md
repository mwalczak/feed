# Front for XML product feed

Use this application to simulate e-commerce platform based only on xml product feed url 
 
Supported feed types:
- RSS Google Merchant - https://support.google.com/merchants/answer/160589?hl=pl

## Install the application

Run this command from the directory in which you want to install your new Slim Framework application.

    composer install
    chmod u+x install.sh
    ./install.sh
    
Configure your product feed url in settings.php
    
    'feed' => [
        'url' => 'http://feed.url'
    ]

[Optional] Configure your app name in settings.php for PWA
    
    'appName' => 'My Feed',

Run php server or setup your vhost configuration to /public
    
    php -S localhost:8080 -t public
    
Paste your optional javascript in:

    templates/script
    
## Configure integrations:

SAREhub tricking pixel

    'sarehub_pixel' => [
        'domain' => 'example.com'
    ]

SAREhub tracking javascript

    'sarehub_js' => [
        'domain' => 'example.com'
    ]
   
## Dev dependencies
PHP 7.x

Nodejs 8+
https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04

Service workers and cache - Workbox CLI

https://developers.google.com/web/tools/workbox/modules/workbox-cli

To rebuild service workers use injectManifest mode:

    workbox injectManifest workbox-config.js
   
## What's new
2019-04-12

Facebook pixel and Revhunter integrations

2019-04-11

Opengraph (product meta) and SAREhub integrations

2019-02-03

Offline cart and sync with server when online

2019-01-28

Missing cache fallback for PWA

2019-01-27

Pagination, frontend performance, first PWA

2019-01-24

More events (quantity, remove), session handling

2019-01-20

Project start, first working version
