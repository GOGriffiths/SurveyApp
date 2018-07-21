const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      // passport knows how to ref the 'google' strategy
      scope: ['profile', 'email'] // what we want to use
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));
};
