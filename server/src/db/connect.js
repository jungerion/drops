const mongoose = require("mongoose");

// Here, we connect the Database

const connect = async () => {
  try {
    const res = await mongoose.connect("mongodb://127.0.0.1:27017/drops");
    if (res) console.log("connected to mongodb");
  } catch (err) {
    console.log(err);
  }
};
// connect();

module.exports = connect;
