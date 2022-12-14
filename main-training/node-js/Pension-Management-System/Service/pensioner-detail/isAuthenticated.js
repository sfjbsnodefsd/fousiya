const jwt = require("jsonwebtoken");
const {LoggerService} = require('./logger-service');
const logger = new LoggerService();

module.exports = async function isAuthenticated(req, res, next) {
 
  const token = req.headers["authorization"]?.split(" ")[1];
  logger.info(token);
    jwt.verify(token, "secret", (err, user) => {
    if (err) {
      logger.info(`token ${token} is invalid`);
      return res.status(500).json({
        success: 0,
        message: "Unauthoroized",
      });
    } else {      
      req.user = user;
      next();
    }
  });
}
