var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		extend = require('node.extend'),
		Checkin = require('app/models/checkin'),
		foursquare = (require('foursquarevenues'))(process.env.FOURSQUARE_KEY, process.env.FOURSQUARE_SECRET);

var VenueSchema = new Schema({
	foursquare_id: { type: String, required: true },
});


/*
	Class methods.
*/
VenueSchema.statics = extend({

	findOrCreateByFoursquareId: function(foursquare_id, callback) {
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
    console.log(process.env.FOURSQUARE_KEY);
		console.log(process.env.FOURSQUARE_SECRET);
		console.log('------------------');
    foursquare.getVenues(params, function(err, venues) {
        callback(err, venues);
    });
	}

}, VenueSchema.statics);


/*
	Instance methods.
*/
VenueSchema.methods = extend({

	checkins: function(options, callback) {
		var options = options || {};
		options.page = (options.page > 0 ? options.page : 1) - 1;
		options.perPage = options.perPage || 10;
		options.criteria = { checkin: this._id };

		Checkin.list(options, function(err, checkins) {
		  if (err) {
		  	callback(err, null);
		  }
		  else {
			  Checkins.count(options.criteria, function (err, count) {
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


module.exports = mongoose.model('Venue', VenueSchema);