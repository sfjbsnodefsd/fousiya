const {createPool} = require("mysql");



const pool = createPool({
    port:3306,
    host:"localhost",
    password:"welcome$1234",
    database:"test",
    connectionLimit:10
})
module.exports = pool;