function shake_cart() {
    let elem = document.getElementById("cart_icon");
    let clone = elem.cloneNode(true);
    elem.parentNode.replaceChild(clone, elem);
    document.getElementById("cart_icon").classList.add("shake");
}

function calc_cart() {
    const cart = document.getElementById("cart");
    const tbody = cart.getElementsByTagName("tbody")[0];
    const rows = tbody.children;
    let cart_total = 0;
    let cart_count = 0;
    for (let row = 0; row < rows.length; row++) {
        let quantity = parseInt(rows[row].getElementsByClassName("product_quantity")[0].value);
        let price = parseFloat(rows[row].getElementsByClassName("product_price")[0].innerHTML);
        let product_total = price * quantity;
        rows[row].getElementsByClassName("product_total")[0].innerHTML = product_total;
        cart_total += product_total;
        cart_count += quantity;
    }
    document.getElementById("cart_total").innerHTML = cart_total;
    document.getElementById("cart_count").innerHTML = cart_count;
    document.getElementById("product_count").innerHTML = rows.length;
}