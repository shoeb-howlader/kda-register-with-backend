const mongoose = require('mongoose');

const departmentSchema=mongoose.Schema(
    {
       
    name: String,
    value:String

    }
)

module.exports=departmentSchema;