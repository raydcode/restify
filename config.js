module.exports = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  URL: process.env.BASE_URL || 'http://localhost:3000',
  MONGODB_URI:
    process.env.MONGODB_URI ||
    'mongodb+srv://raydmongo:pNe4NPwoRWie1QNr@cluster0.nhndq.mongodb.net/restify?retryWrites=true&w=majority',
  SALT_ROUND : 10,
  JWT_SECRET:process.env.JWT_SECRET || 'restify#$!'
};
