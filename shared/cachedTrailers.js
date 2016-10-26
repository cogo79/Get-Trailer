var Promise = require('promise');

var trailers = new Map();

module.exports = {
	add: function(key, url) {
		var promise = new Promise(function (resolve, reject) {
			try {
				trailers.set(key, url);
				resolve(true);
			} catch(error) {
				reject(error);
			}
		});
		return promise;
	},
	get: function(key) {
		var promise = new Promise(function (resolve, reject) {
			try {
				var url = trailers.get(key);
				resolve(url);	
			} catch(error) {
				reject(error);
			}
			
		});
		return promise;
	},
	deleteAll: function() {
		var promise = new Promise(function (resolve, reject) {
			try {
				trailers = new Map();
				resolve(true);	
			} catch(error) {
				reject(error);
			}
			
		});
		return promise;
	},
	getCount: function() {
		return trailers.size;
	}
}







