const User = require("../models/user");

const registerNewUser = async (req, res) => {
  const data = await User.create(req.body);
  res.json({ data });
};

const getUserById = async (req, res) => {
  const data = await User.findById(req.params.id);
  res.json({ data });
};

const edituserById = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
};

module.exports = { registerNewUser, getUserById, edituserById };
