const jwt = require("jsonwebtoken");
const {LoggerService} = require('./logger-service');
const logger = new LoggerService();

module.exports = async function isAuthenticated(req, res, next) {
  
  const token = req.headers["authorization"]?.split(" ")[1];  
  logger.info(token);

    jwt.verify(token, "secret", (err, user) => {
    if (err) {
      return res.json({
        sucess: 0,
        message: "Unauthoroized",
      });
    } else {
      logger.info(`token ${token} is valid`);
      req.user = user;
      next();
    }
  });
}
