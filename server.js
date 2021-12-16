const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');

const server = restify.createServer();

/**
 * MiddleWares
 */

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());




server.listen(config.PORT, () => {
  mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });
});

const db = mongoose.connection;

db.on('error', (err) => console.log(err.message));

db.once('open', () => {
  require('./routes/user')(server);
  console.log(`Server Started @ ${config.PORT}`);
});
