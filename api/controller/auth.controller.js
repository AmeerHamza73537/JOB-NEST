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

export const signin = async (req, res, next) =>{
    const { email, password } = req.body;
    if (!email || !password) {
        return next(errorHandler(400, 'Please provide all required fields.'))
    }
    try {
        const validUser = await User.findOne({ email });
        if(!validUser) {
            return next(errorHandler(404, 'User not found. Please sign up first.'))
        }   
        const validPassword = await bcrypt.compare(password, validUser.password)
        if(!validPassword) {
            return next(errorHandler(400, 'Invalid Password. Please try again.'))
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
        // Destructuring the password so it does not appear in the response
        const { password: pass, ...rest } = validUser._doc;
        // saving the token as a cookie
        // NOTE: For local development we set sameSite:'none' and secure:false so cookie is sent cross-origin with credentials: 'include'.
        // In production, set secure: true and sameSite:'none' (requires https).
        // Use secure + SameSite='none' in production (requires HTTPS).
        // For local development with Vite proxy, use SameSite='lax' and secure=false so cookie is accepted.
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        };
        res.cookie("access_token", token, cookieOptions);
        console.log('Set access_token cookie for user', validUser._id, { cookieOptions });
        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
}

export const signout = async (req, res, next) => {
    try {
        res.clearCookie('access_token')
        res.status(200).json('User has been logged out.')
    } catch (error) {
        next(error)
    }
}