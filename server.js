const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');
const restifyjwt = require('restify-jwt-community');

const server = restify.createServer();

/**
 * MiddleWares
 */

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

/**
 * PROTECT ROUTES
 */

// server.use(
//   restifyjwt({ secret: config.JWT_SECRET }).unless({ path: ['/auth'] })
// );

server.listen(config.PORT, () => {
  mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });
});

const db = mongoose.connection;

db.on('error', (err) => console.log(err.message));

db.once('open', () => {
  require('./routes/customers')(server);
  require('./routes/users')(server);
  console.log(`Server Started @ ${config.PORT}`);
});
