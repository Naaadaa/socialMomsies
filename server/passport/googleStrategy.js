const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../db/models/User');

const strategy = new GoogleStrategy(
	{
		clientID: "961908331426-lvci427bk9qqdnk2qj93hhueta2b0pat.apps.googleusercontent.com",
		clientSecret: "AXtMBz-R_v8-SPTuHMHdVF_o",
		callbackURL: '/auth/google/callback'
	},
	function(token, tokenSecret, profile, done) {
		// testing
		console.log('===== GOOGLE PROFILE =======');
		console.log(profile);
		console.log('======== END ===========');
		// code
		const { id, name, email, photos } = profile;
		User.findOne({ email: email }, (err, userMatch) => {
			// handle errors here:
			if (err) {
				console.log('Error occurred while trying to find user by email');
				console.log(err);
				return done(null, false);
			}
			// if there is already someone with that email
			if (userMatch) {
				return done(null, userMatch);
			} else {
				// if no user in our db, create a new user with that email
				console.log('====== PRE SAVE =======');
				console.log(email);
				console.log(profile);
				console.log('====== post save ....');
				const newGoogleUser = new User({
					email: email,
					name: name.givenName + ' ' + name.familyName,
					image: ((photos && photos.length && photos.length > 0) ? photos[0] : 'http://shashgrewal.com/wp-content/uploads/2015/05/default-placeholder-300x300.png'),
				});
				// save this user
				newGoogleUser.save((err, savedUser) => {
					if (err) {
						console.log('Error!! saving the new google user');
						console.log(err);
						return done(null, false);
					} else {
						return done(null, savedUser);
					}
				}); // closes newGoogleUser.save
			}
		}); // closes User.findONe
	}
);

module.exports = strategy;
