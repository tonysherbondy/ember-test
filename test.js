var application;

module('Minimal Application Setup', {
  setup: function() {
    return Ember.run(function() {
      application = Ember.Application.create({
        rootElement: '#qunit-fixture'
      });
    });
  },
  teardown: function() {
    if (application) {
      Ember.run(function() {
        application.destroy();
      });
    }
  }
});

test('Ember exists', function() {
  ok(Ember, "Ember exists on global namespace");
});

test("Minimal Application initialized with an application template and injections", function() {
  var app;
  application.ApplicationController = Ember.Controller.extend({
    name: 'Kris'
  });
  application.ApplicationView = Ember.View.extend({
    template: Ember.Handlebars.compile("Hello {{controller.name}}!")
  })  

  Ember.run(function() {
    var stateManager;
    stateManager = Ember.Object.create();
    application.initialize(stateManager);
  });
  equal(Ember.$('#qunit-fixture').text(), 'Hello Kris!');
});

module('Another Application Setup', {
  setup: function() {
    Ember.$("#qunit-fixture").html("<div id='one'><div id='one-child'>HI</div></div><div id='two'>HI</div>");
    Ember.run(function() {
      application = Ember.Application.create({
        rootElement: '#qunit-fixture'
      });
      application.initialize();
    });
  }
});

test('This fails every other time', function() {
  return ok(Ember, "Ember exists on global namespace");
});
