import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoute from './route/auth.route.js'
import userRoute from './route/user.route.js'

dotenv.config()
mongoose
    .connect(process.env.MONGO)
    .then(()=>{
        console.log('connected to MONGODB')
    })
    .catch((err)=>console.log(err))
    
const app = express()

app.use(express.json());
app.use(cookieParser());
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:5175', // frontend URL
  credentials: true               // allow cookies or Authorization headers
}));

app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
// app.use('/api/auth',authRoute)

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    console.log(err);

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

app.listen(3000, ()=>{
    console.log('Server is running on PORT 3000'); 
})