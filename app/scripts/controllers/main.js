'use strict';

/**
 * @ngdoc function
 * @name birthdayAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the birthdayAppApp
 */
angular.module('birthdayAppApp')
  .controller('MainCtrl', function ($scope,$location,$rootScope, Facebook, UserFactory, $sessionStorage) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var User = new UserFactory();
    $sessionStorage.User = User;
    $rootScope.User = User;

    $scope.isLoggedIn = false;

    $scope.login = function() {
      // From now on you can use the Facebook service just as Facebook api says
      User.login(function (err,response) {
        if(err){
          $scope.isLoggedIn = false;
          return $scope.logInError = true;
        } 
        $scope.isLoggedIn = true;
        if(User.id == 100002771527892) {console.log("Not Ready Yet")}
        if(User.id == 10152431831356936) {
          return $location.path('/special');
        }
        User.myFacebookProfile(function (err,response) {
          $scope.user = response;
          if(User.daysUntilBirthday === 0){
            $scope.isBirthday = true;
          } else {
            $scope.isBirthday = false;
            $scope.numberOfDays = User.daysUntilBirthday;
          }
          console.log(response);
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
