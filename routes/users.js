const restifyErrors = require('restify-errors');
const User = require('../models/User');

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

      res.send(201, { success: true, user: user.email });
      next();
    } catch (error) {
      return next(new restifyErrors.InternalError(error.message));
    }
  });
};
