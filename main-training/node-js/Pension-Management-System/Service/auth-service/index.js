require("dotenv").config();
const cors= require('cors');
const express = require("express");
const app = express();
const userRouter = require("./router/user.router")
app.use(express.json());
app.use("/api/users",cors(), userRouter);
const {LoggerService} = require('./logger-service');
const logger = new LoggerService();

app.listen(5000, () => {
    logger.info(`Auth service at ${5000}`);
  });
