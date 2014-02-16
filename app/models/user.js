// Setup ========================================================================
var mongoose        = require('mongoose'),
		Schema          = mongoose.Schema,
		crypto          = require('crypto'),
		extend          = require('node.extend'),
		passportLocal   = require('passport-local-mongoose'),
		uniqueValidator = require('mongoose-unique-validator'),
		Checkin         = require('app/models/checkin');


// Schema =======================================================================
// NOTE: Additional fields provided by passportLocal plugin below.
var UserSchema = new Schema({
	auth_token: {
		token: { type: String, required: true },
		expires_at: { type: Date, default: null }
	}
});


// Validations ==================================================================
UserSchema.path('nickname').index({ unique: true });
// TODO: more validations on nickname and password.
// TODO: password confirmation on creation and password update.


// Plugins ======================================================================
UserSchema.plugin(uniqueValidator, {});

UserSchema.plugin(passportLocal, {
	usernameField: 'nickname',
	missingUsernameError: 'A nickname is required.'
});


// Hooks ========================================================================
UserSchema.pre('validate', function (next) {

	if (this.isNew) {
		// New user is about to be validated.
  	this.generateToken();
  }

  next();
});


// Class Methods ================================================================
UserSchema.statics = extend({

	findByToken: function(token, callback) {
		var self = this;
		this.findOne({ "auth_token.token": token }, function(err, user) {
			if (!user || user.tokenExpired()) {
				callback(null)
			}
			else {
				callback(user);
			}
		});
	}

}, UserSchema.statics); // TODO/URGENT: Discuss the costs/benefits of using this 'extend' method here with Mark.


// Instance Methods =============================================================
UserSchema.methods = extend({

	tokenExpired: function() {
		var current_time = new Date().getTime();
		return this.auth_token.token == null || this.auth_token.expires_at == null || this.auth_token.expires_at.getTime() < current_time;
	},

	generateToken: function() {
		var current_time = new Date().getTime(),
				five_hours = 1000 * 60 * 60 * 5,
				fifteen_seconds = 1000 * 15; // Leaving this shorter var here for testing with.
		this.auth_token.token = crypto.createHash('sha1').update(crypto.randomBytes(20)).digest('hex');
		this.auth_token.expires_at = new Date(current_time + five_hours);
	},

	regenerateToken: function(callback) {
		if (!this.auth_token) {
			// Old schema.
			// TODO: Find a better way to account for schema changes on existing objects. Migrations?
			this.auth_token = {};
		}
		this.generateToken();
		this.save(callback);
	},

	checkins: function(options, callback) {
		var options = options || {};
		options.page = (options.page > 0 ? options.page : 1) - 1;
		options.perPage = options.perPage || 10;
		options.criteria = { creator: this._id };

		Checkin.list(options, function(err, checkins) {
		  if (err) {
		  	callback(err, null);
		  }
		  else {
			  Checkin.count({}, function (err, count) {
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

}, UserSchema.methods);


// Exports ======================================================================
module.exports = mongoose.model('User', UserSchema);