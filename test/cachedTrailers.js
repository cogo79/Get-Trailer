"use strict";

const assert = require('assert');

var cachedTrailers = require('../shared/cachedTrailers');

describe("Test cachedTrailers.js module", function() {

	it("Check that it is empty", function(done) {
		cachedTrailers.deleteAll().then(function(succes) {
 			var count = cachedTrailers.getCount();
 			assert(count === 0);
 			done();
 		});
	});

 	const TED_2_TRAILER = 'https://www.youtube.com/watch?v=S3AVcCggRnU';
 	const RAMBO_3_TRAILER = 'https://www.youtube.com/watch?v=_e6AwJB6zdE';

 	it("Check that it has trailer for Ted 2", function(done) {
		cachedTrailers.add('Ted 2', TED_2_TRAILER).then(function(succes) {
	 		cachedTrailers.get('Ted 2').then(function(url) {
	 			assert(url === TED_2_TRAILER);
	 			done();
	 		});
		});
	});

 	it("Check that it has trailer for Rambo 3", function(done) {
		cachedTrailers.add('Rambo 3', RAMBO_3_TRAILER).then(function(succes) {
	 		cachedTrailers.get('Rambo 3').then(function(url) {
	 			assert(url === RAMBO_3_TRAILER);
	 			done();
	 		});
		});
	});

	it("Check that there is two cached trailers", function(done) {
 		var count = cachedTrailers.getCount();
		assert(count === 2);
		done();
	});

	it("Check that it is empty again", function(done) {
		cachedTrailers.deleteAll().then(function(succes) {
 			var count = cachedTrailers.getCount();
 			assert(count === 0);
 			done();
 		});
	});
});
