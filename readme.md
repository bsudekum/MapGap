# MapGap
MapGap is a tutorial designed to get you familiarized with creating mapping apps with PhoneGap.

## Table of Contents
* Phonegap
* Getting Started
* Tutorial

## Phonegap

### What is Phonegap?
Phonegap is an opensource project that allows you to make cross platform apps using your existing knowledge of web technologies (HTML, CSS and JavaScript).

### What platforms does Phonegap cover?
Phonegap currently works with:
* Android
* BlackBerry
* iOS
* Symbian
* WebOS
* Windows Phone 7
* Windows Phone 8
* Windows 8
* Bada
* Tizen

### Why Phonegap?
Previously to Phonegap, if a team wanted to launch their iOS app on Android, the app would have to be completely rewritten in Java. With Phonegap, projects can share the same code base making it easy to launch an app on multiple operating systems. Also, you do not need to learn a new language- Phonegap is all HTML, CSS, and JavaScript :+1:.  PG is essentially a webview which makes it very easy to debug and test.

### How is the performance?
The perforamce can be great. There are best practices however to get your Phonegap app to feel native that we will cover in this tutorial.

### Do I have access to the same features as a native app?
Yes, you have access to all the phones features- camera, gps, contacts, accelomater etc.

## Getting started
Before we begin, decide which platform you would like to get started with and set up your developer environment. In this tutorial, I will cover Android and iOS support. Follow the instructions PG provides [here](http://docs.phonegap.com/en/2.7.0/guide_getting-started_index.md.html#Getting%20Started%20Guides). Note: This is probably the most frustrating portion of this tutorial but do not get discouraged! Make sure to follow the instructions carefully. Here are some caveats I found:

* When creating an Android project, the path to the project folder cannot already exist. You are making the new folder in the path. Example:
```
./create ~/Documents/projects/MapGap-folder com.MapBox.MapGap MapGap
```
In this example MapGap-folder does not exist before running `./create`

* If after opening your Android project in Eclipse for the first time, your project has a red X indicating there is a problem follow these additional steps:

	* Right click on the project folder.
	* In the Properties dialog that is displayed select Android from the navigation pane.
	* For the project build target select the highest Android API level you have installed.
	* Click OK
	* Then from the Project menu bar item select Clean.
	* This should correct all the errors in the project.

### Hello World
Every time you generate a new PG project, it comes with a simple hello world app that tells you the API is 'talking' to your device. Once you have setup your environment, it will be time to run the hellow world app. For iOS I recommend running the app in the simulator and for Android I recommend running it on your device. I found the Android simulator to be painstakingly slow and it was much easier to plug in your phone and run it there. Apple makes it a little more difficult to an app on a personal device and it will also require membership in Apple's [iOS Deverloper Program](https://developer.apple.com/programs/ios/).

### Replace www Folder
The `www` folder is the heart and soul of the app and where you will spend the majority of your time while working on your app. The HTML, CSS an JavaScript lives here and also the `index.html` which loads the app initially. Download MapGap and replace the css folder, index.html and the js folder. Do not replace the `cordova-2.7.0.js` file as that is specific for each platform. Also note, that this tutorial is only guaranteed with cordova 2.7 as this was the most recent stable build when written. Once the files are replaced run the app.

### About the API
PG runs once `document.addEventListener('deviceready', onDeviceReady, false);` is invoked. If there is a connection between cordova and your device the function `onDeviceReady()` which contains all your JS. In this function you can do things like get the [camera](http://docs.phonegap.com/en/2.7.0/cordova_camera_camera.md.html#Camera):

```
navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
	destinationType: Camera.DestinationType.DATA_URL
 }); 

function onSuccess(imageData) {
  var image = document.getElementById('myImage');
  image.src = "data:image/jpeg;base64," + imageData;
}

function onFail(message) {
	alert('Failed because: ' + message);
}
```
Or get access to the devices [accelerometer](http://docs.phonegap.com/en/2.7.0/cordova_accelerometer_accelerometer.md.html#Accelerometer):

```
function onSuccess(acceleration) {
  alert('Acceleration X: ' + acceleration.x + '\n' +
    'Acceleration Y: ' + acceleration.y + '\n' +
    'Acceleration Z: ' + acceleration.z + '\n' +
    'Timestamp: '      + acceleration.timestamp + '\n');
};

function onError() {
	alert('onError!');
};

navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
```
As you can see, these are very simple yet powerful JS functions that give you access to all the features the phone offers. **These functions are also the same across all devices** so you do not need to rewrite a function for iOS or Android.

## Onto Mapping
There are many mapping products out there that allow you to make apps on your device, some work better than others. Recently [MapBox.js V1](http://www.mapbox.com/mapbox.js/) was released which is built ontop of [Leaflet](http://leafletjs.com) which works *very* well on mobile devices. Tiles load smoothly, it has some support of touch related events and panning is good. Let's now talk about how to get the most out of you mobile map.

### Best Practices
There are many small things can make a huge difference in how your app performances and feels.

#### 300 millisecond delay
On some mobile webviews, there is a 300ms delay after the user taps the screen. The browser is waiting to see if the user does a double tap, but in reality, this 300ms delay makes the app feel less responsive. To overcome this, I use a library built ontop of [Zepto.js](http://zeptojs.com/) called [Zepto onpress](http://maxdegterev.name/javascript-2/fast-buttons-for-webapps/) which removes the wait. It is incredible how much better the app feels after including this. Also, I chose to use Zepto to jQuery because of its smaller footprint, it works very well with webkit browsers and also Phonegap.


#### User tap select issues
There are 3 important lines of CSS to include
* Prevent the user from select an item. This most of the time, you do not need the user to be able to select text or an image: `-webkit-user-select: none;`
* Prevent webkit from resizing text to fit: `-webkit-text-size-adjust: none;`
* Prevent the default webkit tap color: `-webkit-tap-highlight-color: rgba(0,0,0,0);`


#### Remove clutter from the map
Zoom controls are overkill and attribution does not need to be directly on the map. Removing these items from the screen opens up the map.
```
	var map = L.map('map', {
	  zoomControl: false,
	  attributionControl: false,
    });
```
#### Retina Tiles
More so than not, a mobile device will have a 'retina display'. Supporting these devices when you are able to makes your app look and feel good accross all devices. [MapBox](http://mapbox.com) makes tiles with labels that are 2 times the normal amount. This is because MapBox.js shrinks the tiles by half when (256px to 128px) so the labels need to compensate in size to remain legiable. 

![](https://tiles.mapbox.com/v3/bobbysud.map-2pkc4w2f/3/4/3.png)
![](https://tiles.mapbox.com/v3/bobbysud.map-tyt3admo/3/4/3.png)
> 1x on left, 2x on right

MapBox.js includes a function that will load retina tiles if the screen is retina:
```
var map = L.map('map')
    .setView([37, -77], 5)
    .addLayer(L.mapbox.tileLayer('examples.map-20v6611k', {
        detectRetina: true,
        retinaVersion: 'examples.map-zswgei2n'
    }));
```

#### Viewport
Scaling the viewport makes the items in the screen proportional for smaller screens. Including this one line in your head of code makes huge difference
```
<meta name='viewport' content='user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi' />
```