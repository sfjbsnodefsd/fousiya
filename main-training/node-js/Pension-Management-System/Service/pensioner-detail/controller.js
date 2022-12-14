const express = require("express");
const app = express();
require("dotenv").config();
const checktoken = require('./isAuthenticated');
const cors = require('cors');
app.use(cors());
app.use(express.json());
const {LoggerService} = require('./logger-service');
const logger = new LoggerService();


const { getPensionerDetailByAadhaar, getAllPensionerDetails, updatePensionerDetails, deletePensioner, createPensionerDetail }  = require('./pensioner-service')

// create a new pensioner
app.get("/getPensionerDetailByAadhaar/:aadhaar", checktoken, cors(), getPensionerDetailByAadhaar);

app.get("/getAllPensionerDetails", checktoken, cors(), getAllPensionerDetails);

app.post("/createPensionerDetail", checktoken, cors(),  createPensionerDetail);

app.put("/updatePensionerDetails", checktoken, cors(), updatePensionerDetails);

app.delete("/deletePensioner/:aadhaar", checktoken, cors(),  deletePensioner);

app.listen(process.env.PORT, () => {
  logger.info(`pensioner detail service is working at port  ${process.env.PORT}`);
});