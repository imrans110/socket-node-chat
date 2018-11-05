(function () {
    'use strict';
    angular.module('SocketChat', []).controller('SocketChatController', SocketChatController)
        .config(['$locationProvider', function ($locationProvider) {
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        }])
    /** @ngInject */
    function SocketChatController($scope, $http, $timeout, $location) {
        $scope.message = '';
        $scope.messageThread = [];

        var socket = io();
        socket.on('connect', function() {
            console.log("Connected to server");
        });

        socket.on("newMessage", function(message) {
            console.log('New Message', message);
            $scope.messageThread.push(message);
            $scope.$apply();
        });

        socket.on("newLocationMessage", function(message) {
            console.log('New Location Message', message);
            $scope.messageThread.push(message);
            $scope.$apply();
        });

        socket.on('disconnect', function(){
            console.log("Disconnected from server");
        });

        $scope.sendLocation = function(){
            if(!navigator.geolocation){
                return alert('Your browser does not support Geoloaction')
            }
            navigator.geolocation.getCurrentPosition(function(position){
                console.log(position, 'from geolocation');
                socket.emit('createLocationMessage', {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            }, function(){
                alert('Unable to fetch location');
            })  
        };

        $scope.sendMessage = function(text) {
            socket.emit('createMessage', {
                text: text,
                from: "Mujja"
            }, function(data) {
                console.log(data);
            });
            $scope.message = '';
        }

    }
})();