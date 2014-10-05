'use strict';

/**
 * @ngdoc function
 * @name birthdayAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the birthdayAppApp
 */
angular.module('birthdayAppApp')
  .controller('MainCtrl', function ($scope, Facebook, UserFactory) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var User = new UserFactory();

    $scope.isLoggedIn = false;

    $scope.login = function() {
      // From now on you can use the Facebook service just as Facebook api says
      User.login(function (err,response) {
        if(response.error || !response.authResponse){
          return;
        }
        User.myFacebookProfile(function (err,response) {
          $scope.isLoggedIn = true;
          $scope.user = response;
          if(User.daysUntilBirthday === 0){
            $scope.isBirthday = true;
          } else {
            $scope.isBirthday = false;
            $scope.numberOfDays = User.daysUntilBirthday;
          }
          console.log(response);
        });
        User.photos(function (err,response) {
          console.log(response);
          $scope.photos = response;
        });
      });
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
      User.logout(function (err,response) {
        console.log(response);
        $scope.isLoggedIn = false;
      });
    };

    $scope.me = function() {
      Facebook.api('/me', function(response) {
        $scope.user = response;
      });
    };
});
