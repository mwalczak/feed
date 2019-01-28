<?php
/**
 * Created by PhpStorm.
 * User: Mateusz
 * Date: 20.01.2019
 * Time: 19:05
 */
namespace FeedReader;

class FeedReader
{
    private $xml;

    private $url;
    private $cache;
    private $extraFields;

    public function __construct($url, $cache = false, $extraFields = [])
    {
        $this->url = $url;
        $this->cache = $cache;
        $this->extraFields = $extraFields;

        $this->xml = new \SimpleXMLElement($this->fetch());
    }

    public function getProducts(){
        $products = [];
        /**
         * @var $item \SimpleXMLElement
         */
        foreach($this->xml->channel->item as $item){
            $product = [];
            foreach($item->children("g", true) as $attribute=>$value){
                $product[$attribute] = (string) $value;
            }
            if(is_array($this->extraFields)){
                foreach($this->extraFields as $namespace=>$fields){
                    foreach($item->children($namespace, true) as $attribute=>$value){
                        $product[$attribute] = (string) $value;
                    }
                }
            }
            foreach($item->children() as $attribute=>$value){
                $product[$attribute] = (string) $value;
            }
            $products[$product['id']] = $product;
        }

        return $products;
    }

    public function getProduct($id){
        $products = $this->getProducts();
        return $products[$id];
    }

    private function fetch($ignoreCache = false){
        if(is_file($this->cache) && !$ignoreCache){
            return file_get_contents($this->cache);
        } else {
            $contents = file_get_contents($this->url);
            if(!empty($this->cache)){
                file_put_contents($this->cache, $contents);
            }
            return $contents;
        }
    }

    public function getExtraFields(){
        $extraFields = [];
        foreach($this->extraFields as $namespace=>$fields){
            $extraFields = array_merge($extraFields, $fields);
        }
        return $extraFields;
    }

}