const jwt = require("jsonwebtoken")




export async function isAuthenticated(req, res, next) {

    //Bearer <token>


    const token = req.header["authorization"].split("")[1];

    jwt.verify(token, "secret", (err, user) => {
        if (err) {
            return res.json({
                success: 0,
                message: "Unauthorized",
            });

        }
        else {
            req.user = user;
            next();
        }
    });
}