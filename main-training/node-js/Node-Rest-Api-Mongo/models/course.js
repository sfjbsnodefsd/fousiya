const mongoose = require("mongoose")
const  Course = mogoose.Schema({
    title:{
        type:String,
        require:true
    },
    genre:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    active:Boolean

})
module.exports = mongoose.model("courses",Course)