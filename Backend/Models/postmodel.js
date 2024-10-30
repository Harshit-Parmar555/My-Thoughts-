const mongoose = require("mongoose");

const postschema = new mongoose.Schema({
    topic : {
        type : String,
        required : [true , "topic is required"]
    },
    thought : {
        type : String,
        required : [true , "thought is required"]
    },
    user : {
        type : mongoose.Types.ObjectId,
        ref : "user",
        required : [true , "user is required"]
    }

})

const postmodel = mongoose.model("post" , postschema);

module.exports = postmodel