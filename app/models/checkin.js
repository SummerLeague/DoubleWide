var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
    Venue = require('app/models/venue');
		extend = require('node.extend');

var CheckinSchema = new Schema({
	creator: { type: Schema.ObjectId, ref: 'User', required: true },
	venue: { type: Schema.ObjectId, ref: 'Venue', required: true },
  loc: { type: [Number], index: '2d' },
	createdAt: { type: Date, default: Date.now }
});

/*
	Class methods.
*/
CheckinSchema.statics = extend({

  load: function (id, callback) {
    this.findOne({ _id : id })
      .populate('creator', 'nickname _id')
      .populate('venue', 'foursquare_id _id')
      .exec(callback);
  },

	list: function (options, callback) {
    var options = options || {},
        criteria = options.criteria || {};

    this.find(criteria)
      .populate('creator', 'nickname _id')
      .populate('venue', 'foursquare_id _id')
      .sort({'createdAt': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(callback);
  }

}, CheckinSchema.statics);


/*
  Instance methods.
*/
CheckinSchema.methods = extend({

  setVenueAndSave: function (foursquare_id, callback) {
    var self = this;
    Venue.findOrCreateByFoursquareId(foursquare_id, function(err, venue) {
      if (err) {
        return callback(err, null);
      }
      self.venue = venue;
      self.save(function(err, checkin) {
        if (err) {
          return callback(err, null);
        }
        else {
          checkin
          .populate('creator', 'nickname _id')
          .populate('venue', 'foursquare_id _id')
          .populate(callback);
        }
      });
    });
  }

}, CheckinSchema.methods);

module.exports = mongoose.model('Checkin', CheckinSchema);
