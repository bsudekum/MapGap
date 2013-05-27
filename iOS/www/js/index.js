document.addEventListener('deviceready', onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {

    //Load map and first layer
    var map = L.mapbox.map('map', null,{
        attributionControl: false,
        zoomControl: false
    }).setView([40,10],2);

    var offline = L.tileLayer('src/adirectory/{z}/{x}/{y}.png', {
        maxZoom:6
    }).addTo(map)

}//End onDeviceReady
onDeviceReady()