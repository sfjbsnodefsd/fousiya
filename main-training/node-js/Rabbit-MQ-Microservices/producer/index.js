const express = require("express");
const app = express();
const amqp = require("amqplib");
var channel, connection;
async function connect() {
  try {
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("Rabbit");
  } catch (err) {
    console.log(err);
  }
}
connect();


app.get("/send",async (req, res) => {
  
});
app.listen(5001, () => {
  console.log("server is running at port 5000");
});