//console.log("Hello this is Nishant, I hope you are having a great day! ");
const http = require('http')  



function greet(req,res){

    res.writeHead(200,{'Content-Type':'application/json'});

    res.write(JSON.stringify({

        "name":"nishant",

        "Empid":"001",



        "address":{

            "street":"xyz street",

            "city":"Bangalore",

            "State":"Karnataka"

        }

    }))

    res.end()

}

 

http.createServer(greet) .listen(5000);

