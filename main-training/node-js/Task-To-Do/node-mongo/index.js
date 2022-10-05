
const express = require("express");
const employeeRouter = require("./routes/employees")
require("dotenv").config();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");







const app = express();
app.use(bodyParser.json());
app.use(employeeRouter);



mongoose.connect("mongodb://localhost:27017/mydb", (err) => {
if(!err){
    console.log("connected db successfully");
}
else{
    console.log("Error connecting to database ");
}
   

})

// this is the server for express
app.listen(process.env.PORT, () => {
    console.log("server is starting");
});

