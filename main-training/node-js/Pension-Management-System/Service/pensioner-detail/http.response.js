
module.exports = {
    success: (res, result) => {        
        return res.status(200).json({
            success: 1,
            message: result,
        });
    },
    fail: (res, message,status = 500) => {          
        return res.status(status).json({
            success: 0,
            message: message,
        });
    },
    

};