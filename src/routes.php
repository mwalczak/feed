<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes

$app->get('/products', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/products' route");

    $feedReader = $this->get('feedReader');
    $products = $feedReader->getProducts();

    $args['products'] = $products;
    $args['productsCount'] = count($products);

    return $this->renderer->render($response, 'products.phtml', $args);
});


$app->get('/product/{id}', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/product' route");

    $feedReader = $this->get('feedReader');
    $product = $feedReader->getProduct($args['id']);

    if(empty($product)){
        return $response->withStatus(404);
    }
    $args['product'] = $product;

    return $this->renderer->render($response, 'product.phtml', $args);
});

$app->redirect('/', '/products', 301);
