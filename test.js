var application;

module('Minimal Application Setup', {
  setup: function() {
    Ember.$("#qunit-fixture").html("<div id='one'><div id='one-child'>HI</div></div><div id='two'>HI</div>");
    return Ember.run(function() {
      application = Ember.Application.create({
        rootElement: '#one'
      });
      return application.initialize();
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
  Ember.$('#qunit-fixture').html('<script type="text/x-handlebars">Hello {{controller.name}}!</script>');
  Ember.run(function() {
    app = Ember.Application.create({
      rootElement: '#qunit-fixture'
    });
  });
  app.ApplicationController = Ember.Controller.extend({
    name: 'Kris'
  });
  Ember.run(function() {
    var stateManager;
    stateManager = Ember.Object.create();
    app.initialize(stateManager);
  });
  equal(Ember.$('#qunit-fixture').text(), 'Hello Kris!');

  Ember.run(function() {
    app.destroy();
  });
});

module('Another Application Setup', {
  setup: function() {
    Ember.$("#qunit-fixture").html("<div id='one'><div id='one-child'>HI</div></div><div id='two'>HI</div>");
    Ember.run(function() {
      application = Ember.Application.create({
        rootElement: '#one'
      });
      application.initialize();
    });
  }
});

test('This fails every other time', function() {
  return ok(Ember, "Ember exists on global namespace");
});
