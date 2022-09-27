const pool = require("../../config/database")




module.exports = {
   //if we get error it will be passed as data and callback will be null
    //if execution is successful the callback will have data

    create:(data,callback) => {
        pool.query(
            `insert into registration (firstName,lastName,gender,email,password,number)
            values(?,?,?,?,?,?)`,
            [
                data.first_Name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number,

            ],
            (error,results, fields) => {
if(error){
    return callback(error);
    }
    return callback(null,results);

            }
        );
    },
};


