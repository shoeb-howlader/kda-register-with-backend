const express=require('express');
const mongoose =require('mongoose')
const router =express.Router();
const departmentSchema = require('../schemas/departmentSchema')
const Department = new mongoose.model('Department', departmentSchema)


//get all Products
router.get('/', async (req,res)=>{
    await Department.find({},(err,data)=>{
    if(err){

        res.status(500).json({
            error:"there was a serverside error"
        })
    }
    else{
        res.status(200).json(data)
    }
}).clone()

})

router.post('/', async (req,res)=>{
    const newDepartment  = new Department(req.body);
    await newDepartment.save(err=>{
        if(err){
    
            res.status(500).json({
                error:"there was a serverside error"
            })
        }
        else{
            res.status(200).json({
                msg:"Product  was inserted succesfully"
            })
        }
        
    })
    })










module.exports=router;
