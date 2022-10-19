console.log("producer");
import Kafka from "node-rdkafka";

const stream = Kafka.createWriteStream(
  {
    "metadata.broker.list": "localhost:9092",
  },
  {},
  { topic: "test" }
);


function queueMessage() {
    const result = stream.write(Buffer.from("Hey my name is nishant"))
    console.log(result);
}
setInterval(()=>{
    queueMessage();
}, 3000)