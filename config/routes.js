module.exports = function(app) {
	// Set root route.
	app.get('/', function(req, res) {
		res.send('Welcome to the DoubleWide.');
	});
	// Load all other routes.
	[
	  "venues",
	  "sessions",
	  "checkins",
	  "users"
	].forEach(function (routeName) {
	    require("app/routes/" + routeName)(app);
	});

	// Now that routes are loaded, use the router.
	app.use(app.router);

	// Finally, use any error handlers.
	app.use(require("app/middleware/").notFound);
};