'use strict';

/**
 * @ngdoc service
 * @name birthdayAppApp.User
 * @description
 * # User
 * Factory in the birthdayAppApp.
 */
angular.module('birthdayAppApp')
  .factory('UserFactory', function (Facebook) {

    var User = function(user){
      if(typeof user == 'object'){
        for(var key in user){
          this[key] = user[key];
        }
      } else {
        return;
      }
    };

    User.prototype.login = function (cb) {
      var _this = this;
      Facebook.login(function (response) {
        if(response.error || !response.authResponse){
          return cb(true);
        } else {
          for(var key in response){
            _this[key] = response[key];
          }
          _this.id = response.authResponse.userID;
          return cb(null,response);
        }
      },{scope:'public_profile,user_birthday,user_photos'});
    };

    User.prototype.myFacebookProfile = function (cb) {
      var _this = this;
      Facebook.api('/me',function (response) {
        for(var key in response){
          _this[key] = response[key];
        }
        if(_this.birthday){
          _this.daysUntilBirthday = numberofDayTilBirthday(_this);
        }
        return cb(null,response);
      });
    };

    User.prototype.logout = function (cb) {
      var _this = this;
      Facebook.logout(function (response) {
        _this = response;
        return cb(null,response);
      });
    };

    User.prototype.photos = function (cb) {
      Facebook.api('/me/photos',function  (response) {
        return cb(null,response);
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

    // Public API here
    return User;
  });
