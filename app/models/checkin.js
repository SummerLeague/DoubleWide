// Setup ========================================================================
var mongoose = require('mongoose'),
		Schema   = mongoose.Schema,
		extend   = require('node.extend');


// Schema =======================================================================
var CheckinSchema = new Schema({
	creator: { type: Schema.ObjectId, ref: 'User', required: true },
	venue: { type: Schema.ObjectId, ref: 'Venue', required: true },
  loc: { type: [Number], index: '2d' },
	createdAt: { type: Date, default: Date.now }
});


// Class Methods ================================================================
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


// Instance Methods =============================================================
CheckinSchema.methods = extend({

  setVenueAndSave: function (foursquare_id, callback) {
    var self = this;
    mongoose.model('Venue').findOrCreateByFoursquareId(foursquare_id, function(err, venue) {
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


// Exports ======================================================================
module.exports = mongoose.model('Checkin', CheckinSchema);
