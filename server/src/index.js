const express = require("express");
const connect = require("./db/connect");
const app = express();
require("dotenv").config();

const User = require("./models/user");
const UserRouter = require("./routes/user");
const cors = require("cors");
app.use(express.json());
app.use(cors());
// console.log(UserRouter)
connect();
const port = process.env.PORT;

app.use(UserRouter); // use the Router following the documentation

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
