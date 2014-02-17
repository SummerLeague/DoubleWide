// Setup ========================================================================
var User = require('app/models/user');


// Middelware ===================================================================
function requireAuth(req, res, next) {
  if (req.headers.auth_token) {
  	User.findByToken(req.headers.auth_token, function(user) {
  		if (!user) {
  			return res.send(403, {
  				error: 'Auth Token invalid or expired.'
  			});
  		}
  		req.current_user = user;
  		next();
    	return;
  	});
  }
  else {
  	return res.send(403, {
			error: 'Requires authorization.'
		});
  }
}

function notFound(req, res) {
  res.send(404);
}


// Exports ========================================================================
module.exports = {
  notFound: notFound,
  requireAuth: requireAuth
};