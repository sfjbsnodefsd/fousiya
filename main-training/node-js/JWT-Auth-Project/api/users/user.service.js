const pool = require("../../config/database")




module.exports = {
    //if we get error it will be passed as data and callback will be null
    //if execution is successful the callback will have data

    create: (data, callback) => {
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
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    getUsers: (callBack) => {

        pool.query(
    
          //`select id,firstName,lastName,gender,email,number from registration`,
          `select * from registration`,
    
          [],
    
          (error, results, fields) => {
    
            if (error) {
    
              return callBack(error);
    
            }
    
            return callBack(null, results);
    
          }
    
        );
    
      },
    
      getUserById: (id,callBack) => {
    
        pool.query(
    
          `select id,firstName,lastName,gender,email,number from registration where id = ?`,
    
          [id],
    
          (error, results, fields) => {
    
            if (error) {
    
              return callBack(error);
    
            }
    
            return callBack(null, results);
    
          }
    
        );
    
      },
updateUser: (data, callback) => {
    pool.query(
        `update registration set firstName =?, lastName =?, email =? password=?,number=? where id = ?`,
        [
            data.first_Name,
            data.last_name,
            data.gender,
            data.email,
            data.password,
            data.number
        ], (error, results, fields) => {
            if (error) {
                callback(error);
            }
            return callback(null, results)
        }

    )
},

deleteUser: (data, callback) => {
    pool.query(
        `delete from registration where id = ?`,
        [data.id],
        (error, results, fields) => {
            if (error) {
                callback(error);
                return callback(error);
            } return callback(null, results[0]);
        }
    )
},


};



