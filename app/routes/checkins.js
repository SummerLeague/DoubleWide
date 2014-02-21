// Setup ========================================================================
var Checkin     = require('app/models/checkin'),
		User        = require('app/models/user'),
		Venue       = require('app/models/venue'),
    requireAuth = require("app/middleware/").requireAuth;


// Controllers ==================================================================
function index(req, res) {
  // TODO/DISCUSS: Not incredibly happy with this API design. Feel like the route should be more explicit...
  //   i.e.; scoped to a user or a venue rather than taking ids for either as URL params...
  var user_id = req.param('user_id'),
      foursquare_id = req.param('foursquare_id');

  var callback = function(err, response) {
    if (!response) {
      // TODO: Make this better.
      //   Response should at least contain an empty object here. Hence the 500.
      return res.send(500);
    }
    return res.send(200, response);
  }

  if (user_id) {
    User.findById(user_id, function (err, user) {
      if (!user) {
        return res.send(422, { error: "No user found for that user id." });
      }
      user.checkins({ page: req.param('page'), perPage: req.param('per_page') }, callback);
    });
  }
  else if (foursquare_id) {
    Venue.findByFoursquareId(foursquare_id, function (err, venue) {
      if (!venue) {
        return res.send(422, { error: "No venue found for that foursquare id." });
      }
      venue.checkins({ page: req.param('page'), perPage: req.param('per_page') }, callback);
    });
  }
  else {
    res.send(422, {
      error: "Must provide a valid id for a venue or a user."
    });
  }
}

function show(req, res) {
  Checkin.load(req.params.checkin_id, function(err, checkin){
    if (!checkin) {
      return res.send(404);
    }
    return res.send(200, {
      checkin: checkin
    });
  });
}

function create(req, res) {
	var checkin = new Checkin();
	checkin.creator = req.user;
  checkin.loc = [req.body.lng, req.body.lat];

  checkin.setVenueAndSave(req.body.foursquare_id, function (err, checkin) {
    if (!checkin) {
      return res.send(422, {
        error: err
      });
    }
    return res.send(200, {
      checkin: checkin
    });
  })
};


// Exports ======================================================================
module.exports = function(app) {
  app.get('/api/checkins', index);
  app.get('/api/checkins/:checkin_id', show);
  app.post('/api/checkins', requireAuth, create);
}