const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  // We have the phonenumber unique for every users,
  phoneNumber: { type: String, required: true, unique: true },
  password: String,
  email: String,
  avatarImage: String,
  role: {
    type: String,
    enum: ["Rider", "User", "Admin", "Guest-User"], // enum  for the roles if theres multiple role and it could be any so we use enum
    default: "Guest-User",
  },
  licenseDetails: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
