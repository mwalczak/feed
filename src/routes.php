<?php

use Controller\AppController;

// Routes

$app->get('/products', AppController::class . ':productsAction');

$app->get('/product/{id}', AppController::class . ':productAction')->setName('product');

$app->get('/product/{id}/add', AppController::class . ':productAddAction')->setName('product-add');

$app->get('/cart', AppController::class . ':cartAction')->setName('cart');

$app->get('/registration', AppController::class . ':registrationAction')->setName('registration');

$app->get('/delivery', AppController::class . ':deliveryAction')->setName('delivery');

$app->get('/payment', AppController::class . ':paymentAction')->setName('payment');

$app->get('/checkout', AppController::class . ':checkoutAction')->setName('checkout');

$app->redirect('/', '/products', 301);
