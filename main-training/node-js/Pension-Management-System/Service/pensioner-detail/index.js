const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const PensionerDetail = require("./pensioner");
const checktoken = require('./isAuthenticated');
var csv = require('csvtojson');
const { success, fail } = require('./http.response')
const cors = require('cors');
const { request } = require("express");
app.use(cors());
app.use(express.json());
const GENERIC_EXCEPTION = "An Exception Has Occured."

mongoose.connect("mongodb://127.0.0.1:27017/pensioner-service", { useNewUrlParser: true, useUnifiedTopology: true, }, function (err, db) {

if (err) throw err;

console.log(`pensioner service DB  Connected`);
csv()
  .fromFile(`${__dirname}/data/pensioner-details.csv`)
  .then(async (response) => {
    //console.log(response);
    for (var x = 0; x < response.length; x++) {

      //check whether pensioner details already added
      const pensioner = await PensionerDetail.findOne({ AadhaarNumber: response[x].AadhaarNumber });
      if (pensioner) //if exists , continue processing next from for loop
        continue;

      const pensionerDetail = new PensionerDetail({
        Name: response[x].Name,
        DateOfBirth: response[x].DateOfBirth,
        AadhaarNumber: response[x].AadhaarNumber,
        PAN: response[x].PAN,
        SalaryEarned: response[x].SalaryEarned,
        Allowances: response[x].Allowances,
        SelfOrFamilyPension: response[x].SelfOrFamilyPension,
        BankDetails: {
          BankName: response[x].BankName,
          AccountNumber: response[x].AccountNumber,
          PublicOrPrivateBank: response[x].PublicOrPrivateBank
        },
      });

      pensionerDetail.save();  //save pensioner details using PensionerDetail schema object

    }

  })
});


// create a new pensioner
app.get("/getPensionerDetailByAadhaar/:aadhaar", checktoken, cors(), async (req, res) => {
  try {
    console.log(req);
    const pensioner = await PensionerDetail.findOne({ AadhaarNumber: req.params.aadhaar });
    if (pensioner) {
      return success(res, pensioner);
    }
    else {
      return fail(res, `The Aadhaar ${req.params.aadhaar} Details Not Found`);
    }
  }
  catch (dbCallError) {
    console.log(dbCallError);
    return res.status(400).send(GENERIC_EXCEPTION);
  }
});

app.get("/getAllPensionerDetails", checktoken, cors(), async (req, res) => {
  try {
    console.log(req);
    PensionerDetail.find({}, (error, pensioners) => {
      if (error) {
        console.log(error);
        return fail(res, "There was an error while fetching pensioners details");
      }
      return success(res, pensioners);
    });
  }
  catch (dbCallError) {
    console.log(dbCallError);
    return res.status(400).send(GENERIC_EXCEPTION);
  }
});

app.post("/createPensionerDetail", checktoken, cors(), async (req, res) => {
  try {
    const pensionerRequest = req.body;
    const { AadhaarNumber } = req.body;
    const pensioner = await PensionerDetail.findOne({ "AadhaarNumber": AadhaarNumber });
    if (pensioner) {findOne
      return fail(res, "Pensioner details already exists");
    }

    const newPensionerDetail = new PensionerDetail({
      Name: pensionerRequest.Name,
      DateOfBirth: pensionerRequest.DateOfBirth,
      AadhaarNumber: pensionerRequest.AadhaarNumber,
      PAN: pensionerRequest.PAN,
      SalaryEarned: pensionerRequest.SalaryEarned,
      Allowances: pensionerRequest.Allowances,
      SelfOrFamilyPension: pensionerRequest.SelfOrFamilyPension,
      BankDetails: {
        BankName: pensionerRequest.BankDetails.BankName,
        AccountNumber: pensionerRequest.BankDetails.AccountNumber,
        PublicOrPrivateBank: pensionerRequest.BankDetails.PublicOrPrivateBank
      }

    })

   const createdPensionerDetail = await newPensionerDetail.save();
   console.log(createdPensionerDetail);
   return success(res,`The Aadhaar ${AadhaarNumber} Details successfully created`);

  } catch (err) {
    console.log(err);
    return fail(res,GENERIC_EXCEPTION,400)
  }

});


app.put("/updatePensionerDetails", checktoken, cors(), async (req, res) => {
  try {
    const pensionerRequest = req.body;
    const { AadhaarNumber } = req.body;
    const pensioner = await PensionerDetail.findOne({ "AadhaarNumber": AadhaarNumber });
    if (!pensioner) {
      return fail(res, "Pensioner details not found");
    }

    const updatedPensioner = {
      $set: {
        "Name": pensionerRequest.Name,
        "DateOfBirth": pensionerRequest.DateOfBirth,
        "AadhaarNumber": pensionerRequest.AadhaarNumber,
        "PAN": pensionerRequest.PAN,
        "SalaryEarned": pensionerRequest.SalaryEarned,
        "Allowances": pensionerRequest.Allowances,
        "SelfOrFamilyPension": pensionerRequest.SelfOrFamilyPension,
        "BankDetails": {
          "BankName": pensionerRequest.BankDetails.BankName,
          "AccountNumber": pensionerRequest.BankDetails.AccountNumber,
          "PublicOrPrivateBank": pensionerRequest.BankDetails.PublicOrPrivateBank
        }

      }
    }

    try {
      const result = await PensionerDetail.updateOne({ "AadhaarNumber": AadhaarNumber }, updatedPensioner);
      if (result.matchedCount == 1 && result.modifiedCount == 1)
        return success(res, `The ${AadhaarNumber} Details Updated successfully`);
      else {
        return fail(res, `The ${AadhaarNumber} Details Not Updated`);
      }
    } catch (err) {
      console.log(dbCallError);
      return res.status(400).send(GENERIC_EXCEPTION);
    }

  } catch (err) {
    console.log(err);
    return res.status(400).send(GENERIC_EXCEPTION);
  }

});

app.delete("/deletePensioner", checktoken, cors(), async (req, res) => {
  const { AadhaarNumber } = req.body;
  try {
    const pensioner = PensionerDetail.findOne({ "AadhaarNumber": AadhaarNumber });
    if (pensioner) {
      const deleted = await PensionerDetail.deleteOne({ "AadhaarNumber": AadhaarNumber });

      if (deleted.deletedCount == 1)
        return success(res, `The Aadhaar ${req.params.aadhaar} Deleted Successfully`);
      else {
        console.log(deleted);
        return fail(res, `The Aadhaar ${req.params.aadhaar} Not Deleted Successfully`);
      }
    }
    else {
      return fail(res, `The Aadhaar ${req.params.aadhaar} Does Not Exists`)
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(GENERIC_EXCEPTION);
  }

});

app.listen(5001, () => {
  console.log(`pensioner detail service is working at port 5001 ${process.env.PORT}`);
});