const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("../models/user");
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
      console.log(existingUser);


      if (existingUser) {
        return callbackFn("User already exists");
      } else {
        const newUser = new User({name, email, password}) ;
//const newUser = module.exports.createUserobject(name, email, password);
        console.log("name" + newUser.name);

        newUser.save();
        return callbackFn(null, newUser);
      }
    }
    catch (err) {
      return callbackFn("Error While Connecting With Database");
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
  // createUserobject: (name, email, password) => {
  //   return new User({ name, email, password })

  // }

};


// login user added







