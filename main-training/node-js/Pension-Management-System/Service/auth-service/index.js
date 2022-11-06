require("dotenv").config();
const cors= require('cors');
const express = require("express");
const app = express();
const userRouter = require("./router/user.router")
app.use(express.json());
app.use("/api/users",cors(), userRouter);



app.listen(5000, () => {
    console.log(`Auth service at ${5000}`);
  });
