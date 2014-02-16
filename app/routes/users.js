// Setup ========================================================================
var User        = require('app/models/user'),
		passport    = require('passport'),
    requireAuth = require("app/middleware/").requireAuth;


// Controllers ==================================================================
function create(req, res) {
  User.register(new User({ nickname : req.body.nickname }), req.body.password, function(err, user) {
    if (err) {
      return res.send(422, {
				error: err
			});
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
};

function update(req, res) {
  // TODO/DISCUSS: Should we remove the :user_id portion of this route altogether, this catch won't be necessary.
  if (req.params.user_id != req.current_user._id) {
    return res.send(403, { error: 'You are forbidden to update users other than yourself.' });
  }

	// Perform updates.
  // Flesh this out as necessary.
	req.current_user.nickname = req.body.nickname;

	req.current_user.save(function (err, user) {
    console.log(err);
	  if (err) {
			return res.send(422, {
				errors: err.errors
			});
		}
	  return res.send(200, {
			user: {
				_id: user._id,
				nickname: user.nickname
			}
		});
	});
}


// Exports ======================================================================
module.exports = function(app) {
  app.post('/api/users', create);
  app.put('/api/users/:user_id', requireAuth, update);
}