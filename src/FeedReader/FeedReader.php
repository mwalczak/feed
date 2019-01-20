<?php
/**
 * Created by PhpStorm.
 * User: Mateusz
 * Date: 20.01.2019
 * Time: 19:05
 */
namespace FeedReader;

use Sabre\Xml;

class FeedReader extends Xml\Reader
{
    public function __construct($url)
    {
        $this->xml(file_get_contents($url));

        $this->elementMap = [
            '{}Product' => function(Xml\Reader $reader) {
                return Xml\Deserializer\keyValue($reader, '');
            }
        ];
    }

    public function getProducts(){
        $parsedArray = $this->parse();
        $products = [];
        foreach($parsedArray['value'] as $product){
            $products[$product['value']['id']] = $product['value'];
        }

        return $products;
    }

    public function getProduct($id){
        $products = $this->getProducts();
        return $products[$id];
    }

}