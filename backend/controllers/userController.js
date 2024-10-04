const User = require('../models/userModel');
const Response = require('../utils/Response');

//Get all users
const getUsers = async (req, res) => {
  const { page = 1 } = req.query;
  try {
    const users = await User.find().limit(page * 10);
    const totalCount = await User.countDocuments();
    const meta = {
      totalCount,
    };
    Response(res, true, 'Users fetched successfully', users, 200, meta);
  } catch (error) {
    Response(res, false, 'Server error', null, 500);
  }
};

//Create a new user
const createUser = async (req, res) => {
  const { name, email, location, phone } = req.body;
  if (!name || !email) {
    return Response(res, false, 'Please provide name and email', null, 400);
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    return Response(res, false, 'User already exists', null, 400);
  }
  const user = await User.create({ name, email, location, phone });
  Response(res, true, 'User created successfully', user);
};

//Update user
const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return Response(res, false, 'User not found', null, 404);
  }
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.phone = req.body.phone || user.phone;
  user.location = req.body.location || user.location;
  const updatedUser = await user.save();
  Response(res, true, 'User updated successfully', updatedUser);
};

//Delete user
const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return Response(res, false, 'User not found', null, 404);
  }
  await user.deleteOne();
  Response(res, true, 'User deleted successfully');
};

module.exports = { getUsers, createUser, updateUser, deleteUser };
