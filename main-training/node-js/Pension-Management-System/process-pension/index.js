const express = require("express");
const app = express();
require("dotenv").config();
console.log(process.env.PENSIONER_DETAIL_SERVICE);
const endpoint = process.env.PENSIONER_DETAIL_SERVICE;
//const amqp = require("amqplib");
//let channel, connection;
const request = require("request");
app.use(express.json());



app.post("/ProcessPension", async (req, res) => {
    const { aadhaar } = req.body;


    //get pension details
    const url = `${endpoint}/getPensionerDetailByAadhaar/${aadhaar}`
    request.get(url, { json: true }, (err, result, body) => {
        if (err) {
            console.log(err);
            return;
        }


        const { SalaryEarned, Allowances, SelfOrFamilyPension, BankDetails } = body;


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

        const _pensionAmount = (percentage * SalaryEarned) + Allowances;

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

        //return result
        res.status(200).json( {
            pensionAmount: _pensionAmount,
            bankServiceCharge: serviceCharge
        });

    })

});




app.listen(5002, () => {
    console.log(`process-pension service is working at port 5002`);
});