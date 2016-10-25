var express = require('express');
var router = express.Router();
var request = require('request-json'),
Promise = require('Promise');

const VIAPLAYURL = "https://content.viaplay.se/pc-se/film";

var ViaPlay = request.createClient(VIAPLAYURL);
Promise.denodeify(ViaPlay.get);

/* GET users listing. */
router.post('/', function(req, res, next) {
	var client;
	if (req.body.trailer.startsWith(VIAPLAYURL)) {
		client = ViaPlay;
	}

	if (client) {
		console.log(req);
		client.get(req.body.trailer).then(function(resViaPlay) {
			
			res.send(resViaPlay.body._embedded["viaplay:blocks"][0]._embedded["viaplay:product"].content.imdb);

		}, function(error) {
			res.sendStatus(500);
		});
	} else {
		res.sendStatus(406);
	}
	
	

});


module.exports = router;
