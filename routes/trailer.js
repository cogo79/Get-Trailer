var express = require('express');
var router = express.Router();
var request = require('request-json'),
async = require('async'),
cachedTrailers = require('../shared/cachedTrailers');

const THE_MOVIE_DB_KEY = '0222784cb8d961b26e04d4b2891d8d30';

const VIAPLAYURL = 'https://content.viaplay.se/pc-se/film';
var ViaPlay = request.createClient(VIAPLAYURL);

const IMDB_CLIENT = request.createClient('https://api.themoviedb.org/3/find');
const IMDB_CLIENT_VIDEO = request.createClient('https://api.themoviedb.org/3/movie');


/* GET users listing. */
router.post('/', function(req, res, next) {

	cachedTrailers.get(req.body.trailer).then(function(result) {
		if (result) {
			res.send(result);
		} else {
			var client;
			if (req.body.trailer.startsWith(VIAPLAYURL)) {
				client = ViaPlay;
			}

			if (client) {

				async.waterfall([
					function(callback) {
						client.get(req.body.trailer).then(function(responseViaPlay) {
							var movieID = responseViaPlay.body._embedded["viaplay:blocks"][0]._embedded["viaplay:product"].content.imdb.id;

							var url = 'find/'+movieID+'?api_key='+THE_MOVIE_DB_KEY+'&language=en-US&external_source=imdb_id';
							
							callback(null, url);

						}).catch(function(error) {
							callback(error);
						});
					},
					function(url, callback) {
						IMDB_CLIENT.get(url).then(function(responseIMDB) {
							var nextURL = 'movie/'+responseIMDB.body.movie_results[0].id+'/videos?api_key='+THE_MOVIE_DB_KEY+'&language=en-US';
							callback(null, nextURL);
						}).catch(function(error) {
							callback(error);
						});
					},
					function(url, callback) {
						IMDB_CLIENT_VIDEO.get(url).then(function(result) {
							var key;
							var results = result.body.results;
							for (var i = results.length - 1; i >= 0; i--) {
								if (results[i].site === 'YouTube' && results[i].type === 'Trailer') {
									key = results[i].key;
									break;
								}
							};
							if (key) {
								var youtubeURL = 'https://www.youtube.com/watch?v='+key;
								callback(null, youtubeURL);
							} else {
								callback(404);
							}
						}).catch(function(error) {
							callback(error);
						});
					},
					function(result, callback) {
						cachedTrailers.add(req.body.trailer, result).then(function(succes) {
							callback(null, result);
						});
					}
				], function (error, result) {
					if (error) {
						if (typeof error === 'number') {
							res.sendStatus(error);
						} else {
							res.send(error);
						}
					} else {
						res.send(result);
					}
				});
			} else {
				res.sendStatus(406);
			}
		}
	});
});


module.exports = router;
