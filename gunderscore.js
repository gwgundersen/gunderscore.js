/* 
 * gunderscore.js
 * 2013-10-15
 * ----------------------------------------------------------------*/


var g_ = (function() {


/* `gunderscore` object
 * ----------------------------------------------------------------*/

	var g_ = {};


/* Collection functions
 *
 * @Fogus: 'Functional programming is extremely useful for tasks
 * requiring that some operation happen on many items in a
 * collection... The point of a collection-centric view... is to a
 * consistent processing idiom so that we can reuse a comprehensive
 * set of functions.'
 * ----------------------------------------------------------------*/

	/* `each` is an immutable iterator. It is the quintessential
	 * example of a functional style. Note that its implementation
	 * uses a `for` loop. Functional programming does not eliminate
	 * imperative concepts; rather, it abstracts them away with a
	 * function. Any loss in performance can be mitigated or
	 * regained by a compressor.
	 */
	var each = g_.each = function(collection, func) {
		var i, len;

		for (i = 0, len = collection.length; i < len; i++) {
			func(i);
		}
	};


	/* `map` calls a function on every value in a collection,
	 * returning a collection of results. Notice how it can use
	 * `each`; we are quickly building upon small abstractions.
	 */
	var map = g_.map = function(collection, func) {
		var result = [];

		each(collection, function(i) {
			result.push( func(collection[i]) );
		});
		
		return result;
	};


	/* `reduce` (or `fold`) calls a function on every value in a
	 * collection, accumulates the result, and returns it.
	 */
	var reduce = g_.reduce = function(collection, func) {
		var result = 0;

		each(collection, function(i) {
			result += func(collection[i]);
		});

		return result;
	};


	/* `filter` calls a predicate function on each item in a
	 * collection, returning a collection of predicates
	 */
	var filter = g_.filter = function(collection, predicate) {
		var result = [];

		each(collection, function(i) {
			if ( predicate(collection[i]) ) {
				result.push( collection[i] );
			}
		});

		return result;
	};


	/* `find` takes a collection and a predicate and returns the
	 * first element for which the predicate returns true
	 */
	g_.find = function(collection, predicate) {
		return filter(collection, predicate)[0];
	};


	/* `not` is the opposite of filter; this feels like it could be
	 * greatly optimized.
	 */
	g_.not = function(collection, predicate) {
		var result = [];

		each(collection, function(i) {
			if ( !predicate(collection[i]) ) {
				result.push( collection[i] );
			}
		});

		return result;
	};


	/* `all` takes a collection and a predicate and returns true if
	 * all of the elements return true on the predicate
	 */
	g_.all = function(collection, predicate) {
		return collection.length === filter(collection, predicate).length;
	};


	/* `any` takes a collection and a predicate and returns true if 
	 * any of the elements return true on the predicate
	 */
	 g_.any = function(collection, predicate) {
	 	return filter(collection, predicate).length > 0;
	 };


/* Utility
 * ----------------------------------------------------------------*/

	/* `identity` returns the value it is passed. This abstraction is
	 * surprisingly important because, since functional programming
	 * focuses on functions rather than values (for configuration),
	 * we often need to pass in `identity`.
	 */
	g_.identity = function(value) {
		return value;
	}


	g_.keys = function(collection) {

	};


	g_.values = function(collection) {

	};


/* Predicates
 *
 * @Fogus: 'Functions that always return a Boolean value are called
 * "predicates."'
 * ----------------------------------------------------------------*/

	/* `isExistential` is a boolean function that returns whether an
	 * element exists (is neither `undefined` nor `null`). Loose
	 * equality makes this a one-liner.
	 */
	g_.isExistential = function(value) {
		return value != null;
	};


	g_.isFunction = function(value) {
		return (typeof value === 'function');
	};


	g_.isNumber = function(value) {
		return !isNaN(value);
	};


	g_.isString = function(value) {
		return (typeof value === 'string');
	};


	/*
	 */
	g_.isTruthy = function(value) {
		return (value !== false) && g_.isExistential(value);
	};



/* Return
 * ----------------------------------------------------------------*/
	return g_;

})();

var items = [1, 2, 3];
var double = function(x) { return x*x; };