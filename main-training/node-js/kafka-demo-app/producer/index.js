console.log("producer");
import e from "express";
import Kafka from "node-rdkafka";

const stream = Kafka.createWriteStream(
  {
    "metadata.broker.list": "localhost:9092",
  },
  {},
  { topic: "test" }
);


function queueMessage() {
    const success = stream.write(Buffer.from("Hey my name is nishant"));
    if(success){
      console.log("message published successfully to stream");
    } else {
      console.log("something went wrong");
    }
}
setInterval(()=>{
    queueMessage();
}, 3000)