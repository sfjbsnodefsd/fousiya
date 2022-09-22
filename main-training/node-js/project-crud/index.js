//const http = require('http')  
const mysql = require("mysql");
const express = require("express");
var app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json());
var mysqlConnection = mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"welcome$1234",
    database:"empoyeedb",
    multipleStatements:"true",
});
mysqlConnection.connect((err) => {

    if(!err){
        console.log("successful connection ");

    }else 
    console.log('DB connection failed' + JSON.stringify(err, undefined, 2) );
});
app.listen(3000, () => console.log("Express server is running"));
app.get('/getemployees',(res,req) => {
    mysqlConnection.query("select * from Employee", (err, rows, fields) => {
        if(!err){
            console.log(rows);
        }else console.log(err);
    })
})
//get employee by id
app.get('/getemployee/:id',(req,res) => {
    mysqlConnection.query("select * from Employee where EmpID = ?", [req.params.id], (err, rows, fields) =>{
        if(!err){
            console.log(rows);
            
        } else console.log(err);
    })
})
app.delete('/deleteemployee/:id',(req,res) => {
    mysqlConnection.query("DELETE  FROM Employee WHERE EmpID = ?", [req.params.id], (err, rows, fields) =>{
        if(!err){
            res.send("deleted raw successfully");
           
        } else console.log(err);
    })
})
//insert an employee
app.post("/addemployee",(req,res) => {
    var sql = "SET @EmpID = ?; SET @Name = ?; SET @EmpCode = ?; SET @Salary = ?;\
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);"
    let emp = req.body;
    mysqlConnection.query(sql, [emp.EmpID,emp.Name,emp.EmpCode,emp.Salary], (err, rows, fields) =>{
        if(!err) rows.forEach(element => {
            if(element.constructor == Array)
            res.send("Employee Id of the inserted employee is : " + element[0].EmpID);
        });
             
        else console.log(err);
    })
});
//update employee
app.put("/updateemployee",(req,res) => {
    
    let emp = req.body;
    var sql = "SET @EmpID = ?; SET @Name = ?; SET @EmpCode = ?; SET @Salary = ?;\
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);"
    mysqlConnection.query(sql, [emp.EmpID,emp.Name,emp.EmpCode,emp.Salary], (err, rows, fields) =>{
        if(!err) 
           res.send("Employee updated successfully");
        else console.log(err);
    })
});