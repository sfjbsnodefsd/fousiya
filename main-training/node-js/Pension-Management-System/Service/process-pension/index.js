const express = require("express");
const app = express();
require("dotenv").config();
const request = require("request");
app.use(express.json());
const checktoken = require('../isAuthenticated');
const {success,fail} = require('../http.response')

app.post("/ProcessPension",checktoken, async (req, res) => {
    const { aadhaar } = req.body;
    console.log(`aadhaar number ${aadhaar}`)
    const auth = req.header('authorization');
    try {
        const pensioner = await getPensionDetails(aadhaar,auth);
        if(!pensioner){
            return fail(res,"API Error");
        }

        if(!pensioner.success){
            return fail(res,pensioner.message);
        }
        console.log(pensioner);
        const { SalaryEarned, Allowances, SelfOrFamilyPension, BankDetails } = pensioner.message;
        const percentage = getPercentage(SelfOrFamilyPension);

        const _pensionAmount = (percentage * SalaryEarned) + Allowances;
        const _serviceCharge = getServiceCharge(BankDetails);
        //return result
        res.status(200).json({
            pensionAmount: _pensionAmount,
            bankServiceCharge: _serviceCharge
        });



    } catch (err) {
        throw err;
    }

});



const getPensionDetails = (aadhaar,auth) => {

    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.PENSIONER_DETAIL_SERVICE}/getPensionerDetailByAadhaar/${aadhaar}`            
            request.get(url, { json: true , headers : {
                "Authorization" : auth
            } }, (err, result, body) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else
                    resolve(body);
            });
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}

const getPercentage = (SelfOrFamilyPension) => {
    var percentage = null;
    if (SelfOrFamilyPension !== null) {
        switch (SelfOrFamilyPension.toString().toUpperCase()) {
            case "SELF":
                percentage = .80;
                break;
            case "FAMILY":
                percentage = .50;
                break;

        }
    }
    return percentage;
}

const getServiceCharge = (BankDetails) => {
    let serviceCharge;
    if (BankDetails) {
        switch (BankDetails.PublicOrPrivateBank.toString().toUpperCase()) {
            case "PRIVATE":
                serviceCharge = 550;
                break;
            case "PUBLIC":
                serviceCharge = 500;
                break;


        }

    }
    return serviceCharge;
}



app.listen(7000, () => {
    console.log(`process-pension service is working at port ${process.env.PORT}`);
});