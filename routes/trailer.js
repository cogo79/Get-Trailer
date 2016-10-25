var express = require('express');
var router = express.Router();
var request = require('request-json');

const THE_MOVIE_DB_KEY = '0222784cb8d961b26e04d4b2891d8d30';

const VIAPLAYURL = 'https://content.viaplay.se/pc-se/film';
var ViaPlay = request.createClient(VIAPLAYURL);

const IMDB_CLIENT = request.createClient('https://api.themoviedb.org/3/find');
const IMDB_CLIENT_VIDEO = request.createClient('https://api.themoviedb.org/3/movie');


/* GET users listing. */
router.post('/', function(req, res, next) {
	var client;
	if (req.body.trailer.startsWith(VIAPLAYURL)) {
		client = ViaPlay;
	}

	if (client) {
		//console.log(req);
		client.get(req.body.trailer).then(function(responseViaPlay) {
			// https://api.themoviedb.org/3/find/tt2637276?api_key=0222784cb8d961b26e04d4b2891d8d30&language=en-US&external_source=imdb_id
			var movieID = responseViaPlay.body._embedded["viaplay:blocks"][0]._embedded["viaplay:product"].content.imdb.id;
			console.log(movieID);

			var url = 'find/'+movieID+'?api_key='+THE_MOVIE_DB_KEY+'&language=en-US&external_source=imdb_id';

			IMDB_CLIENT.get(url).then(function(responseIMDB) {
				var url = 'movie/'+movieID+'/videos?api_key='+THE_MOVIE_DB_KEY+'&language=en-US';
				IMDB_CLIENT_VIDEO.get(url).then(function(result) {
					console.log(result.body);
					var results = result.body.results;
					for (var i = results.length - 1; i >= 0; i--) {
						var key;
						if (results[i].site === 'YouTube' && results[i].type === 'Trailer') {
							key = results[i].key;
						}
					};
					if (key) {
						var youtubeURL = 'https://www.youtube.com/watch?v='+key;
						res.send(youtubeURL);
					} else {
						res.sendStatus(404);
					}
				}).catch(function(error) {
					res.send(error);
				});
				
			}).catch(function(error) {
				res.send(error);
			});
			

		}).catch(function(error) {
			res.sendStatus(500);
		});
	} else {
		res.sendStatus(406);
	}
	
	

});


module.exports = router;
