'use strict';

/**
 * @ngdoc function
 * @name birthdayAppApp.controller:SpecialCtrl
 * @description
 * # SpecialCtrl
 * Controller of the birthdayAppApp
 */
angular.module('birthdayAppApp')
  .controller('SpecialCtrl', function ($scope, $rootScope, $sessionStorage, UserFactory) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var User = $sessionStorage.User || $rootScope.User

    if(!(User instanceof UserFactory)){
      User = new UserFactory(User);
    }

    $scope.user = User;

    User.myFacebookProfile(function (err,response) {
      console.log(response);
    })

  });
