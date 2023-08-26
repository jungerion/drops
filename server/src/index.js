const express = require("express");
const connect = require("./db/connect");
const app = express();
const User = require("./models/user");
const UserRouter = require("./routes/user");
app.use(express.json());
// console.log(UserRouter)
connect();
require("dotenv").config();
const port = process.env.PORT;

app.use(UserRouter); // use the Router following the documentation

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
