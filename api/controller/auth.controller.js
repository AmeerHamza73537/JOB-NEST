import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/user.js'
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return next(errorHandler(400, 'Please provide all required fields.'));
    }
    if (password.length < 8) {
        return next(errorHandler(400, 'Password must be at least 8 characters long.'));
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(errorHandler(400, 'User already exists with this email.'));
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ name, email, password: hashPassword });
        await newUser.save();
        return res.status(201).json({ success: true, message: 'New User Created Successfully.' });
    } catch (error) {
        next(error);
    }
};