const mongoose = require('mongoose');

const userSchema=mongoose.Schema(
    {
    
    name: String,
    username:String,
    email:String,
    password:String,
    status:String


    }
)

module.exports=userSchema;