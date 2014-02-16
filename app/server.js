#!/usr/bin/env node
var express = require('express'),
		mongoose = require('mongoose'),
		config = require('config'),
		passport = require('passport'),
		app = express(),
		server = require('http').createServer(app);

// Configure application.
app.configure(function() {
	app.use(express.logger());
	app.use(express.bodyParser());
	app.use(passport.initialize());
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

// Setup routes.
require('../config/routes')(app);

// Configure Passport.
require('../config/passport')(passport, config);

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(config.database.uri, function (err, res) {
	if (err) {
		console.log ('ERROR connecting to: ' + config.database.uri + '. ' + err);
	} else {
		console.log ('Succeeded connected to: ' + config.database.uri);
	}
});

// Begin listening.
server.listen(config.express.port, function(error) {
	if (error) {
    console.log("Unable to listen for connections: " + error);
    process.exit(10);
  }
 	console.log("Express is listening on port: " + config.express.port);
});