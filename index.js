const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser=require('body-parser')
const path=require('path')
const app = express();
const productRoutes=require('./routes/productRoutes')
const connectDB=require('./config/db')
const cartRoutes = require('./routes/cartRoutes');



//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs')
app.set('views' , path.join(__dirname,'views'));
app.use(express.static('public'));

connectDB();
app.use('/api/products', productRoutes); // Mount the product routes
app.use('/api/cart', cartRoutes);//mount cart routes
app.get('/', (req, res) => {
    res.render('index.ejs');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});