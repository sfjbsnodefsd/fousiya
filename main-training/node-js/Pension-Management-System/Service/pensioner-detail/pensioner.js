const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BankDetailsSchema = mongoose.Schema({
    BankName: String,
    AccountNumber: Number,
    PublicOrPrivateBank: String
});

  

const PensionerSchema = new Schema({
    Name: String,
    DateOfBirth: String,
    AadhaarNumber:String,
    PAN: String,
    SalaryEarned: Number,
    Allowances: Number,
    SelfOrFamilyPension: String,
    BankDetails: BankDetailsSchema
});

module.exports = PensionerDetail = mongoose.model("pensioner", PensionerSchema);