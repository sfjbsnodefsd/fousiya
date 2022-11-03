const jwt = require("jsonwebtoken");

// module.exports = async function isAuthenticated(req, res, next) {
//   // Bearer <token>
//   const token = req.headers["authorization"]?.split(" ")[1];

//   jwt.verify(token, "secret", (err, user) => {
//     if (err) {
//       return res.json({
//         sucess: 0,
//         message: "Unauthoroized",
//       });
//     } else {
//       req.user = user;
//       next();
//     }
//   });
// };

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      token = token.slice(7);
      verify(token, process.env.KEY, (err, decoded) => {
        if (err) {
          res.json({
            sucess: 0,
            message: "Invalid token",
          });
        } else {
          next();
        }
      });
    } else {
      res.json({
        sucess: 0,
        message: "Access denied, Unauthorized user",
      });
    }
  },
};