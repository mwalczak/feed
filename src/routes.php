<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes

$app->get('/products', function (Request $request, Response $response, array $args) {
    $this->logger->info("Feed 'products' route");

    $feedReader = $this->get('feedReader');
    $products = $feedReader->getProducts();

    $productsToShow = 100;

    $args['products'] = array_slice($products,0,$productsToShow);
    $args['productsShow'] = $productsToShow;
    $args['productsCount'] = count($products);
    $args['sessionId'] = $this->session::id();

    return $this->renderer->render($response, 'products.twig', $args);
});

$app->get('/product/{id}', function (Request $request, Response $response, array $args) {
    $this->logger->info("Feed 'product' route");
    /**
     * @var $feedReader \FeedReader\FeedReader
     */
    $feedReader = $this->get('feedReader');
    $product = $feedReader->getProduct($args['id']);

    if(empty($product)){
        return $response->withStatus(404);
    }
    $args['product'] = $product;
    $args['sessionId'] = $this->session::id();

    return $this->renderer->render($response, 'product.twig', $args);
})->setName('product');

$app->get('/product/{id}/add', function (Request $request, Response $response, array $args) {
    $this->logger->info("Feed 'product-add' route");

    /**
     * @var $feedReader \FeedReader\FeedReader
     */
    $feedReader = $this->get('feedReader');
    $product = $feedReader->getProduct($args['id']);

    if(empty($product)){
        return $response->withStatus(404);
    }

    if(isset($this->session->cart)) {
        $cart = unserialize($this->session->cart);
    } else {
        $cart = [];
    }
    $cart[$args['id']] = isset($cart[$args['id']]) ? $cart[$args['id']]+1 : 1;
    $this->session->cart = serialize($cart);

    return $response->withStatus(200);
})->setName('product-add');

$app->get('/cart', function (Request $request, Response $response, array $args) {
    $this->logger->info("Feed 'cart' route");
    $total = 0;
    if(isset($this->session->cart)){
        /**
         * @var $feedReader \FeedReader\FeedReader
         */
        $feedReader = $this->get('feedReader');
        $cart = unserialize($this->session->cart);
        foreach($cart as $id=>$quantity){
            $product = $feedReader->getProduct($id);
            $total += $productTotal = $quantity*$product['price'];
            $args['cart'][] = array_merge(['id'=>$id, 'quantity'=>$quantity, 'total'=>$productTotal], $product);
        }
    } else {
        $args['cart'] = [];
    }

    $args['total'] = $total;
    $args['sessionId'] = $this->session::id();

    return $this->renderer->render($response, 'cart.twig', $args);
})->setName('cart');

$app->get('/registration', function (Request $request, Response $response, array $args) {
    $this->logger->info("Feed 'registration' route");

    $args['sessionId'] = $this->session::id();

    return $this->renderer->render($response, 'registration.twig', $args);
})->setName('registration');

$app->get('/delivery', function (Request $request, Response $response, array $args) {
    $this->logger->info("Feed 'delivery' route");

    $args['sessionId'] = $this->session::id();

    return $this->renderer->render($response, 'delivery.twig', $args);
})->setName('delivery');

$app->get('/payment', function (Request $request, Response $response, array $args) {
    $this->logger->info("Feed 'payment' route");

    $args['sessionId'] = $this->session::id();

    return $this->renderer->render($response, 'payment.twig', $args);
})->setName('payment');

$app->get('/checkout', function (Request $request, Response $response, array $args) {
    $this->logger->info("Feed 'checkout' route");
    if(!empty($this->session->cart)){
        $args['sessionId'] = $this->session::id();
        unset($this->session->cart);
        $this->session::destroy();
    }

    return $this->renderer->render($response, 'checkout.twig', $args);
})->setName('checkout');

$app->redirect('/', '/products', 301);
