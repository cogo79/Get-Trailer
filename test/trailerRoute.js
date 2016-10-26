"use strict";

const assert = require('assert');

var request = require('request-json');
var ViaPlay = request.createClient('http://localhost:3000/trailer/');

describe("Test trailer route", function() {
	const TED_2_TRAILER = 'https://www.youtube.com/watch?v=S3AVcCggRnU';
	var responseTime;
	it("Check that you get url "+TED_2_TRAILER+" from \"ted-2-2015\"", function(done) {
		responseTime = new Date().getTime();
		ViaPlay.post('/trailer',{
			trailer: 'https://content.viaplay.se/pc-se/film/ted-2-2015'
		}, function(err, res, body) {
			assert(body === TED_2_TRAILER);
			responseTime = new Date().getTime() - responseTime;
			console.log("First response time: ", responseTime);
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
			assert(body === TED_2_TRAILER);
			console.log("Next response time: ", nextResponseTime);
			done();
		});
	});

	it("The first of the two previous tests took x milliseconds. The next took y milliseconds. This test will make sure that the second test is faster than the first because of the caching functionality.", function(done) {
		assert(nextResponseTime < responseTime);
		done();
	});
});
