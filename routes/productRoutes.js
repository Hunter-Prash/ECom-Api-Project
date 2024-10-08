const express = require('express');
const router = express.Router();
const Product=require('../models/Product')


// Create a new product and save it to the database
router.post('/', async (req, res) => {
    try {
        const newProduct = new Product({
            name: req.body.name,
            price: req.body.price,
            stock:Math.floor(Math.random()*11)+10
        });
        await newProduct.save();
        res.redirect('/api/products'); // Redirect to the products list after creation
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating the product');
    }
});


// Get all products from the database
router.get('/', async (req, res) => {
    try {
        const products = await Product.find(); 
        res.render('products', { products }); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Render form to create a new product
router.get('/new', (req, res) => {
    res.render('newProduct'); 
});


module.exports = router;
