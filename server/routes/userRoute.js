const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

// register a user
router.post("/register", async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });

    if (userExist) {
      return res.send({ 
        success: false,
        message: "User already exists",
      });
    }

    //hash the paswword

    const salt = await bcrypt.genSalt(7);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPassword


    const newUser = new User(req.body);
    await newUser.save();

    res.send({
      success: true,
      message: "Registration Successfull , Please login",
    });
  } catch (error) {
    console.log(error);
  }
});



//login route

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  
  if (!user) {
    res.send({
      success: false,
      message:"User does not exist"
    })
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  

  if (!validPassword) {
    res.send({
      success: false,
      message:"Password Incorrect "
    })
  }
   const token = jwt.sign({userId : user._id} , process.env.jwt_secret , {expiresIn :"1d"})
  
   console.log(token)

  
  res.send({ 
    success : true,
    message : 'User Logged in yo',
    data:token
})

})

//get user details by id (Protected routes)
//need middleware for validations

router.get('/get-current-user', authMiddleware ,async(req, res) => {
  try {
    const user = await User.findById(req.body.userId).select('-password')

    res.send({
      success: true,
      message: "User fetched successfully",
      data: user
    })
  } catch (error) {
    res.send({
      success: false,
      message:error.message
    })
  }
})

module.exports = router;
