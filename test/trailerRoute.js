"use strict";

const assert = require('assert');

var request = require('request-json');
var ViaPlay = request.createClient('http://localhost:3000/trailer/');

describe("Test trailer route", function() {
	const TED_2_TRAILER = 'https://www.youtube.com/watch?v=S3AVcCggRnU';
	var firstResponseTime;
	it("Check that you get url "+TED_2_TRAILER+" from \"ted-2-2015\"", function(done) {
		firstResponseTime = new Date().getTime();
		ViaPlay.post('/trailer',{
			trailer: 'https://content.viaplay.se/pc-se/film/ted-2-2015'
		}, function(err, res, body) {
			firstResponseTime = new Date().getTime() - firstResponseTime;
			console.log("      First response time: ", firstResponseTime);
			assert(body === TED_2_TRAILER);
			done();
		});
	});

	var nextResponseTime;
	it("Same test as the previous.", function(done) {
		nextResponseTime = new Date().getTime();
		ViaPlay.post('/trailer',{
			trailer: 'https://content.viaplay.se/pc-se/film/ted-2-2015'
		}, function(err, res, body) {
			nextResponseTime = new Date().getTime() - nextResponseTime;
			console.log("      Next response time: ", nextResponseTime);
			assert(body === TED_2_TRAILER);
			done();
		});
	});

	it("The first of the two previous tests took x milliseconds. The next took y milliseconds. This test will make sure that the second test is faster than the first because of the caching functionality.", function(done) {
		assert(nextResponseTime < firstResponseTime);
		done();
	});
});
