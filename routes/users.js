const restifyErrors = require('restify-errors');
const User = require('../models/User');
const auth = require('./auth');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (server) => {
  /**
   * @POST Add Customer
   */

  server.post('/register', async (req, res, next) => {
    // Check for JSON
    if (!req.is('application/json')) {
      return next(
        new restifyErrors.InvalidContentError("Expectes 'application/json'")
      );
    }

    try {
      let { email, password } = req.body;

      const user = await User.create({
        email,
        password,
      });

      res.send(201, {
        success: true,
        message: `user with email '${user.email} was created successFully`,
      });
      next();
    } catch (error) {
      return next(new restifyErrors.InternalError(error.message));
    }
  });

  /**
   * @AUTH USER
   */

  server.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const user = await auth.authenticate(email, password);

      /**
       *  @JWT Token
       */

      const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
        expiresIn: '15m',
      });

      const { iat, exp } = jwt.decode(token);

      res.send(200, { success: true, iat, exp, token });

      next();
    } catch (error) {
      return next(new restifyErrors.UnauthorizedError(error));
    }
  });
};
