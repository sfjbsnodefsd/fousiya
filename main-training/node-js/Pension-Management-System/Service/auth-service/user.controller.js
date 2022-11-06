const { hashSync } = require("bcrypt");
const { create, getUserByUserEmail } = require("./user.service");
const { genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken")
const { success, fail } = require('../auth-service/http.response')

module.exports = {
  createUser: async (req, res) => {
    const user = req.body;
    const salt = genSaltSync(10);
    user.password = hashSync(user.password, salt);

    await create(user, (errorMessage, newUser) => {
      if (errorMessage) {       
        fail(res, errorMessage);
      }
      success(res, newUser);
    });
  },

  login: (req, res) => {
    console.log('login method called');
    const user = req.body;

    getUserByUserEmail(user, (err, dbUser) => {
      if (err) {       
        fail(res, err);
      }
      else { 
        const result = compareSync(user.password, dbUser.password);
        if (result) {
          dbUser.password = undefined;
          console.log(dbUser.password);
          const jsontoken = sign({ result: dbUser }, "secret", {
            expiresIn: "30m",
          });
          success(res,"Login sucessfully ",jsontoken);          
        } else {
          fail(res,"Invalid email or password");
        }
      }
    });

  },
}