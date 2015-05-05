/* globals angular */

angular.module('RelayAppTest.Controllers', ['ngCordova'])
    .controller('HomeCtrl', function($cordovaPush, $rootScope, $scope) {

        var androidConfig = {
            "senderID": "webplud3project",
        };

        $scope.registering = false;
        
        $scope.register = function(){
            $scope.registering = true;
            try
            {
            $cordovaPush.register(androidConfig).then(function(result) {
                // Success
                alert('result = ' + result);
                $scope.registering = false;
            }, function(err) {
                // Error
    
                alert('error = ' + err);
                $scope.registering = false;
            });
            }
            catch (ex)
            {
                alert('exception = ' + ex);
                $scope.registering = false;
            }
        };

        $scope.$on('$cordovaPush:notificationReceived', function(event, notification) {
            
            alert("notificationReceived" + angular.toJson(notification));
            
            switch (notification.event) {
                case 'registered':
                    if (notification.regid.length > 0) {
                        alert('registration ID = ' + notification.regid);
                    }
                    break;

                case 'message':
                    // this is the actual push notification. its format depends on the data model from the push server
                    alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
                    break;

                case 'error':
                    alert('GCM error = ' + notification.msg);
                    break;

                default:
                    alert('An unknown GCM event has occurred');
                    break;
            }
        });

    });
