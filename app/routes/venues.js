var Venue = require('app/models/venue');

function index(req, res) {
	return Venue.find(function(err, venues) {
		if(err) {
			return res.send(422, {
				error: err
			});
		}
		return res.send(200, venues);
	});
};

function search(req, res) {
	// TODO/DISCUSS: Consider making these body params so the routing isnt so prone to conflicts with actual resources.
	// TODO: Should probably check lnglat params presence before attempting to operate on it...
	var lng = req.params.lng,
			lat = req.params.lat;
	Venue.findNearCoordinates(lng, lat, function(err, venues) {
		if (err) {
			// TODO: Handle this error more appropriately.
			return res.send(422, {
				error: err
			});
		}
		return res.send(200, venues);
	});
};


function setup(app) {
	app.get('/venues', index);
	app.get('/venues/search', search);
}

module.exports = setup;