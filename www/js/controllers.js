/* globals angular ionic cordova */

angular.module('RelayAppTest.Controllers', ['ngCordova', "ionic"])
  .controller('HomeCtrl', function($cordovaPush, $rootScope, $scope, localstorage) {

    $scope.platformReady = false;

    $scope.registering = false;
    $scope.androidConfig = localstorage.getObject("androidConfig") || {
      senderID: "326002124099"
    };
    $scope.registered = localstorage.getObject("androidRegistration");

    $scope.messages = [];

    ionic.Platform.ready(function() {
      log("platform ready!");
    });

    $scope.register = function() {
      localstorage.setObject("androidConfig", $scope.androidConfig);

      $scope.registering = true;
      try {
        $cordovaPush.register($scope.androidConfig).then(function(result) {
          // Success
          log("registration successful (" + result + ")");
          $scope.registering = false;
        }, function(err) {
          log("registration error (" + err + ")", 2);
          $scope.registering = false;
        });
      }
      catch (ex) {
        log("registration exception (" + ex + ")", 2);
        $scope.registering = false;
      }
    };

    $scope.copyToClipboard = function(text) {

      cordova.exec(function() {
          alert("copied to clipboard");
        }, function() {
          alert("error while copying to clipboard");
        }, "Clipboard", "copy", [text]);

    };

    $scope.$on('$cordovaPush:notificationReceived', function(event, notification) {
      switch (notification.event) {
        case 'registered':
          if (notification.regid.length > 0) {
            log('registration completed');
            log(notification.regid);
            $scope.registered = {
              senderID: $scope.androidConfig.senderID,
              targetCode: notification.regid
            }
            localstorage.setObject("androidRegistration", $scope.registered);
          }
          break;

        case 'message':
          // this is the actual push notification. its format depends on the data model from the push server
          log("push arrived!")
          log('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
          break;

        case 'error':
          log('GCM error = ' + notification.msg, 2);
          break;

        default:
          log('An unknown GCM event has occurred: ' + notification.event, 1);
          break;
      }
    });

    function log(text, level) {
      if (!angular.isDefined(level)) {
        level = 0;
      }
      var message = {
        text: text,
        level: level
      };
      $scope.messages.push(message);
    }

  });
