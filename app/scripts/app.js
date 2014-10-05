'use strict';

/**
 * @ngdoc overview
 * @name birthdayAppApp
 * @description
 * # birthdayAppApp
 *
 * Main module of the application.
 */
angular
  .module('birthdayAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'facebook',
    'ngStorage'
  ])
  .config(function(FacebookProvider) {
     // Set your appId through the setAppId method or
     // use the shortcut in the initialize method directly.
     // FacebookProvider.init('356467201195014');
     FacebookProvider.init('356471304527937'); //test
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/special', {
        templateUrl: 'views/special.html',
        controller: 'SpecialCtrl'
      })
      .when('/invalid', {
        templateUrl: 'views/invalid.html',
        controller: 'InvalidCtrl'
      })
      .when('/placeholder', {
        templateUrl: 'views/placeholder.html',
        controller: 'PlaceholderCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });