const restifyErrors = require('restify-errors');
const Customer = require('../models/Customers');
const restifyjwt = require('restify-jwt-community');
const config = require('../config');


module.exports = (server) => {
  /**
   * @Get All Customers
   * 
   */
  server.get('/customers', async (req, res, next) => {
    try {
      const customers = await Customer.find({});

      res.send(200, { success: true, customers });
      next();
    } catch (error) {
      return next(new restifyErrors.InvalidContentError(error));
    }
  });

  /**
   * @GET Single Customer
   *
   */

  server.get('/customers/:id', async (req, res, next) => {
    try {
      const customer = await Customer.findById(req.query.id);

      res.send(200, { success: true, customer });
      next();
    } catch (error) {
      return next(
        new restifyErrors.ResourceNotFoundError(
          `There is no Customer with the id of ${req.query.id}`
        )
      );
    }
  });
  /**
   * @POST Add Customer
   */

  server.post('/customers', restifyjwt({secret:config.JWT_SECRET}), async (req, res, next) => {
    // Check for JSON
    if (!req.is('application/json')) {
      return next(
        new restifyErrors.InvalidContentError("Expectes 'application/json'")
      );
    }

    try {
      const { name, email, balance } = req.body;

      const customer = await Customer.create({
        name,
        email,
        balance,
      });

      res.send(201, { success: true, customer });
      next();
    } catch (error) {
      return next(new restifyErrors.InternalError(error.message));
    }
  });

  /**
   * @PUT Update Customer
   */

  server.put('/customers/:id', restifyjwt({secret:config.JWT_SECRET}), async (req, res, next) => {
    // Check for JSON
    if (!req.is('application/json')) {
      return next(
        new restifyErrors.InvalidContentError("Expectes 'application/json'")
      );
    }

    try {
      const customer = await Customer.findOneAndUpdate({ _id: req.query.id }, req.body);

      res.send(201, { success: true, update: customer });
      next();
    } catch (error) {
      return next(
        new restifyErrors.ResourceNotFoundError(
          `There is no Customer with the id of ${req.query.id}`
        )
      );
    }
  });

  /**
   * @DELETE DELETE Customer
   */

  server.del('/customers/:id', restifyjwt({secret:config.JWT_SECRET}), async (req, res, next) => {
    try {
      const customer = await Customer.findOneAndRemove({ _id: req.query.id });
      res.send(204, { success: true });
      next();
    } catch (error) {
      return next(
        new restifyErrors.ResourceNotFoundError(
          `There is no Customer with the id of ${req.query.id}`
        )
      );
    }
  });
};
