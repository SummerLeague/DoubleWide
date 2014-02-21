// Setup ========================================================================
var passport = require('passport');


// Controllers ==================================================================
function create(req, res) {
	// Note: Helpful info on passport.authenticate('local'):
	//   http://stackoverflow.com/questions/9690490/how-can-i-report-an-invalid-login-properly-with-express-and-passport
	passport.authenticate('local', function(err, user) {
		if (!user) {
			return res.send(403, {
				error: 'Invalid credentials.'
			});
		}
		user.regenerateToken(function(err, user) {
			if (!user) {
				// TODO: Log.
				return res.send(500);
			}
			// Since we are using a custom callback, we need to call login() to create a session.
			req.logIn(user, function(err) {
	      if (!user) {
					// TODO: Log.
					return res.send(500);
				}
	      return res.send(200, {
					user: {
						_id: user._id,
						nickname: user.nickname,
						token: user.auth_token.token,
						token_expires_at: user.auth_token.expires_at
					}
				});
	    });
		});
  })(req,res);
}

// Destroys session cookie for logged in user (browser). Not for mobile client use.
function destroy(req, res) {
	// TODO: Consider authenticating for auth_token here in order to destroy auth_tokens for mobile users on logout.
	req.logOut();
	res.send(200);
}

// Checks if a user is logged in (browser) by checking cookies. Not for mobile client use.
function isLoggedIn(req, res) {
	res.send(req.isAuthenticated() ? req.user : '0');
}


// Exports ======================================================================
module.exports = function(app) {
 	app.post('/api/login', create);
 	app.post('/api/logout', destroy);
 	app.get('/api/loggedin', isLoggedIn);
}