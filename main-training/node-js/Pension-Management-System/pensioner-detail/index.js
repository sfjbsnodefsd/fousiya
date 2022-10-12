const express = require("express");
const app = express();
const PORT = process.env.PORT;
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const amqp = require("amqplib");
const Product = require("./pensioner");
const isAuthenticated = require("../isAuthenticated");
const fs = require("fs");
const { parse } = require("csv-parse");
var csv = require('csvtojson')

app.use(express.json());
var channel, connection;



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
          const pensioner = await PensionerDetail.findOne({AadhaarNumber: response[x].AadhaarNumber});          
          if(pensioner) //if exists , continue processing next from for loop
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


//QUEUE PROCESS STARTS

//create PENSION_DETAIl queue
async function connect() {
  const amqpServer = "amqp://localhost:5672";
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue("PENSION_DETAIL");
}

connect().then(function () {    //queue created
  channel.consume("PENSION_DETAIL", async (data) => {
    try {
      console.log("consuming PENSION_DETAIL queue");
      const { aadhaar } = JSON.parse(data.content);

      try {
        const pensioner = PensionerDetail.findOne({ aadhaar });

        //send data to processPension queue success
        channel.sendToQueue("");
      }
      catch (dbCallError) {
        //send data to processPension queue error
        channel.sendToQueue("", { success: false, data: dbCallError });
      }

      channel.ack(data);
    }
    catch (err) {
      //send data to processPension queue error
      channel.sendToQueue("");
    }
  })

});

 

//QUEUE PROCESS ENDS


// create a new pensioner
app.get("/getPensionerDetailByAadhaar/:aadhaar", async (req, res) => {
  try {
    const pensioner = await PensionerDetail.findOne({AadhaarNumber: req.params.aadhaar});
    console.log(req.params.aadhaar);
    console.log(pensioner)
    return res.status(200).send(pensioner);

  }
  catch (dbCallError) {
    return res.status(400).send(dbCallError);
  }
});



app.listen(5001, () => {
  console.log(`product service is working at port 5001`);
});