//console.log("Hello this is Nishant, I hope you are having a great day! ");
const http = require('http');

    function greet(req,res) {
    res.write("<h1>Hello this is Fousya, I hope you are having a great day!<h1> ")
    res.end();

}
http.createServer(greet).listen(5000);