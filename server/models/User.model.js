const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "email is required"],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required:[true, "password is required"],
    },
    name:{
        type: String,
        required:[true, "name is required"],
    },
    
},{timestamps: true})

const User = model("User", userSchema)
module.exports = User 