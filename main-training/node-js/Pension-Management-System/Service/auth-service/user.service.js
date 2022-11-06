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
  create: (async (user, callbackFn) => {
    const { email, password, name } = user;

    let existingUser;

    try {
      existingUser = await User.findOne({ email });
    } catch (err) {
      return callbackFn("User already exists");
    }

    if (existingUser) {
      return callbackFn("User already exists");
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });
      newUser.save();
      return callbackFn(null, newUser);
    }
  }),
  getUserByUserEmail: (async (user, callbackFn) => {
    const { email } = user;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return callbackFn("User Does Not Exists");
    }

    return callbackFn(null, existingUser);
  }),


};


// login user added







