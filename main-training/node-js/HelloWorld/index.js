const express = require('express');

const app = express();






app.get('/', (req, res) => {
    res.send('Hello World this app is running on a docker');
  });



app.listen(3000, () => {
    console.log("this app is listening to port 3000");
  });