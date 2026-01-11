import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
    
dotenv.config()
mongoose
    .connect(process.env.MONGO)
    .then(()=>{
        console.log('connected to MONGODB')
    })
    .catch((err)=>console.log(err))
    
const app = express()

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    console.log(error);
    
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

app.listen(3000, ()=>{
    console.log('Server is running on PORT 3000'); 
})