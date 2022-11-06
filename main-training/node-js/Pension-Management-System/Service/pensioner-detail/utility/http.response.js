
module.exports = {
    sucess: (res, result) => {
        return res.status(200).json({
            sucess: 1,
            data: result,
        });
    },
    success:(res,result,jsonToken)=>{
        return res.status(200).json({
            sucess: 1,
            message: result,
            token: jsonToken
          });
    },
    fail: (res, message) => {
        console.log(message);
        return res.status(500).json({
            sucess: 0,
            message: message,
        });
    },
    

};