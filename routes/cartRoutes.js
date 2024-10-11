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

//add the prod to cart
router.post('/',async(req,res)=>{
    try{
        const productId=req.body.productId
        const product=await Product.findById(productId)

        if(product && product.stock>0){
            let cart=await Cart.findOne()

            if(!cart){//Creating the cart collection in the database
                cart=new Cart({products:[]})
            }

            let existingProductIndex=cart.products.findIndex(p=>p.product.toString()===productId)
            if(existingProductIndex>=0){//if the product is already in the cart
                cart.products[existingProductIndex].quantity++//increase the quantity of the product
            }
            else{
                cart.products.push({product:productId,quantity:1})
            }

            product.stock--;
            await product.save();
            await cart.save();

            res.redirect('/api/products');
        }
        else {
            res.status(400).send('Product is out of stock');
        }
    }
    catch(err){
        console.error(err)
        res.status(500).send('Server error')
    }
});

module.exports=router