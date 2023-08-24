const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: { type: String, required: true, unique: true },
  password: String,
  email: String,
  role: {
    type: String,
    enum: ["Rdider", "User", "Admin", "Guest-User"],
    default: "Guest-User",
  },
  licenseDetails: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
