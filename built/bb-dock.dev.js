//     bb-dock
//     (c) simonfan
//     bb-dock is licensed under the MIT terms.

/**
 * @module bb-dock
 * @submodule $el.dock
 */

/* jshint ignore:start */

/* jshint ignore:end */

define('bb-dock',['require','exports','module','lodash','subject','backbone'],function (require, exports, module) {
	

	var _ = require('lodash'),
		subject = require('subject'),
		Backbone = require('backbone');

	/**
	 * The constructor for the dock object.
	 *
	 * @method dock
	 * @constructor
	 * @param options
	 *     @param [attachment] {Object}
	 *         Optionally provide a attachment that will initially fill the $el.
	 */
	var dock = module.exports = subject({
		initialize: function initialize(options) {
			this.initializeBbDock(options);
		},

		initializeBbDock: function initializeBbDock(options) {

			if (options && options.attach) {
				this.attach(options.attach);
			}
		},

		/**
		 *
		 *
		 *
		 * @method invoke
		 * @param method
		 * @params [arguments]
		 */
		invoke: function invoke(method) {
			if (this.attachment) {

				var args = Array.prototype.slice.call(arguments, 1);

				return this.attachment[method].apply(this.attachment, args);

			} else {
				throw new Error('No attachment attached to dock. Unable to invoke ' + method);
			}
		},


		retrieve: function retrieve(property) {
			if (this.attachment) {

				return this.attachment[property];

			} else {
				throw new Error('No attachment attached to dock. Unable to retrieve ' + property);
			}
		},
		/**
		 *
		 *
		 *
		 */
		attach: function attach(attachment, options) {

			this.detach();

			this.attachment = attachment;

			this.listenTo(attachment, 'all', this.trigger);

			// trigger attach event.
			if (!options || !options.silent) {
				this.trigger('attach', attachment);
			}

			return this;
		},

		/**
		 *
		 *
		 * @method detach
		 */
		detach: function detach(options) {
			if (this.attachment) {

				var attachment = this.attachment;

				// Stop listening to all events from the attachment.
				this.stopListening(attachment);

				// unset this.attachment
				delete this.attachment;

				// trigger detach event
				if (!options || !options.silent) {
					this.trigger('detach', attachment);
				}
			}

			return this;
		},
	});


	// static methods
	dock.extendProxyMethods = function extendProxyMethods(methodNames) {


		// object to hold the methods
		var methods = {};

		_.each(methodNames, function (method) {
			methods[method] = _.partial(dock.prototype.invoke, method);
		});

		// create an extended dock
		return this.extend(methods);
	};


	// let dock inherit from Backbone.Events
	dock.proto(Backbone.Events);


	// model dock
	var modelDock = dock
		// the proxy methods for model
		.extendProxyMethods([
			'get', 'set', 'escape', 'has', 'unset', 'clear',
			'toJSON',
			'sync', 'fetch', 'save', 'destroy',
			'validate', 'isValid',
			'url',
			'parse',
			'clone', 'isNew',
			'hasChanged', 'changedAttributes',
			'previous', 'previousAttributes',

			// underscore methods
			'keys', 'values', 'pairs', 'invert', 'pick', 'omit',
		]);

	dock.model = modelDock;

	// collection dock
	var collectionDock = dock
		// the proxy methods for collection
		.extendProxyMethods([
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

	dock.collection = collectionDock;
});

