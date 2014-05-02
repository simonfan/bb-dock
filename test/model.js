(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'../src' :
		// browser
		'bb-dock',
		// dependencies for the test
		deps = [mod, 'should', 'backbone'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(bbDock, should, Backbone) {
	'use strict';


	describe('property retrieval', function () {

		it('backbone model object properties may be retrieved through dock methods', function () {

			var melancia = new Backbone.Model({
					id: 1,
					name: 'melancia',
					colors: ['red', 'green']
				}),
				banana = new Backbone.Model({
					id: 5,
					name: 'banana',
					colors: ['yellow', 'green']
				});

			var dock = bbDock.model();

			dock.attach(melancia);
				dock.retrieve('id').should.eql(melancia.id);
				dock.retrieve('cid').should.eql(melancia.cid);

			dock.attach(banana);
				dock.retrieve('id').should.eql(banana.id);
				dock.retrieve('cid').should.eql(banana.cid);
		});
	});

	describe('method invocation', function () {

		it('backbone model object methods should be invocable through dock methods', function () {

			var melancia = new Backbone.Model({
					id: 1,
					name: 'melancia',
					colors: ['red', 'green']
				}),
				banana = new Backbone.Model({
					id: 5,
					name: 'banana',
					colors: ['yellow', 'green']
				});

			var dock = bbDock.model();

			dock.attach(melancia);
				dock.get('colors').should.eql(melancia.get('colors'));
				dock.set('name', 'Watermelon');
				melancia.get('name').should.eql('Watermelon');

			dock.attach(banana);
				dock.get('colors').should.eql(banana.get('colors'));
				dock.set('name', 'yellow fruit');
				melancia.get('name').should.eql('Watermelon');
				banana.get('name').should.eql('yellow fruit');
		});
	});


	describe('events', function () {

		it('proxies events from the model', function () {

			var melancia = new Backbone.Model({
					name: 'melancia',
					colors: ['red', 'green']
				}),
				banana = new Backbone.Model({
					name: 'banana',
					colors: ['yellow', 'green']
				});

			var fdock = bbDock.model({
				attach: melancia
			});


			// control variable
			var control = 'unchanged';

			// listen to proxied event
			// (change:colors is triggered on the model, and proxied to the dock-view)
			fdock.on('change:colors', function (model) {
				control = model.get('colors');
			});

			// change colors of melancia
			melancia.set('colors', ['gray', 'brown']);
			control.should.eql(['gray', 'brown']);

			// detach melancia
			fdock.attach(banana);
			// change colors on melancia
			melancia.set('colors', ['red', 'blue']);
			// control should remain unchanged
			control.should.eql(['gray', 'brown']);
			// change colors on banana
			banana.set('colors', ['green', 'pink']);
			// control should have changed
			control.should.eql(['green', 'pink']);
		});
	});
});
