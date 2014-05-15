//     bb-dock
//     (c) simonfan
//     bb-dock is licensed under the MIT terms.

/**
 * @module bb-dock
 * @submodule $el.dock
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';

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
