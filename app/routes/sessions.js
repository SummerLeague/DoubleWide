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
			return res.send(200, {
				user: {
					_id: user._id,
					nickname: user.nickname,
					token: user.auth_token.token,
					token_expires_at: user.auth_token.expires_at
				}
			});
		});
  })(req,res);
}


// Exports ======================================================================
module.exports = function(app) {
 	app.post('/api/login', create);
}