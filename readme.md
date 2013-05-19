# MapGap
MapGap is a tutoial designed to get you familiarized with creating mapping apps with PhoneGap.

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
Before we begin, decide which platform you would like to get started with and set up your developer envirenment. In this tutorial, I will cover Android and iOS support. Follow the instructions PG provides [here](http://docs.phonegap.com/en/2.7.0/guide_getting-started_index.md.html#Getting%20Started%20Guides). Note: This is probably the most frustrating portion of this tutorial but do not get discouraged! Make sure to follow the instructions carefully. Here are some caveats I found:

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
The `wwww` folder is the heart and soul of the app and where you will spend the majority of your time while working on your app. The HTML, CSS an JavaScript lives here and also the `index.html` which loads the app initially. Download MapGap and replace the css folder, index.html and the js folder. Do not replace the `cordova-2.7.0.js` file as that is specific for each platform. Also note, that this tutorial is only guarenteed with cordova 2.7 as this was the most recent stable build when written. Once the files are replaced run the app.

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
As you can see, these are very simple yet powerful JS functions that give you access to all the feautures the phone offers. **These functions are also the same accross all devices** so you do not need to rewrite a function for iOS or Android.

## On To Mapping
There are many 









