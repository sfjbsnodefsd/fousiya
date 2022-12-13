const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const PensionerDetail = require("./pensioner");
const csv = require('csvtojson');
const { success, fail } = require('./http.response')
const cors = require('cors');
app.use(cors());
app.use(express.json());
const GENERIC_EXCEPTION = "An Exception Has Occured."


mongoose.connect("mongodb://127.0.0.1:27017/pensioner-service", { useNewUrlParser: true, useUnifiedTopology: true, }, function (err, db) {

  if (err) throw err;

  console.log(`pensioner service DB  Connected`);
  csv()
    .fromFile(`${__dirname}/data/pensioner-details.csv`)
    .then(async (response) => {
      for (const element of response) {
        //check whether pensioner details already added
        const pensioner = await PensionerDetail.findOne({ AadhaarNumber: element.AadhaarNumber });
        if (pensioner) //if exists , continue processing next from for loop
          continue;

        const pensionerDetail = new PensionerDetail({
          Name: element.Name,
          DateOfBirth: element.DateOfBirth,
          AadhaarNumber: element.AadhaarNumber,
          PAN: element.PAN,
          SalaryEarned: element.SalaryEarned,
          Allowances: element.Allowances,
          SelfOrFamilyPension: element.SelfOrFamilyPension,
          BankDetails: {
            BankName: element.BankName,
            AccountNumber: element.AccountNumber,
            PublicOrPrivateBank: element.PublicOrPrivateBank
          },
        });
        pensionerDetail.save();  //save pensioner details using PensionerDetail schema object

      }

    })
});


module.exports = {
  
  getPensionerDetailByAadhaar : async (req, res) => {
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
  },
  getAllPensionerDetails :  async (req, res) => {
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
  },
  createPensionerDetail: async (req, res) => {
    try {
      const pensionerRequest = req.body;
      const { AadhaarNumber } = req.body;
      const pensioner = await PensionerDetail.findOne({ "AadhaarNumber": AadhaarNumber });
      if (pensioner) {
        return fail(res, "Pensioner details already exists",400);
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
  
  },

  updatePensionerDetails: async (req, res) => {
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
  
  }
  ,
  deletePensioner: async (req, res) => {
    const  AadhaarNumber  = req.params.aadhaar;
    try {
      const pensioner = PensionerDetail.findOne({ "AadhaarNumber": AadhaarNumber });
      if (pensioner) {
        const deleted = await PensionerDetail.deleteOne({ "AadhaarNumber": AadhaarNumber });
  
        if (deleted.deletedCount == 1)
          return success(res, `The Aadhaar ${AadhaarNumber} Deleted Successfully`);
        else {
          console.log(deleted);
          return fail(res, `The Aadhaar ${AadhaarNumber} Not Deleted Successfully`);
        }
      }
      else {
        return fail(res, `The Aadhaar ${AadhaarNumber} Does Not Exists`)
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send(GENERIC_EXCEPTION);
    }
  
  }


};

   
 