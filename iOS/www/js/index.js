document.addEventListener('deviceready', onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {

    // Uncomment to test Retina Layers
    // L.Browser.retina = true;

    //Load layers
    var windbreaker = L.mapbox.tileLayer('bobbysud.map-0c36p1bf', {
        detectRetina:true,
        retinaVersion: 'bobbysud.map-qqgc030n',
        maxZoom:19
    }),
        terrain = L.mapbox.tileLayer('bobbysud.map-8owxxni8', {
        detectRetina:true,
        retinaVersion:'bobbysud.map-tyt3admo',
        maxZoom:19
    }),
        afternoon = L.mapbox.tileLayer('bobbysud.map-cfaq2kkp', {
        detectRetina:true,
        retinaVersion:'bobbysud.map-15wycltk',
        maxZoom:18
    })

    //Load map and first layer
    var map = L.mapbox.map('map', null,{
        layers: [windbreaker],
        zoomControl: false,
        attributionControl: false,
    });

    //Create array of layers
    var baseLayers = {
        'Windbreaker': windbreaker,
        'Terrain': terrain,
        'Afternoon': afternoon
    };

    //Add layer switcher to map
    L.control.layers(baseLayers).addTo(map);



    //Specify icon
    var myIcon = L.icon({
        iconUrl: '../www/img/marker.png',
        iconRetinaUrl: '../www/img/marker.png',
        iconSize: [38, 95],
        iconAnchor: [20, 48],
        popupAnchor: [-1, -38],
    });



    //Create a custom 'on the users location found' function
    function onLocationFound(e) {
        L.marker(e.latlng,{icon: myIcon}).addTo(map)
            .bindPopup('You are here').openPopup();
    }

    //Create a custom 'on the users location not found' function
    function onLocationError(e) {
        //Default location
        map.setView([37.7853, -122.4319],14)

        //Alert the user to turn on their location settings. This is a native alert rather than alert('');
        navigator.notification.alert(
            'Make sure your location settings are enabled',  // message
            null,                                            // callback
            'Woops!',                                        // title
            'Done'                                           // buttonName
        );
    }

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    map.locate({setView: true, maxZoom: 19});



    //Place marker function
    function placeMarker (e){
        var content = "<div class='content'><button class='open-camera'>Take a Photo</button></div>";

        L.marker(e.latlng,{icon:myIcon}).addTo(map)
            .bindPopup(content).openPopup();


        $('.open-camera').onpress(function(){

            navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
                destinationType: Camera.DestinationType.DATA_URL
             }); 

            function onSuccess(imageData) {
                $('.content').append("<img src='data:image/jpeg;base64," + imageData + "' height='100px' width='100px' />")
            }

            function onFail(message) {
                alert('Failed because: ' + message);
            }

        })
    }

    map.on('contextmenu',placeMarker)



    $('#arrow, #arrow-text').onpress(function(){ //onpress is quicker than click

        var options = { frequency: 100 };  // Update every .1 seconds
        var watchID = navigator.compass.watchHeading(onSuccess, onError, options);

        function onSuccess(heading) {
            var heading = Math.round(heading.magneticHeading)
            $('#arrow-text').html(heading + 'º')

            $('#arrow').css('-webkit-transform','rotate(' + (360 - heading) + 'deg)') //Subtract from 360 so it always points north
        };

        function onError(compassError) {
            alert('Compass error: ' + compassError.code);
        };
    })

}//End onDeviceReady