module.exports = function(app) {
	// Home
	app.get('/', function(req, res) {
		res.send('Welcome to the DoubleWide.');
	});
	// Load all other routes
	[
	  "sessions",
	  "checkins",
	  "users"
	].forEach(function (routeName) {
	    require("app/routes/" + routeName)(app);
	});

	// OK, routes are loaded, now use the router:
	app.use(app.router);

	// Finally, use any error handlers
	app.use(require("app/middleware/").notFound);
};