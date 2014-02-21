var User          = require('app/models/user'),
		LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport, config) {
	passport.use(User.createStrategy());
	//passport.use(new LocalStrategy(User.authenticate())); // TODO: Investigate the authenticate method in passport-local-mongoose

	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());
}