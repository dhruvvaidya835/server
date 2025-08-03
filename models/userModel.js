const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    bio: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// ✅ Only compile if not already compiled
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
