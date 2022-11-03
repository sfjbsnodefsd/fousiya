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
      return res.json(newUser);
    }
  }),
  getUserByUserEmail: ( async (req, res) => {
    const { email } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ sucess: 0, message: "User does not exist" });
    } else {
      if (req.password !== user.password) {
        return res.json({ sucess: 0, message: "Incorrect password" });
      }
      const payload = {
        email,
        name: user.name,
      };
      jwt.sign(payload, "secret", (err, token) => {
        if (err) console.log(err);
        else {
          return res.json({ token: token }); 
        }
      });
    }
  }),

 
};
 

// login user added







