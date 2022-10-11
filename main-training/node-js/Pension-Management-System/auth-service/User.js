const mongoose = require("mongoose");
const Schema = mongoose.Schema;

<<<<<<< HEAD
//user register schema
const UserSchema = new Schema({
    AadharNumber: String,
=======

const UserSchema = new Schema({
    name: String,
>>>>>>> a99b65c2ec474eb216431eb165b67f35cb78810b
    email: String,
    password: String,
    created_at: {
        type: Date,
        default: Date.now()
    }
});

<<<<<<< HEAD
module.exports = User = mongoose.model("user", UserSchema);
=======
module.exports = User = mongoose.model("user", UserSchema);
>>>>>>> a99b65c2ec474eb216431eb165b67f35cb78810b
