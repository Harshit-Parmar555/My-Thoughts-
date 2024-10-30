const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    username : {
        type : String,
        required : [true , "username is required"]
    },
    email : {
        type : String,
        required : [true , "email is required"]
    },
    password : {
        type : String,
        required : [true , "password is required"]
    },
    posts:[
        {
            type : mongoose.Types.ObjectId,
            ref : "post"
        }
    ]
});

const usermodel = mongoose.model("user",userschema);
module.exports = usermodel;