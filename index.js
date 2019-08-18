const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

app.use(
  // cookie configuration
  cookieSession({
    // how long cookie can exist before it expires
    // 30 days in milliseconds = 30 days, 24 hours in day, 60 min in hour, 60 secs in a min, 1000ms to 1 sec
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // key used to encrypt cookie so someone can't manually change
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/auth')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
