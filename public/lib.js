function onlineStatus(){
    console.log("User switched to online");
    let cart = new Cart();
    if(cart.checkStorage()){
        cart.syncStorage(function(){
            console.log("Cart updated");
        });
    }
}

function offlineStatus(){
    console.log("User switched to offline");
}

function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geo Location not supported by browser");
    }
}
//function that retrieves the position
function showPosition(position) {
    var location = {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
    }
    console.log(location);
    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/geolocation", true);
    xhttp.send(JSON.stringify(location));
}