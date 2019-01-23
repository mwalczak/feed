# Front for XML product feed

Use this application to simulate e-commerce platform based only on xml product feed url 
 
Supported feed types:
- RSS Google Merchant - https://support.google.com/merchants/answer/160589?hl=pl

## Install the Application

Run this command from the directory in which you want to install your new Slim Framework application.

    composer install
    chmod u+x install.sh
    ./install.sh
    
Configure your product feed url in settings.php
    
    'feed' => [
        'url' => 'http://feed.url'
    ]

Run php server or setup your vhost configuration to /public
    
    php -S localhost:8080 -t public
    
Paste your optional javascript in:

    templates/script
   