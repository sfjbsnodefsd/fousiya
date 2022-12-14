const express = require("express");
const app = express();
require("dotenv").config();
const request = require("request");
app.use(express.json());
const checktoken = require('./isAuthenticated');
const {success,fail} = require('./http.response')
const cors = require('cors');
app.use(cors());
const {LoggerService} = require('./logger-service');
const logger = new LoggerService();

app.post("/ProcessPension",checktoken,cors(), async (req, res) => {
    const { aadhaar } = req.body;
    logger.info(`aadhaar number ${aadhaar}`)
    const auth = req.header('authorization');
    try {
        const pensioner = await getPensionDetails(aadhaar,auth);       
        if(!pensioner){
            return fail(res,"API Error");
        }

        if(!pensioner.success){
            return fail(res,pensioner.message);
        }
        logger.info(pensioner);
        
        const { SalaryEarned, Allowances, SelfOrFamilyPension, BankDetails } = pensioner.message;
        const percentage = getPercentage(SelfOrFamilyPension);

        const _pensionAmount = (percentage * SalaryEarned) + Allowances;
        const _serviceCharge = getServiceCharge(BankDetails);
        //return result
        return success(res,{
            pensionAmount: _pensionAmount,
            bankServiceCharge: _serviceCharge
        });



    } catch (err) {
        //log error
        throw err;
    }

});
//process.env.PENSIONER_DETAIL_SERVICE
const PENSIONER_DETAIL_SERVICE=  'http://localhost:5001';

const getPensionDetails = (aadhaar,auth) => {

    return new Promise((resolve, reject) => {
        try {
            const url = `${PENSIONER_DETAIL_SERVICE}/getPensionerDetailByAadhaar/${aadhaar}`            
            request.get(url, { json: true , headers : {
                "Authorization" : auth
            } }, (err, result, body) => {
                if (err) {
                    logger.error(JSON.stringify(err));
                    reject(err);
                }
                else
                    resolve(body);
            });
        } catch (err) {
            logger.error(JSON.stringify(err));
            reject(err);
        }
    });
}

const getPercentage = (SelfOrFamilyPension) => {
    let percentage = null;
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



app.listen(5002, () => {
    logger.info(`process-pension service is working at port ${process.env.PORT}`);
});