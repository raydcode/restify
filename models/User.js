const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const bcrypt = require('bcryptjs');
const config = require('../config');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please Add a password'],
    minLength: 6,
    maxlength: 32,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

UserSchema.plugin(timestamp);

// Encrypt Password using Bcrypt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(config.SALT_ROUND);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);
