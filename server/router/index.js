/**
 * The Index of Routes
 */

module.exports = function (app) {

  // The signup route
  app.use('/signup', require('./routes/signup'));
  // The login route
  app.use('/login', require('./routes/login'));
}