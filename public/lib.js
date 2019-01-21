function shake_cart(){
    var elem = document.getElementById("cart_icon");
    var clone = elem.cloneNode(true);
    elem.parentNode.replaceChild(clone, elem);
    document.getElementById("cart_icon").classList.add("shake");
}