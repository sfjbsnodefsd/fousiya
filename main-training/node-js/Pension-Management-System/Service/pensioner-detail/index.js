const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const PensionerDetail = require("./pensioner");
const checktoken = require('./isAuthenticated');
var csv = require('csvtojson');
const { success, fail } = require('./http.response')
const cors = require('cors');
app.use(cors());
app.use(express.json());


mongoose.connect(
  "mongodb://localhost:27017/pensioner-service",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`pensioner service DB  Connected`);
    // console.log(pro);
    //add data from csv

    csv()
      .fromFile("./data/pensioner-details.csv")
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
  }
);



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
    return res.status(400).send(dbCallError);
  }
});


app.put("/updatePensionerDetails",checktoken,cors(), async (req, res) => {
  try {
    console.log(req.body.Name);
    const { AadhaarNumber } = req.body;
    const pensioner = await PensionerDetail.findOne({ "AadhaarNumber": AadhaarNumber });
    if (!pensioner) {
      return fail(res, "Pensioner details not found");
    }

    const updatedPensioner = {
      $set: {
        "Name": req.body.Name,
        "DateOfBirth": req.body.DateOfBirth,
        "AadhaarNumber": req.body.AadhaarNumber,
        "PAN": req.body.PAN,
        "SalaryEarned": req.body.SalaryEarned,
        "Allowances": req.body.Allowances,
        "SelfOrFamilyPension": req.body.SelfOrFamilyPension,
        "BankDetails": {
          "BankName": req.body.BankName,
          "AccountNumber": req.body.AccountNumber,
          "PublicOrPrivateBank": req.body.PublicOrPrivateBank
        }

      }
    }

    PensionerDetail.updateOne({ "AadhaarNumber": AadhaarNumber }, updatedPensioner, (err, results) => {
      if (err) {
        return fail(res, "failed to update pensioner ")

      }
      else {
        console.log(results);
        return success(res, `The ${AadhaarNumber} Details Updated successfully`);
      }
    })
  }

  catch (dbCallError) {
    return res.status(400).send(dbCallError);
  }

})













app.listen(5001, () => {
  console.log(`pensioner detail service is working at port 5001 ${process.env.PORT}`);
});