const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//user register schema


const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    created_at: {
        type: Date,
        default: Date.now()
    }
});



module.exports = User = mongoose.model("user", UserSchema);
