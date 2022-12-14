const { hashSync } = require("bcrypt");
const { create, getUserByUserEmail } = require("../service/user.service");
const { genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken")
const { success, fail } = require('../http.response')
const {LoggerService} = require('../logger-service');
const logger = new LoggerService();



module.exports = {
  createUser: async (req, res) => {
    const user = req.body;
    const salt = genSaltSync(10);
    user.password = hashSync(user.password, salt);

    await create(user, (errorMessage, newUser) => {
      if (errorMessage) {
        return fail(res, errorMessage);
      }
      else {
        return success(res, newUser);
      }
    });
  },

  login: (req, res) => {
    logger.info('login method called');
    const user = req.body;

    getUserByUserEmail(user, (err, dbUser) => {
      if (err) {
        return fail(res, err);
      }
      else {
        const result = compareSync(user.password, dbUser.password);
        if (result) {
          dbUser.password = undefined;
          logger.info(dbUser.password);
          const jsontoken = sign({ result: dbUser }, "secret", {
            expiresIn: "30m",
          });
          return success(res, "Login sucessfully ", jsontoken);
        } else {
          return fail(res, "Invalid email or password");
        }
      }
    });

  },
}