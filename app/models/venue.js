// Setup ========================================================================
var mongoose   = require('mongoose'),
		Schema     = mongoose.Schema,
		extend     = require('node.extend'),
		foursquare = (require('foursquarevenues'))(process.env.FOURSQUARE_KEY, process.env.FOURSQUARE_SECRET);


// Schema =======================================================================
var VenueSchema = new Schema({
	foursquare_id: { type: String, required: true },
});


// Class Methods ================================================================
VenueSchema.statics = extend({

	findOrCreateByFoursquareId: function(foursquare_id, callback) {
		var self = this;
		this.findOne({ foursquare_id: foursquare_id }, function(err, venue) {
			if (!venue) {
				var new_venue = new self({
					foursquare_id: foursquare_id
				});
				new_venue.save(function (err, venue) {
					callback(err, venue);
				});
			}
			else {
				callback(null, venue);
			}
		});
	},

	findNearCoordinates: function(lng, lat, callback) {
		var self = this;
		var params = {
        "ll": [lat, lng].join(",")
    };

    foursquare.getVenues(params, function(err, venues) {
        callback(err, venues);
    });
	}

}, VenueSchema.statics);


// Instance Methods =============================================================
VenueSchema.methods = extend({

	checkins: function(options, callback) {
		var options = options || {};
		options.page = (options.page > 0 ? options.page : 1) - 1;
		options.perPage = options.perPage || 10;
		options.criteria = { checkin: this._id };

		mongoose.model('Checkin').list(options, function(err, checkins) {
		  if (err) {
		  	callback(err, null);
		  }
		  else {
			  mongoose.model('Checkin').count(options.criteria, function (err, count) {
			  	if (err) {
			  		callback(err, null);
			  	}
			  	else {
			  		callback(null, {
			  			page: options.page + 1,
			  			pages: Math.ceil(count / options.perPage),
			  			checkins: checkins
			  		})
			  	}
			  });
			}
		});
	}

}, VenueSchema.methods);


// Exports ======================================================================
module.exports = mongoose.model('Venue', VenueSchema);