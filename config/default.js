module.exports = {
 	express: {
 		port: process.env.PORT || 5000
 	},
	database: {
		uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/double_wide'
	}
}
