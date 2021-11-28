const mongoose = require('mongoose');

const productSchema=mongoose.Schema(
    {
       
        category: String,
        CurrentUser: String,
        supplyDescription:String,
        productDescription: String,
        status: String,
        supplier: String,
        date: Date,
        userDetails: [
          {
            name: String,
            date: Date,
            comment: String,
            designation: String,
            department: String
          }
        ],
        CurrentUserDesignation: String,
        CurrentUserDepartment: String
      }



)

module.exports=productSchema;