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
        console.log(response);
        if(response.error || !response.authResponse){
          return;
        }
        Facebook.api('/me',function (response) {
          $scope.isLoggedIn = true;
          $scope.user = response;
          var numberOfDays = numberofDayTilBirthday($scope.user);
          if(numberOfDays === 0){
            $scope.isBirthday = true;
          } else {
            $scope.isBirthday = false;
            $scope.numberOfDays = numberOfDays;
          }
          console.log(response);
        });
        Facebook.api('/me/photos',function  (response) {
          console.log(response);
          $scope.photos = response;
        });
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
      });
    };

    $scope.me = function() {
      Facebook.api('/me', function(response) {
        $scope.user = response;
      });
    };

    function numberofDayTilBirthday(user){
      var birthday = user.birthday;
      var birthdayArray = birthday.split('/');
      var birthdayMonth = parseInt(birthdayArray[0]);
      var birthdayDay = parseInt(birthdayArray[1]);
      var birthdayYear = parseInt(birthdayArray[2]);
      birthday = new Date(birthdayYear,birthdayMonth-1,birthdayDay);

      var myBirthday, today, bday, diff, days;
      myBirthday = [birthdayDay,birthdayMonth]; // 6th of February
      today = new Date();
      bday = new Date(today.getFullYear(),myBirthday[1]-1,myBirthday[0]);
      if( today.getTime() > bday.getTime()) {
        bday.setFullYear(bday.getFullYear()+1);
      }
      diff = bday.getTime()-today.getTime();
      days = Math.floor(diff/(1000*60*60*24));

      var now = new Date();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      // var year = now.getFullYear();

      if(parseInt(month) === parseInt(birthdayMonth) && parseInt(day) === parseInt(birthdayDay)){
        return 0;
      } else {
        return days;
      }
    }

});
