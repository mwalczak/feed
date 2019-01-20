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
    private $url;
    private $cache;

    public function __construct($url, $cache = "")
    {
        $this->url = $url;
        $this->cache = $cache;
        $this->fetch();
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

    private function fetch($ignoreCache = false){
        if(is_file($this->cache) && !$ignoreCache){
            $this->xml(file_get_contents($this->cache));
        } else {
            $contents = file_get_contents($this->url);
            if(!empty($this->cache)){
                file_put_contents($this->cache, $contents);
            }
            $this->xml($contents);
        }
    }

}