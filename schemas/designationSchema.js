const mongoose = require('mongoose');

const designationSchema=mongoose.Schema(
    {
       
    name: String,
    value:String


    }
)

module.exports=designationSchema;