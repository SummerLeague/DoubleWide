// Setup ========================================================================
var Venue = require('app/models/venue');


// Controllers ==================================================================
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
	var lng = req.query.lng,
			lat = req.query.lat;

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


// Exports ======================================================================
module.exports = function(app) {
	app.get('/api/venues', index);
	app.get('/api/venues/search', search);
}