'use strict';

/**
 * @ngdoc function
 * @name birthdayAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the birthdayAppApp
 */
angular.module('birthdayAppApp')
  .controller('MainCtrl', function ($scope, Facebook) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.isLoggedIn = false;

    $scope.login = function() {
      // From now on you can use the Facebook service just as Facebook api says
      Facebook.login(function(response) {
        Facebook.api('/me',function (response) {
          $scope.isLoggedIn = true;
          $scope.user = response;
          console.log(response);
        })
        Facebook.api('/me/photos',function  (response) {
          console.log(response);
          $scope.photos = response;
        })
      },{scope:'public_profile,user_birthday,user_photos'});
    };

    $scope.getLoginStatus = function() {
      Facebook.getLoginStatus(function(response) {
        if(response.status === 'connected') {
          $scope.loggedIn = true;
        } else {
          $scope.loggedIn = false;
        }
      });
    };

    $scope.logout = function () {
      Facebook.logout(function (response) {
        console.log(response);
        $scope.isLoggedIn = false;
      })
    }

    $scope.me = function() {
      Facebook.api('/me', function(response) {
        $scope.user = response;
      });
    };

});
