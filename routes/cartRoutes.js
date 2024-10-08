const express=require('express')
const router=express.Router()

const Product=require('../models/Product')
const Cart=require('../models/Cart')

//GET THE CART PAGE
router.get('/',async(req,res)=>{
    try{
        const cart=await Cart.findOne().populate('products.product')
        res.render('cart',{cart})
    }catch(err){
        console.error(err)
        res.status(500).send('Server error')
    }
})

module.exports=router