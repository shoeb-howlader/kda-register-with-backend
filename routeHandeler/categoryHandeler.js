const express=require('express');
const mongoose =require('mongoose')
const router =express.Router();
const categorySchema = require('../schemas/categorySchema')
const Category = new mongoose.model('Category', categorySchema)


//get all Products
router.get('/', async (req,res)=>{
    await Category.find({},(err,data)=>{
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
    const newCategory  = new Category (req.body);
    await newCategory.save(err=>{
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
