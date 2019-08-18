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
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // we already have a record with given profile id
          done(null, existingUser); // tells passport to proceed with auth flow
        } else {
          // no record found, create new record
          // create a model instance
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
