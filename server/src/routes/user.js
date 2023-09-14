const User = require("../models/user");
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const multer = require("multer");
// We use routes , express seperate routes for the different routes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/avatar/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/register", UserController.registerNewUser);

router.post("/login", UserController.loginUser);

router.post(
  "/users-image/:id",
  upload.single("avatar"),
  UserController.uploadImage
);

router.put("/account/:id", UserController.updateUserDetailsById);

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

// router.put("/users/:id", UserController.edituserById);

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
