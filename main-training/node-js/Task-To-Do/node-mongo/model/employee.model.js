const mongoose = require("mongoose");


const employeeSchema = mongoose.Schema({
    EmpID: {
        type: Number,
        require: true
    },

    EmpName: {
        type: String,
        require: true
    },
    EmpSalary: {
        type: Number,
        require: true
    },
    Empdesignation: {
        type: String,
        require: true
    },
    EmployeeEmail: {
        type: String,
        require: true
    },
    EmployeeQualification: {
        type: String,
        require: true
    }



})
//mongoose.model("employees",employeeSchema)
module.exports = mongoose.model("employees",employeeSchema)

