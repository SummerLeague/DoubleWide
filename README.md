DoubleWide
===========

![pow wow](https://31.media.tumblr.com/tumblr_m50mb3oKem1r6furjo1_500.gif)


Dependencies
-----

For Heroku:

- To use this app on Heroku, you will need to add a MongoDB database using one of the MongoDB addons: `heroku addons:add mongolab`


Setup
-----

Install packages needed for server: `npm install`
Install packages needed for client: `bower install`
Start app (local): foreman start


Development Notes
-----

We are currently using the [foursquarevenues](https://github.com/elbuo8/4square) package for accessing the Foursquare API. This package appears limited but has the features for the limited needs of our current backend. If we need more functionality, see the [list of libraries](https://developer.foursquare.com/resources/libraries) maintained by foursquare for other options.

