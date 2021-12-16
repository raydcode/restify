const restifyErrors = require('restify-errors');
const User = require('../models/User');

module.exports = (server) => {
  /**
   * @Get All USERS
   */
  server.get('/users', async (req, res, next) => {
    try {
      const users = await User.find({});

      res.send(200, { success: true, users });
      next();
    } catch (error) {
      return next(new restifyErrors.InvalidContentError(error));
    }
  });

  /**
   * @GET Single USER
   *
   */

  server.get('/users/:id', async (req, res, next) => {
    try {
      const user = await User.findById(req.query.id);

      res.send(200, { success: true, user });
      next();
    } catch (error) {
      return next(
        new restifyErrors.ResourceNotFoundError(
          `There is no User with the id of ${req.query.id}`
        )
      );
    }
  });
  /**
   * @POST Add USERS
   */

  server.post('/users', async (req, res, next) => {
    // Check for JSON
    if (!req.is('application/json')) {
      return next(
        new restifyErrors.InvalidContentError("Expectes 'application/json'")
      );
    }

    try {
      const { name, email, balance } = req.body;

      const user = await User.create({
        name,
        email,
        balance,
      });

      res.send(201, { success: true, user });
      next();
    } catch (error) {
      return next(new restifyErrors.InternalError(error.message));
    }
  });

  /**
   * @PUT Update USER
   */

  server.put('/users/:id', async (req, res, next) => {
    // Check for JSON
    if (!req.is('application/json')) {
      return next(
        new restifyErrors.InvalidContentError("Expectes 'application/json'")
      );
    }

    try {
      const user = await User.findOneAndUpdate({ _id: req.query.id }, req.body);

      res.send(201, { success: true, update: user });
      next();
    } catch (error) {
      return next(
        new restifyErrors.ResourceNotFoundError(
          `There is no User with the id of ${req.query.id}`
        )
      );
    }
  });

  /**
   * @DELETE DELETE USER
   */

  server.del('/users/:id', async (req, res, next) => {
    try {
      const user = await User.findOneAndDelete({ _id: req.query.id });
      res.send(204, { success: true });
      next();
    } catch (error) {
      return next(
        new restifyErrors.ResourceNotFoundError(
          `There is no User with the id of ${req.query.id}`
        )
      );
    }
  });
};
