const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// Modal Class to create instance
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  // user.id is the Mongo identifier
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // query collection of users
  User.findById(id).then(user => {
    // by taking cookie (id), we can return the user profile from db
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClinetID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
