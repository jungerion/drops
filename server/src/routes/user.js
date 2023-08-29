const User = require("../models/user");
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");

// We use routes , express seperate routes for the different routes

router.post("/register", UserController.registerNewUser);

router.post("/login", UserController.loginUser);

router.get("/users/:id", UserController.getUserById);
// router.post('/users', async(req, res) =>{
// const t = await User.exists({fullName : req.body.fullName})
// console.log(t)
// })

// router.post("/users", async (req, res) => {
//   try{
//   const data = await User.create(req.body);
//   const data1 = await User.exists({ fullName: req.body.fullName });
//   if (data1) {
//     res.json({ msg: "user already exists" });
//   } else (data);
//   res.json({ msg: "user created succesfully" });
//   }
//    catch (err) {
//     console.log(err);
//   }

//   });

router.put("/users/:id", UserController.edituserById);

// router.delete("/users/:id",async (req, res)=>{
//  await User.findByIdAndDelete(req.params.id)
// })
router.delete("/users/:id", UserController.deleteUserById);

// app.get('/users', (req, res) => {
//   const searchText= req.query.searchText

// res.send(data)
// })

// app.get('/users/:id', (req, res) => {
//    const data=  users.filter((item)=>{

//   })
//   res.send(data)
//   })

module.exports = router;
