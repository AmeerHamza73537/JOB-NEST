import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import user from '../model/user.js'
import { errorHandler } from '../utils/error.js';

export const signup = async(req, res, next)=>{
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return next(errorHandler(400, 'Please provide all required fields.'))
    }
    if(password.length < 8){
        errorHandler(400, 'Password must be at least 8 characters long.')
    }
    try {
        const existingUser = await user.findOne({ $or: [{email}] })
        if(existingUser){
            return next(errorHandler(400, 'User already exists with this email.'))
        }
        const hashPassword = await bcryptjs.hash(password, 12);
        const newUser = new user({ name, email, password: hashPassword})
        await newUser.save();
        res.status(201).json('New User Created Successfully.')
    } catch (error) {
        next(error);
    }
}