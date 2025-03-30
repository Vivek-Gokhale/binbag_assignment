
const UserModel = require('../models/userSchema'); // Import the schema

const create = async (userData) => {
  const { name, email, address, password, bio, profilePicture } = userData;
  const newUser = new UserModel({ name, email, address, password, bio, profilePicture });
  await newUser.save();
  return { id: newUser._id, email: newUser.email };
};

const getByEmail = async (email) => {
  return await UserModel.findOne({ email });
};

const updateByEmail = async (email, updatedData) => {
  return await UserModel.findOneAndUpdate({ email }, updatedData, { new: true });
};

module.exports = {
  create,
  getByEmail,
  updateByEmail,
};
