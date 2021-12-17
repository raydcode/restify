const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.authenticate = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Get user by email
      const user = await User.findOne({ email });

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;

        if (isMatch) {
          resolve(user);
        } else {
          reject('Authetication Failed');
        }
      });
    } catch (error) {
      reject('Authorization Failed');
    }
  });
};
