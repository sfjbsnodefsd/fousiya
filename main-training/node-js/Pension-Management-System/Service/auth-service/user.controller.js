const {hashSync} = require("bcrypt");
const {create,getUserByUserEmail} = require("./user.service");
const { genSaltSync,compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken")


module.exports = {
    createUser: async (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        await create(req,res ,(err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    sucess: 0,
                    message: "Database connnection error",
                });
            }
            return res.status(200).json({
                sucess: 1,
                data: results,
            });
        });
    },

    login: (req, res) => {
        console.log('login method called');
        const body = req.body;

        getUserByUserEmail(req, (err, dbUser) => {
          if (err) {
            console.log(err);
            return res.json({
                sucess: 0,
                message: `Error Found ${err}`,
              });
          }
        
          if (!dbUser) {
            return res.json({
              sucess: 0,
              message: "Invalid email or password",
            });
          }
         
          const result = compareSync(body.password, dbUser.password);
          if (result) {
            dbUser.password = undefined;
            console.log(dbUser.password);
            const jsontoken = sign({ result: dbUser }, "secret", {
              expiresIn: "1h",
            });
            return res.json({
              sucess:1,
              message:"Login sucessfully ",
              token: jsontoken
            });
          } else  {
            return res.json({
              success : 0 ,
              data:"Invalid email or password"
            })
          }
        });
      },
}