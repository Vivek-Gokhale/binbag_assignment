const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  password: { type: String, required: true }, 
  bio: { type: String },
  profilePicture: { type: String },
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
