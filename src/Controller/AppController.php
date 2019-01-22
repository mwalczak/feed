<?php
/**
 * Created by PhpStorm.
 * User: Mateusz
 * Date: 21.01.2019
 * Time: 22:21
 */

namespace Controller;

use FeedReader\FeedReader;
use Slim\Container;
use Slim\Http\Request;
use Slim\Http\Response;

class AppController
{
    private $renderer;
    private $logger;
    private $session;
    private $settings;

    public function __construct(Container $container) {
        $this->renderer = $container->get("renderer");
        $this->logger = $container->get("logger");
        $this->session = $container->get("session");
        $this->settings =  $container->get("settings");
    }

    private function render(Response $response, string $template, array $args){
        $args['sessionId'] = $this->session::id();
        if(!empty($this->session->cart)){
            $cart = unserialize($this->session->cart);
            $args['cartCount'] = array_sum($cart);
        }
        return $this->renderer->render($response, $template, $args);
    }

    public function productsAction(Request $request, Response $response, array $args) {
        $this->logger->info("Feed 'products' route");

        $feedReader = new FeedReader($this->settings['feed']['url'], $this->settings['feed']['cache']);
        $products = $feedReader->getProducts();

        $productsToShow = 100;

        $args['products'] = array_slice($products,0,$productsToShow);
        $args['productsShow'] = $productsToShow;
        $args['productsCount'] = count($products);

        return $this->render($response, 'products.twig', $args);
    }

    public function productAction(Request $request, Response $response, array $args) {
        $this->logger->info("Feed 'product' route");

        $feedReader = new FeedReader($this->settings['feed']['url'], $this->settings['feed']['cache']);
        $product = $feedReader->getProduct($args['id']);

        if(empty($product)){
            return $response->withStatus(404);
        }
        $args['product'] = $product;

        return $this->render($response, 'product.twig', $args);
    }

    public function productAddAction(Request $request, Response $response, array $args) {
        $this->logger->info("Feed 'product-add' route");

        $feedReader = new FeedReader($this->settings['feed']['url'], $this->settings['feed']['cache']);
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

        return $response->withJson(['productCount' => array_sum($cart)], 200);
    }

    public function productQuantityAction(Request $request, Response $response, array $args) {
        $feedReader = new FeedReader($this->settings['feed']['url'], $this->settings['feed']['cache']);
        $product = $feedReader->getProduct($args['id']);

        if(empty($product)){
            return $response->withStatus(404);
        }

        if(isset($this->session->cart)) {
            $cart = unserialize($this->session->cart);
        } else {
            $cart = [];
        }
        $quantity = intval($request->getBody()->getContents());
        $this->logger->info("Feed 'product-quantity' route - set product:".$args['id']." - quantity: ".$quantity);

        $cart[$args['id']] = $quantity;
        $this->session->cart = serialize($cart);

        return $response->withStatus(200);
    }

    public function cartAction(Request $request, Response $response, array $args) {
        $this->logger->info("Feed 'cart' route");
        $total = 0;
        if(isset($this->session->cart)){
            $feedReader = new FeedReader($this->settings['feed']['url'], $this->settings['feed']['cache']);
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

        return $this->render($response, 'cart.twig', $args);
    }

    public function registrationAction(Request $request, Response $response, array $args) {
        $this->logger->info("Feed 'registration' route");

        return $this->render($response, 'registration.twig', $args);
    }

    public function deliveryAction(Request $request, Response $response, array $args) {
        $this->logger->info("Feed 'delivery' route");

        return $this->render($response, 'delivery.twig', $args);
    }

    public function paymentAction(Request $request, Response $response, array $args) {
        $this->logger->info("Feed 'payment' route");

        return $this->render($response, 'payment.twig', $args);
    }

    public function checkoutAction(Request $request, Response $response, array $args) {
        $this->logger->info("Feed 'checkout' route");

        if(!empty($this->session->cart)){
            $args['sessionId'] = $this->session::id();
            unset($this->session->cart);
            $this->session::destroy();
        }

        return $this->renderer->render($response, 'checkout.twig', $args);
    }

}