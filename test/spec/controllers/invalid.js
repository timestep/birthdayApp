'use strict';

describe('Controller: InvalidCtrl', function () {

  // load the controller's module
  beforeEach(module('birthdayAppApp'));

  var InvalidCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InvalidCtrl = $controller('InvalidCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
