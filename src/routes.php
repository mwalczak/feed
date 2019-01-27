<?php

use Controller\AppController;

// Routes

$app->get('/', AppController::class . ':productsAction');

$app->get('/products', AppController::class . ':productsAction');

$app->get('/product/{id}', AppController::class . ':productAction')->setName('product');

$app->get('/product/{id}/add', AppController::class . ':productAddAction')->setName('product-add');

$app->post('/product/{id}/quantity', AppController::class . ':productQuantityAction')->setName('product-quantity');

$app->delete('/product/{id}', AppController::class . ':productRemoveAction')->setName('product-remove');

$app->get('/cart', AppController::class . ':cartAction')->setName('cart');

$app->get('/registration', AppController::class . ':registrationAction')->setName('registration');

$app->get('/delivery', AppController::class . ':deliveryAction')->setName('delivery');

$app->get('/payment', AppController::class . ':paymentAction')->setName('payment');

$app->get('/checkout', AppController::class . ':checkoutAction')->setName('checkout');

$app->post('/session', AppController::class . ':sessionAction')->setName('session');

