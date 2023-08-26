const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
// We simply have the user controllers

const registerNewUser = async (req, res) => {
  const hashPass = await bcrypt.hash(req.body.password, saltRounds);
  // Here, we hash the password using bcrypt, (npm bcrypt)
  req.body.password = hashPass; // Here, we are sending the hashed password
  console.log(hashPass); // checking the hashed password
  // Creating new user from the models
  // Here, in the userExists,find,findOne and try hitting from postman,
  const userExist = await User.exists({ phoneNumber: req.body.phoneNumber });
  // console.log(userExist);
  if (userExist) {
    // Here, we check if the user exists or not, if yes,
    // it says user exists if not we create the new user
    res.json({ msg: "user already exists!!" });
  } else {
    const data = await User.create(req.body);
    if (data) {
      // res.json({ data });  // Either we can return the data or just he msg
      res.json({ msg: "User registration successful!" });
    }
  }
};

const edituserById = async (req, res) => {
  // for editing the existing user from the models
  await User.findByIdAndUpdate(req.params.id, req.body);
};

const deleteUserById = async (req, res) => {
  // for deleting the existing users from the models
  await User.findByIdAndDelete(req.params.id, req.body);
};

const getUserById = async (req, res) => {
  // for getting the existing users from the models
  const data = await User.findById(req.params.id);
  res.json({ data });
  // res.send(req.body.data);
};

// Here, we export everyting we have
module.exports = { registerNewUser, getUserById, edituserById, deleteUserById };
