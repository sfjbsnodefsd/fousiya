const {verify} = require("jsonwebtoken")
module.exports ={
   checkToken: (req,res,next) => {
    const token = req.get("autherization");
    if(token){
        token = token.slice(7);
        verify(token,process.env.KEY,(err,decoded) => {
            if(err){
                res.json({
                    success: 0,
                    message:"Invalid token",
                });
            }else{
                next();
            }
        }) ;

    }else {
        res.json({
            success: 0,
            message:"Access denied, Unautherized user",
        });
    }
   },
}