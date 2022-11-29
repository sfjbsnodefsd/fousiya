const express = require("express");
const app = express();
const port = 5000;



app.get("/",(req,res)=>{
    res.send("Hello world my name is Fousiya");
})


app.listen(port,()=>{
    console.log(`app is listening to ${port}`)
})
