const Employee = require("../model/employee.model");
const ex = require("express");
const router = ex.Router();



router.get("/getAllEmployee", async (req, res) => {
    console.log("inside the function- get all records");

    try {
        const employees = await Employee.find();
        res.json(employees);
        console.log("inside the function- try- catch-get all records");
    }
    catch (err) {
        res.json(err);

    }


})
console.log("outside of the function - inserted records");

router.post("/addEmployee", async (req, res) => {
    console.log("inside the function- inserted records");
    try {
        const employee = await Employee.create(req.body);
        res.json(employee);
        console.log("successfully inserted records");
    }
    catch (err) {
        res.json(err);
    }

});

router.delete("/deleteEmployee/:empId", async (req, res) => {
    try {
        await Employee.remove({ _id: req.params.empId });
        res.status(200).json({
            message: "deleted successfully"
        });

    }
    catch (err) {
        res.json(err);
    }

});

// console.log("outside update");
// router.put("/updateEmployee", async (req, res) => {
//    // const empId = req.params.empId;

//     console.log("inside update");
//     try {
//         const employee = await Employee.updateOne({ _id :req.body._id}, req.body);
//         res.send(employee)
//     }
//     catch (err) {
//         res.json(err);

//     }
// });
console.log("outside update");
router.put("/updateEmployee/:empId", async (req, res) => {
   const empId = req.params.empId;

    console.log("inside update");
    try {
        const employee = await Employee.updateOne({ _id :empId}, req.body);
        res.send(employee)
    }
    catch (err) {
        res.json(err);

    }
});





module.exports = router;