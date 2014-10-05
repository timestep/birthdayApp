"use strict";angular.module("birthdayAppApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","facebook","ngStorage"]).config(["FacebookProvider",function(a){a.init("356467201195014")}]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/special",{templateUrl:"views/special.html",controller:"SpecialCtrl"}).when("/invalid",{templateUrl:"views/invalid.html",controller:"InvalidCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("birthdayAppApp").controller("MainCtrl",["$scope","$location","$rootScope","Facebook","UserFactory","$sessionStorage",function(a,b,c,d,e,f){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"];var g=new e;f.User=g,c.User=g,a.isLoggedIn=!1,a.login=function(){g.login(function(c){return c?(a.isLoggedIn=!1,a.logInError=!0):(a.isLoggedIn=!0,0x5af3b5ac68d4==g.id&&console.log("Not Ready Yet"),0x2411953cea1608==g.id?b.path("/special"):void g.myFacebookProfile(function(b,c){a.user=c,0===g.daysUntilBirthday?a.isBirthday=!0:(a.isBirthday=!1,a.numberOfDays=g.daysUntilBirthday),console.log(c)}))})},a.getLoginStatus=function(){d.getLoginStatus(function(b){a.loggedIn="connected"===b.status?!0:!1})},a.logout=function(){g.logout(function(b,c){console.log(c),a.isLoggedIn=!1})},a.me=function(){d.api("/me",function(b){a.user=b})}}]),angular.module("birthdayAppApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("birthdayAppApp").factory("UserFactory",["Facebook",function(a){function b(a){var b=a.birthday,c=b.split("/"),d=parseInt(c[0]),e=parseInt(c[1]),f=parseInt(c[2]);b=new Date(f,d-1,e);var g,h,i,j,k;g=[e,d],h=new Date,i=new Date(h.getFullYear(),g[1]-1,g[0]),h.getTime()>i.getTime()&&i.setFullYear(i.getFullYear()+1),j=i.getTime()-h.getTime(),k=Math.floor(j/864e5);var l=new Date,m=l.getMonth()+1,n=l.getDate();return parseInt(m)===parseInt(d)&&parseInt(n)===parseInt(e)?0:k}var c=function(a){if("object"==typeof a)for(var b in a)this[b]=a[b]};return c.prototype.login=function(b){var c=this;a.login(function(a){if(a.error||!a.authResponse)return b(!0);for(var d in a)c[d]=a[d];return c.id=a.authResponse.userID,b(null,a)},{scope:"public_profile,user_birthday,user_photos"})},c.prototype.myFacebookProfile=function(c){var d=this;a.api("/me",function(a){for(var e in a)d[e]=a[e];return d.birthday&&(d.daysUntilBirthday=b(d)),c(null,a)})},c.prototype.logout=function(b){var c=this;a.logout(function(a){return c=a,b(null,a)})},c.prototype.photos=function(b){a.api("/me/photos",function(a){return b(null,a)})},c}]),angular.module("birthdayAppApp").controller("SpecialCtrl",["$scope","$rootScope","$sessionStorage","UserFactory",function(a,b,c,d){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"];var e=c.User||b.User;e instanceof d||(e=new d(e)),a.user=e,e.myFacebookProfile(function(a,b){console.log(b)})}]),angular.module("birthdayAppApp").controller("InvalidCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);