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
    channel.consume("Rabbit", data => {
        console.log(`recived the data from the producer : ${Buffer.from( data.content)}`);
        //channel.ack(data)
    })
  } catch (err) {
    console.log(err);
  }
}
connect();
app.get("/send", (req, res) => {});
app.listen(5002, () => {
  console.log("server is running at port 5002");
});