const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
// console.log(token);
// We simply have the user controllers

const registerNewUser = async (req, res) => {
  // Creating new user from the models
  // Here, in the userExists,find,findOne and try hitting from postman,
  const userExist = await User.exists({ phoneNumber: req.body.phoneNumber });
  console.log(userExist);

  if (userExist) {
    // Here, we check if the user exists or not, if yes,
    // it says user exists if not we create the new user
    res.status(409).json({ msg: "user already exists!!" });
  } else {
    // Here, we hash the password using bcrypt, (npm bcrypt)
    req.body.password = hashPass; // Here, we are sending the hashed password

    const hashPass = await bcrypt.hash(req.body.password, saltRounds);
    // console.log(hashPass); // checking the hashed password

    console.log(req.body);
    const data = await User.create(req.body);
    if (data) {
      // res.json({ data });  // Either we can return the data or just he msg
      res.json({ msg: "User registration successful!" });
    }
  }
};

const loginUser = async (req, res) => {
  // phoneNumber exist ?
  console.log(req.body);
  const data = await User.findOne({ phoneNumber: req.body.phoneNumber });
  if (!data) {
    return res.status(404).json({ msg: "user not found" });
  } else {
    // password matched ?
    const isMatched = await bcrypt.compare(req.body.password, data.password);
    if (isMatched) {
      // assign a token (JWT)
      const token = await jwt.sign(
        { phoneNumber: req.body.phoneNumber },
        process.env.SECRET_KEY
      );

      res.json({ isLoggedIn: true, msg: "Login successful", token });
      console.log(token);
    } else {
      res.status(404).json({ msg: "creds error" });
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
module.exports = {
  loginUser,
  registerNewUser,
  getUserById,
  edituserById,
  deleteUserById,
};
