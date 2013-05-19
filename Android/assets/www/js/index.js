// document.addEventListener('deviceready', onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {

    //Load layers
    var windbreaker = L.tileLayer('http://{s}.tiles.mapbox.com/v3/bobbysud.map-0c36p1bf/{z}/{x}/{y}.png',{
        detectRetina:true
    }),
        terrain = L.tileLayer('http://{s}.tiles.mapbox.com/v3/bobbysud.map-8owxxni8/{z}/{x}/{y}.png', {
        detectRetina:true
    }),
        afternoon = L.tileLayer('http://{s}.tiles.mapbox.com/v3/bobbysud.map-cfaq2kkp/{z}/{x}/{y}.png', {
        detectRetina:true
    })


    //Load map and first layer
    var map = L.map('map', {
        layers: [windbreaker],
        maxZoom: 20,
        detectRetina:true,
        zoomControl: false,
        attributionControl: false,
        reuseTiles:true,
        updateWhenIdle:true,
        unloadInvisibleTiles:true
    });


    //Create array of layers
    var baseLayers = {
        'Windbreaker': windbreaker,
        'Terrain': terrain,
        'Afternoon': afternoon
    };


    //Add layer switcher to map
    L.control.layers(baseLayers).addTo(map);


    //Create a custom 'on the users location found' function
    function onLocationFound(e) {
        L.marker(e.latlng).addTo(map)
            .bindPopup('You are here').openPopup();
    }


    //Create a custom 'on the users location not found' function
    function onLocationError(e) {
        //Default location
        map.setView([37.7853, -122.4319],14)

        //Alert the user to turn on their location settings
        navigator.notification.alert(
            'Make sure your location settings are enabled',  // message
            null,                                            // callback
            'Woops!',                                        // title
            'Done'                                           // buttonName
        );
    }

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    map.locate({setView: true, maxZoom: 21});

    //Place marker function
    function placeMarker (e){
        var content = "<div class='content'><button class='open-camera'>Take a Photo</button></div>";

        L.marker(e.latlng).addTo(map)
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

    $('#arrow, #arrow-text').onpress(function(){

        var options = { frequency: 100 };  // Update every 3 seconds
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

}
onDeviceReady();