var pushNotification;

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

    pushNotification = window.plugins.pushNotification;


    function successHandler(result) {
      alert('result = ' + result);
    }

    function errorHandler(error) {
      alert('error = ' + error);
    }

    pushNotification.register(
      successHandler,
      errorHandler, {
        "senderID": "webplud3project",
        "ecb": "onNotification"
      });
  });
});

function onNotification(e) {
  switch (e.event) {
    case 'registered':
      if (e.regid.length > 0) {
        console.log("Regid " + e.regid);
        alert('registration id = ' + e.regid);
      }
      break;

    case 'message':
      // this is the actual push notification. its format depends on the data model from the push server
      alert('message = ' + e.message + ' msgcnt = ' + e.msgcnt);
      break;

    case 'error':
      alert('GCM error = ' + e.msg);
      break;

    default:
      alert('An unknown GCM event has occurred');
      break;
  }
}