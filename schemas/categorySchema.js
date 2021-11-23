const mongoose = require('mongoose');

const categorySchema=mongoose.Schema(
    {
       
    name: String,
    value:String


    }
)

module.exports=categorySchema;