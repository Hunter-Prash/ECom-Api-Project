const mongoose=require('mongoose')
const  express = require('express');
const app = express();


const mongo_uri=process.env.DB_URI;
const connectDB=async()=>{

    try{
        await mongoose.connect(mongo_uri)
        console.log('DB connected successfully')
    }
    catch(err){
        console.log('Error connecting to DB')
        process.exit(1)
    }

}

module.exports=connectDB;
