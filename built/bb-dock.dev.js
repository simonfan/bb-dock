//     bb-dock
//     (c) simonfan
//     bb-dock is licensed under the MIT terms.

/**
 * @module bb-dock
 * @submodule $el.dock
 */

/* jshint ignore:start */

/* jshint ignore:end */

define('__bb-dock/base',['require','exports','module','dock','backbone'],function (require, exports, module) {
	

	var dock     = require('dock'),
		Backbone = require('backbone');




	/**
	 * The base dock constructor for backbone data stuff.
	 * Deals with attaching and detaching.
	 *
	 * @param  {[type]} model        [description]
	 * @param  {[type]} options)     {						this.listenTo(model, 'all',             this.trigger);						if (!options                         ||              !options.silent) {				this.trigger('attach', model,           options);			}		}           [description]
	 * @param  {[type]} afterDetach: function                     afterDetach(model, options)               {						this.stopListening(model, 'all');						if (!options        ||                           !options.silent) {				this.trigger('detach', model,        options [description]
	 * @return {[type]}              [description]
	 */
	var bbDock = module.exports = dock.extend({

		/**
		 * Immediately after the item (model/collection) is attached,
		 * let dock listen to the 'all' event
		 * and trigger events.
		 *
		 * @method afterAttach
		 * @param  {[type]} item   [description]
		 * @param  {[type]} options [description]
		 * @return {[type]}         [description]
		 */
		afterAttach: function afterAttach(item, options) {

			// trigger events on all events of the item.
			this.listenTo(item, 'all', this.trigger);

			// trigger attach event.
			// trigger change event: A
			// ATTENTION - none of these events is triggered on the attached item
			//             itself, but only on the dock object.
			//             That means that this 'change' event won't trigger
			//             any listeners listening to the model/collection.
			//             (which is awesome :)
			if (!options || !options.silent) {
				this.trigger('change', item, options);
				this.trigger('attach', item, options);
			}

		},

		/**
		 * Immediately after the item (model/collection) is detached,
		 * stop listening to the 'all' event.
		 *
		 * @method afterDetach
		 * @param  {[type]} item    [description]
		 * @param  {[type]} options [description]
		 * @return {[type]}         [description]
		 */
		afterDetach: function afterDetach(item, options) {
			// remove event listeners
			this.stopListening(item, 'all');


			// trigger detach event.
			if (!options || !options.silent) {
				this.trigger('change', item, options);
				this.trigger('detach', item, options);
			}

		},
	});

	// events
	bbDock.assignProto(Backbone.Events);
});

//     bb-dock
//     (c) simonfan
//     bb-dock is licensed under the MIT terms.

/**
 * @module bb-dock
 * @submodule $el.dock
 */

/* jshint ignore:start */

/* jshint ignore:end */

define('bb-dock',['require','exports','module','backbone','./__bb-dock/base'],function (require, exports, module) {
	

	var Backbone = require('backbone');

	var bbDock = require('./__bb-dock/base');


	/**
	 * Dock for models.
	 * Proxies all API explicit methods and properties.
	 *
	 * modelDock
	 * @type {[type]}
	 */
	var modelDock = exports.model = bbDock.extend({

		initialize: function initialize(options) {
			bbDock.prototype.initialize.call(this, options);

			this.initializeModelDock(options);
		},

		initializeModelDock: function initializeModelDock(options) {

			if (!this.model) {
				this.attach(new Backbone.Model());
			}
		},



		attachmentAttribute: 'model',
	});

	// proxies

	// proxy methods
	modelDock.defineProxies([
		'get', 'set', 'escape', 'has', 'unset', 'clear',
		'toJSON',
		'sync', 'fetch', 'save', 'destroy',
		'keys', 'values', 'pairs', 'invert', 'pick', 'omit',
		'validate', 'isValid',
		'url',
		'parse',
		'clone', 'isNew',
		'hasChanged', 'changedAttributes',
		'previous', 'previousAttributes'
	]);

	// proxy properties
	modelDock.defineProxies([
		'id', 'idAttribute', 'cid', 'attributes',
		'changed', 'defaults',
		'validationError',
		'urlRoot',
	]);

	// collection dock
	var collectionDock = exports.collection = bbDock.extend({

		initialize: function initialize(options) {
			bbDock.prototype.initialize.call(this, options);

			this.initializeCollectionDock(options);
		},

		initializeCollectionDock: function initializeCollectionDock(options) {

			if (!this.collection) {
				this.attach(new Backbone.Collection());
			}
		},


		attachmentAttribute: 'collection',
	});
		// the proxy methods for collection
	collectionDock.defineProxies([
		'toJSON', 'sync',
		'add', 'remove', 'reset', 'set',
		'get', 'at', 'push', 'pop', 'unshift', 'shift',
		'slice', 'sort', 'pluck', 'where', 'findWhere',
		'parse', 'clone', 'fetch', 'create',

		// underscore methods
		'forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
		'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
		'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
		'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
		'tail', 'drop', 'last', 'without', 'difference', 'indexOf', 'shuffle',
		'lastIndexOf', 'isEmpty', 'chain', 'sample', 'partition'
	]);
});

