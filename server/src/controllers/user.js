const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
// const userInfo = require("path");
// console.log(token);
// We simply have the user controllers

// const uploadImage = async (req, res) => {
//   // console.log(req.params, req.file);
//   if (req.file?.filename) {
//     await User.findByIdAndUpdate(req.params.id, {
//       $set: { avatarImage: req.file?.filename },
//     });
//   }
//   res.json({
//     msg: "image upload",
//   });
// };

const uploadImage = async (req, res) => {
  try {
    if (req.file?.filename) {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: { avatarImage: req.file?.filename },
      });

      if (!updatedUser) {
        return res.status(404).json({ msg: "User not found" });
      }

      return res.json({ msg: "Image upload successful" });
    } else {
      return res.status(400).json({ msg: "No image file uploaded" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const getUserImage = async (req, res) => {
  const userInfo = await User.findById(req.params.id);
  // console.log(userInfo);
  const imagePath = path.join(
    __dirname,
    "../../uploads/avatar",
    userInfo.avatarImage
  );
  const defaultImagePath = path.join(
    __dirname,
    "../../uploads/avatar",
    "defaultimg.pmg"
  );
  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
    console.log(imagePath);
  } else {
    sendFile(defaultImagePath);
  }

  // console.log(req.params);
  // res.sendFile(
  //   "/C:/Users/ACER/Desktop/project_drop/drops/server/uploads/avatar/1886773IMG_1263.JPG"
  // );
};

const registerNewUser = async (req, res) => {
  // Creating new user from the models
  // Here, in the userExists,find,findOne and try hitting from postman,
  const userExist = await User.exists({ phoneNumber: req.body.phoneNumber });
  // console.log(userExist);

  if (userExist) {
    // Here, we check if the user exists or not, if yes,
    // it says user exists if not we create the new user
    res.status(409).json({ msg: "user already exists!!" });
  } else {
    // Here, we hash the password using bcrypt, (npm bcrypt)
    const hashPass = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashPass; // Here, we are sending the hashed password
    // req.body.role = "User";

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

      res.json({
        isLoggedIn: true,
        msg: "Login successful",
        token,
        userInfo: data,
      });
      console.log(token);
    } else {
      res.status(401).json({ msg: "creds error" });
    }
    console.log(data);
  }
};

const updateUserDetailsById = async (req, res) => {
  // for editing the existing user from the models
  const data = await User.findByIdAndUpdate(req.params.id, req.body);
  if (data) {
    res.json({
      msg: "User details edited",
    });
  }
};

const deleteUserById = async (req, res) => {
  // for deleting the existing users from the models
  await User.findByIdAndDelete(req.params.id, req.body);
};

const getUserById = async (req, res) => {
  // for getting the existing users from the models
  const data = await User.findById(req.params.id);
  if (data) {
    res.json({ userDetails: data });
  }
};

// Here, we export everyting we have
module.exports = {
  loginUser,
  registerNewUser,
  getUserById,
  updateUserDetailsById,
  deleteUserById,
  uploadImage,
  getUserImage,
};
