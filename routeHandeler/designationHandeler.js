const express=require('express');
const mongoose =require('mongoose')
const router =express.Router();
const designationSchema = require('../schemas/designationSchema')
const Designation= new mongoose.model('Designation', designationSchema)


//get all Products
router.get('/', async (req,res)=>{
    await Designation.find({},(err,data)=>{
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
    const newDesignation  = new Designation(req.body);
    await newDesignation.save(err=>{
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
