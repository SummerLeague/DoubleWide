var User          = require('app/models/user'),
		LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport, config) {
	passport.use(User.createStrategy());
	// TODO: We get session serialization errors without the following two lines. These
	//   two methods are supposed to make cookies work for sessions... which we dont need.
	//   We need to sort out how to not need these two method calls.
	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());
}