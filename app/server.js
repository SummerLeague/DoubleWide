#!/usr/bin/env node

// Setup ========================================================================
var express  = require('express'),
		mongoose = require('mongoose'),
		config   = require('config'),
		passport = require('passport'),
		app      = express(),
		server   = require('http').createServer(app);


// Passport =====================================================================
require('../config/passport')(passport, config);


// Configure Aapplication  ======================================================
app.configure(function() {
	app.use(express.logger());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
  app.use(express.cookieParser('wam bam thank you mam get a better secret'));
	app.use(express.session());
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(express.static('public'));
	app.use(app.router);
});

app.configure('development', function() {
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
});

app.configure('production', function() {
	app.use(express.errorHandler());
});


// Routes =======================================================================
require('../config/routes')(app);


// Connect to Database ==========================================================
mongoose.connect(config.database.uri, function (err, res) {
	if (err) {
		console.log ('ERROR connecting to: ' + config.database.uri + '. ' + err);
	} else {
		console.log ('Succeeded connected to: ' + config.database.uri);
	}
});


// Begin Listening ==============================================================
server.listen(config.express.port, function(error) {
	if (error) {
    console.log("Unable to listen for connections: " + error);
    process.exit(10);
  }
 	console.log("Express is listening on port: " + config.express.port);
});