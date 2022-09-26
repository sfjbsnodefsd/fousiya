const express = require("express");
const app = express();
app.get("/api", (req,res) => {
res.json({
    success: 1,
    message: "This rest api is working",
});
});
app.listen(3000,() =>{
    console.log("Server is up and running");
});