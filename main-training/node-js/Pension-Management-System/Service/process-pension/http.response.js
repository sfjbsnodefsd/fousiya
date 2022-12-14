
module.exports = {
    success: (res, result) => {        
        return res.status(200).json({
            success: 1,
            message: result,
        });
    },
    fail: (res, message) => {            
        return res.status(500).json({
            success: 0,
            message: message,
        });
    },
    

};