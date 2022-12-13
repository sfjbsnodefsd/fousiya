const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const PensionerDetail = require("./pensioner");
const checktoken = require('./isAuthenticated');
const csv = require('csvtojson');
const { success, fail } = require('./http.response')
const cors = require('cors');
app.use(cors());
app.use(express.json());
const GENERIC_EXCEPTION = "An Exception Has Occured."
const { getPensionerDetailByAadhaar, getAllPensionerDetails, updatePensionerDetails, deletePensioner, createPensionerDetail }  = require('./pensioner-service')

// create a new pensioner
app.get("/getPensionerDetailByAadhaar/:aadhaar", checktoken, cors(), getPensionerDetailByAadhaar);

app.get("/getAllPensionerDetails", checktoken, cors(), getAllPensionerDetails);

app.post("/createPensionerDetail", checktoken, cors(),  createPensionerDetail);


app.put("/updatePensionerDetails", checktoken, cors(), updatePensionerDetails);

app.delete("/deletePensioner/:aadhaar", checktoken, cors(),  deletePensioner);

app.listen(process.env.PORT, () => {
  console.log(`pensioner detail service is working at port  ${process.env.PORT}`);
});