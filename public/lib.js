function shake_cart(){
    var elem = document.getElementById("cart_icon");
    var clone = elem.cloneNode(true);
    elem.parentNode.replaceChild(clone, elem);
    document.getElementById("cart_icon").classList.add("shake");
}

function calc_cart(){
    var cart = document.getElementById("cart");
    var tbody = cart.getElementsByTagName("tbody")[0];
    var rows = tbody.children;
    var cart_total = 0;
    for (var row=0; row < rows.length; row++) {
        var quantity = parseInt(rows[row].getElementsByClassName("product_quantity")[0].value);
        var price = parseFloat(rows[row].getElementsByClassName("product_price")[0].innerHTML);
        var product_total = price*quantity;
        rows[row].getElementsByClassName("product_total")[0].innerHTML = product_total;
        cart_total+=product_total
    }
    document.getElementById("cart_total").innerHTML = cart_total;
}