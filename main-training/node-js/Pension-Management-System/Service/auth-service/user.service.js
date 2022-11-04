const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./User");
const jwt = require("jsonwebtoken");
app.use(express.json());


mongoose.connect(
  "mongodb://localhost:27017/auth-service",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`auth service DB  Connected`);
  }
);

// register
module.exports = {
  create: ( async (req, res) => {
    const { email, password,name } = req.body;
  
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ sucess: 0, message: "User already exists" });
    } else {
      const newUser = new User({
  
        name,
        email,
        password,
      });
      newUser.save();
      return JSON.stringify(newUser);
    }
  }),
  getUserByUserEmail: (async (req, callbackFn) => {
    const { email } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) {
      return callbackFn({ sucess: 0, message: "User does not exist" },{});
    }  

    return callbackFn(null,user);
  }),

 
};
 

// login user added







