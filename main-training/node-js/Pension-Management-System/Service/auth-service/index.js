require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./user.router")
app.use(express.json());
app.use("/api/users", userRouter);
//process.env.PORT 



app.listen(5000, () => {
    console.log(`Auth service at ${5000}`);
  });
