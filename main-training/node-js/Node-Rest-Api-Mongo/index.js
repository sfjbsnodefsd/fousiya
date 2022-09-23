const express = require("express");
const coursesRouter = require("./routes/courses")
require("dotenv").config();
const mongoose = require('mongoose')
const app = express();
app.use(coursesRouter);
mongoose.connect(process.env.DB_CONNECTION_URL,() => {
    console.log("connected to db successfully");
})
// app.get("/",(req,res) => {
//     res.send("api working is fine");
// })
//app.get("/courses",coursesRouter);
// app.use(coursesRouter);
// app.listen(5000,() => {
//     console.log("server is starting")
// })
app.listen(process.env.PORT,() => {
    console.log("server is starting")
})