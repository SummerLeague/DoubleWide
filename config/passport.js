var User          = require('app/models/user'),
		LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport, config) {
	passport.use(User.createStrategy());

	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());
}