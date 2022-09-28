const { hashSync } = require("bcrypt");
const { create, deleteUser, getUsers, getUserById, updateUser } = require("./user.service");

const { genSaltSync } = require("bcrypt");






module.exports = {

    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            } if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found!"
                })
            } return res.json({
                success: 1,
                data: results
            })
        })
    },

    getUsers : (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
            });
        });

    },
        updateUser: (req, res) => {
            const body = req.body;
            const salt = genSaltSync(10);
            body.password = hashSync(body.password, salt);
            updateUser(body, (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if(!results){
                    res.json({
                        success:0,
                        message:"failed to operate user"

                    })
                }
                return res.json({
                    success: 1,
                    message: "Updated successfully"
                })
            })

        },
        deleteUser: (req, res) => {
            const data = req.body;
            deleteUser(data, (err) => {
                if (err) {
                    console.log(err);
                    return;
                } return res.json({
                    success: 1,
                    message: "User deleted successfully"
                })
            })
        },
};