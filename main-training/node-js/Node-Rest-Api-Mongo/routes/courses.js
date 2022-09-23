const ex=require("express")
const Course = require("../models/course");

const router=ex.Router();


//get all courses
router.get("/allcourses", async(req,res) => {
    try{
        const courses = await Course.find();
        res.json(courses);
        
    }catch(err){
        res.json(err);
    }
    
})

//add a course
router.post("/",async(req,res) =>{
    try{
        const courses = await Course.create(req.body);
        res.json(course);
        
    }catch(err){
        res.json(err);
    }
})

//creating my routes

module.exports = router;