'use strict';

describe('Controller: SpecialCtrl', function () {

  // load the controller's module
  beforeEach(module('birthdayAppApp'));

  var SpecialCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SpecialCtrl = $controller('SpecialCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
