const  mongoose = require("mongoose");
const mongoose = mongoose.Schema;




const PensionerSchema = new mongoose.Schema({
    Name: String,
    DateOfBirth: Date,
    PAN: string,
    SalaryEarned: Number,
    Allowance: Number,
    SelfOrFamilyPension: string,
    BankDetails: {
        BankName: string,
        AccountNumber: Number,
        PublicOrPrivateBank: string
    }


});



module.exports = Pensioner = mongoose.model("pensioner",UserSchema);
