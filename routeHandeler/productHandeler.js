const express=require('express');
const mongoose =require('mongoose')
const router =express.Router();
const productSchema = require('../schemas/productSchema')
const Product = new mongoose.model('Product', productSchema)


//get all Products
router.get('/', async (req,res)=>{
    await Product .find({},(err,data)=>{
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

router.get('/:id', async (req,res)=>{
    await Product .find({_id:req.params.id},(err,data)=>{
        if(err){
    
            res.status(500).json({
                error:"there was a serverside error"
            })
        }
        else{
            res.status(200).json({
               data
            })
        }
    })
})

router.post('/', async (req,res)=>{
const newProduct  = new Product (req.body);
await newProduct .save(err=>{
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

router.post('/all', async (req,res)=>{

    await Product .insertMany(req.body, err=>{
        if(err){
    
            res.status(200).json({
                error:"there was a serverside error"
            })
        }
        else{
            res.status(500).json({
                msg:"Many Product  was inserted succesfully"
            })
        }
        
    })
    })

router.put('/:id', async (req,res)=>{
   

        // your code
        await Product.updateOne({_id:req.params.id},{
            $set:req.body}
            ).then(() => {
                
                res.status(200).json({
                    msg:" Product  was updated succesfully"
                })
            })
            .catch(err => {
                res.status(500).json({
                    error:err
                })
                
            }
            )
      }
     


)

router.delete('/:id', async (req,res)=>{
    await Product .deleteOne({_id:req.params.id})
    .then(() => {
                
        res.status(200).json({
            msg:" Product  was deleted succesfully"
        })
    })
    .catch(err => {
        res.status(500).json({
            error:"there was a serverside error" 
        })
        
    }
    )

})


module.exports=router;
