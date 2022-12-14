
module.exports = {
    success: (res, result) => {        
        return res.status(200).json({
            success: 1,
            data: result,
        });
    },
    success:(res,result,jsonToken)=>{        
        return res.status(200).json({
            success: 1,
            message: result,
            token: jsonToken
          });
    },
    fail: (res, message) => {            
        return res.status(500).json({
            success: 0,
            message: message,
        });
    },
    

};