class Cart {
    constructor() {
        this.storage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
    }

    static shake() {
        let elem = document.getElementById("cart_icon");
        let clone = elem.cloneNode(true);
        elem.parentNode.replaceChild(clone, elem);
        document.getElementById("cart_icon").classList.add("shake");
    }

    static calc() {
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
        document.getElementById("product_count").innerHTML = cart_count;
    }

    add(productId, quantity) {
        if (navigator.onLine) {
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    const ret = JSON.parse(this.responseText);
                    console.log("Product " + productId + " added to cart, total products: " + ret.productCount);
                    Cart.shake();
                    document.getElementById("cart_count").innerHTML = ret.productCount;
                }
            };
            xhttp.open("POST", "/product/" + productId + "/add", true);
            xhttp.send(quantity);
        } else {
            console.log("offline");
            if (this.storage[productId] === undefined) {
                this.storage[productId] = 1;
            } else {
                this.storage[productId]++;
            }
            console.log(this.storage);
            this.updateStorage();
        }
    }

    change(productId, quantity) {
        if (navigator.onLine) {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    console.log("Product " + productId + " quantity changed: " + quantity);
                    Cart.calc();
                }
            };
            xhttp.open("POST", "/product/" + productId + "/quantity", true);
            xhttp.send(quantity);
        } else {
            console.log("offline");
            this.storage[productId] = quantity;
            this.updateStorage();
        }

    }

    remove(productId, row) {
        if (navigator.onLine) {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    console.log("Product " + productId + " removed");
                    row.parentNode.removeChild(row);
                    Cart.calc();
                }
            };
            xhttp.open("DELETE", "/product/" + productId, true);
            xhttp.send();
        } else {
            console.log("offline");
            this.removeFromStorage(productId);
        }
    }

    removeFromStorage(productId) {
        if (this.storage[productId] !== undefined) {
            delete this.storage[productId];
            this.updateStorage();
        }
    }

    updateStorage() {
        console.log("saving cart to locastorage: " + JSON.stringify(this.storage));
        localStorage.setItem('cart', JSON.stringify(this.storage));
    }

    checkStorage() {
        console.log("check cart: " + Object.keys(this.storage).length);
        return Object.keys(this.storage).length;
    }

    clearStorage() {
        this.storage = {};
        this.updateStorage();
    }

    syncStorage(callback) {
        if (Object.keys(this.storage).length && navigator.onLine) {
            let cart = JSON.stringify(this.storage);
            console.log("sending cart to server: " + cart);

            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    console.log("cart was synced");
                    let cart = new Cart();
                    cart.clearStorage();
                    if (callback !== undefined) {
                        callback();
                    }
                }
            };
            xhttp.open("PUT", "/cart", true);
            xhttp.send(cart);
        }
    }

}