const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users'); // load users model out of mongoose

passport.serializeUser((user, done) => {
  done(null, user.id); //(err, identifying info) // * this is NOT the googleId, but the id asigned to the record by mongo.
});
//the google profile id is only really to make the record, but the record id is what we'll uses as user comes and goes.

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//known as strategy called 'google', hit everytime we do the google oauth flow
passport.use(
  new googleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      // logInfo(accessToken, refreshToken, profile, done);

      User.findOne({ googleId: profile.id }).then(exisitngUser => {
        //looks at users collections and find first entry where condition met.
        //async fucntion called with whatever is found, a user or null
        if (exisitngUser) {
          done(null, exisitngUser); //tell passport we're finished
        }
        if (!exisitngUser) {
          new User({ googleId: profile.id }) //create a new modal instance
            .save() //save it
            .then(user => done(null, user)); // *user is a new modal intance return once its been to db -
        }
      });
    }
  )
);

const logInfo = (accessToken, refreshToken, profile, done) => {
  console.log('access token', accessToken);
  console.log('refresh token', refreshToken);
  console.log('profile', profile);
  console.log('done', done);
};
