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

	var bbDock = require('./__bb-dock/base');


	/**
	 * Dock for models.
	 * Proxies all API explicit methods and properties.
	 *
	 * modelDock
	 * @type {[type]}
	 */
	var modelDock = exports.model = bbDock.extend({
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
