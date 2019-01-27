<?php
/**
 * Created by PhpStorm.
 * User: Mateusz
 * Date: 21.01.2019
 * Time: 22:21
 */

namespace Controller;

use FeedReader\FeedReader;
use Monolog\Logger;
use Slim\Container;
use Slim\Http\Request;
use Slim\Http\Response;
use Slim\Views\Twig;

class AppController
{
    /**
     * @var Container $container
     */
    private $container;
    /**
     * @var Twig $renderer
     */
    private $renderer;
    /**
     * @var Logger $logger
     */
    private $logger;
    /**
     * @var \SlimSession\Helper $session
     */
    private $session;
    private $settings;

    public function __construct(Container $container)
    {
        $this->container = $container;
        $this->renderer = $container->get("renderer");
        $this->logger = $container->get("logger");
        $this->session = $container->get("session");
        $this->settings = $container->get("settings");
    }

    private function render(Response $response, string $template, array $args)
    {
        $args['appName'] = $this->settings['appName'];
        $args['cacheTime'] = ($this->settings['feed']['cache'] && is_file($this->settings['feed']['cache'])) ? filemtime($this->settings['feed']['cache']) : time();

        $args['sessionId'] = $this->session::id();
        $args['email'] = $this->session->email;
        if (!empty($this->session->cart)) {
            $cart = unserialize($this->session->cart);
            $args['cartCount'] = array_sum($cart);
            $args['cartProducts'] = implode(",", array_keys($cart));
            $args['cartQuantities'] = implode(",", array_values($cart));
        }

        return $this->renderer->render($response, $template, $args);
    }

    public function productsAction(Request $request, Response $response, array $args)
    {
        $this->logger->info("Feed 'products' route");

        $feedReader = new FeedReader($this->settings['feed']['url'], $this->settings['feed']['cache'], $this->settings['feed']['extra_fields']);
        $products = array_slice($feedReader->getProducts(),0,35);
        $args['productsCount'] = count($products);
        $queryParams = $request->getQueryParams();
        $offset = 0;
        if (!empty($queryParams['page']) && intval($queryParams['page']) > 1) {
            $offset = ($queryParams['page'] - 1) * $this->settings['feed']['max_products_on_page'];
        }
        if ($offset > $args['productsCount']) {
            return $response->withStatus(204, "no more products");
        }

        $args['products'] = ($this->settings['feed']['max_products_on_page'] && $args['productsCount'] > $this->settings['feed']['max_products_on_page']) ? array_slice($products, $offset, $this->settings['feed']['max_products_on_page']) : $products;
        $args['productsShow'] = count($args['products']);

        return $this->render($response, 'products.twig', $args);
    }

    public function productAction(Request $request, Response $response, array $args)
    {
        $this->logger->info("Feed 'product' route");

        $feedReader = new FeedReader($this->settings['feed']['url'], $this->settings['feed']['cache'], $this->settings['feed']['extra_fields']);
        $product = $feedReader->getProduct($args['id']);

        if (empty($product)) {
            return $response->withStatus(404);
        }
        $args['product'] = $product;
        foreach ($feedReader->getExtraFields() as $field) {
            $args['extraFields'][] = ['name' => $field, 'value' => strip_tags($product[$field])];
        }
        return $this->render($response, 'product.twig', $args);
    }

    public function productAddAction(Request $request, Response $response, array $args)
    {
        $this->logger->info("Feed 'product-add' route");

        $feedReader = new FeedReader($this->settings['feed']['url'], $this->settings['feed']['cache']);
        $product = $feedReader->getProduct($args['id']);

        if (empty($product)) {
            return $response->withStatus(404);
        }

        if (isset($this->session->cart)) {
            $cart = unserialize($this->session->cart);
        } else {
            $cart = [];
        }
        $quantity = intval($request->getBody()->getContents());
        $cart[$args['id']] = isset($cart[$args['id']]) ? $cart[$args['id']] + $quantity : $quantity;
        $this->session->cart = serialize($cart);

        return $response->withJson(['productCount' => array_sum($cart)], 200);
    }

    public function productQuantityAction(Request $request, Response $response, array $args)
    {
        $feedReader = new FeedReader($this->settings['feed']['url'], $this->settings['feed']['cache']);
        $product = $feedReader->getProduct($args['id']);

        if (empty($product)) {
            return $response->withStatus(404);
        }

        if (isset($this->session->cart)) {
            $cart = unserialize($this->session->cart);
        } else {
            $cart = [];
        }
        $quantity = intval($request->getBody()->getContents());
        $this->logger->info("Feed 'product-quantity' route - set product:" . $args['id'] . " - quantity: " . $quantity);

        $cart[$args['id']] = $quantity;
        $this->session->cart = serialize($cart);

        return $response->withStatus(200);
    }

    public function productRemoveAction(Request $request, Response $response, array $args)
    {
        $feedReader = new FeedReader($this->settings['feed']['url'], $this->settings['feed']['cache']);
        $product = $feedReader->getProduct($args['id']);

        if (empty($product)) {
            return $response->withStatus(404);
        }

        if (isset($this->session->cart)) {
            $cart = unserialize($this->session->cart);
        } else {
            $cart = [];
        }
        $this->logger->info("Feed 'product-remove' route - product:" . $args['id']);

        unset($cart[$args['id']]);
        $this->session->cart = serialize($cart);

        return $response->withStatus(200);
    }

    public function cartAction(Request $request, Response $response, array $args)
    {
        $this->logger->info("Feed 'cart' route");
        $total = 0;
        if (isset($this->session->cart)) {
            $feedReader = new FeedReader($this->settings['feed']['url'], $this->settings['feed']['cache']);
            $cart = unserialize($this->session->cart);
            foreach ($cart as $id => $quantity) {
                $product = $feedReader->getProduct($id);
                $total += $productTotal = $quantity * $product['price'];
                $args['cart'][] = array_merge(['id' => $id, 'quantity' => $quantity, 'total' => $productTotal], $product);
            }
        } else {
            $args['cart'] = [];
        }

        $args['total'] = $total;

        return $this->render($response, 'cart.twig', $args);
    }

    public function registrationAction(Request $request, Response $response, array $args)
    {
        $this->logger->info("Feed 'registration' route");

        return $this->render($response, 'registration.twig', $args);
    }

    public function deliveryAction(Request $request, Response $response, array $args)
    {
        $this->logger->info("Feed 'delivery' route");

        return $this->render($response, 'delivery.twig', $args);
    }

    public function paymentAction(Request $request, Response $response, array $args)
    {
        $this->logger->info("Feed 'payment' route");

        return $this->render($response, 'payment.twig', $args);
    }

    public function checkoutAction(Request $request, Response $response, array $args)
    {
        $this->logger->info("Feed 'checkout' route - session:" . $this->session::id() . ", email:" . $this->session->email);

        if (!empty($this->session->cart)) {
            $args['sessionId'] = $this->session::id();
            unset($this->session->cart);
            $this->session::destroy();
        }

        return $this->renderer->render($response, 'checkout.twig', $args);
    }

    public function sessionAction(Request $request, Response $response, array $args)
    {
        $fields = $request->getParsedBody();

        $this->logger->info("Feed 'session' route: " . json_encode($fields));

        foreach ($fields as $key => $value) {
            $this->session->set($key, $value);
        }

        return $response->withRedirect($this->container->get('router')->pathFor('registration'), 302);
    }

}