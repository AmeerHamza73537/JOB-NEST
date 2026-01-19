import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs'
import mongoose from 'mongoose'
import User from '../model/user.js'
import Listing from '../model/listing.js'

export const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) {
        return next(errorHandler(403, 'You can update only your account.'))
    }
    try {
        console.log('updateUser request', { userId: req.params.id, body: req.body });
        if(req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        // Build update object only with provided fields to avoid overwriting
        const allowedFields = [
            'name','email','password','bio','title','skills','education','workExperience',
            'contactDetails','location','resume','avatar','linkedin','github'
        ];
        const updateObj = {};
        allowedFields.forEach((f) => {
            if (Object.prototype.hasOwnProperty.call(req.body, f)) {
                updateObj[f] = req.body[f];
            }
        });

        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: updateObj }, { new: true })

        if(!updatedUser) {
            return next(errorHandler(404, 'User not found.'))
        }

        const {password, ...rest} = updatedUser._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}
export const getUserListing = async (req, res, next) => {
    if(req.user.id === req.params.id) {
        try {
            const listings = await Listing.find({ userRef: req.params.id})
            res.status(200).json(listings)
        } catch (error) {
            next(error)
        }
    }else {
        return next(errorHandler(401, 'You can only view your listing.'))
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user) {
            return next(errorHandler(404, 'User not found.'))
        }
        const {password: pass, ...rest} = user._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

export const searchUsers = async (req, res, next) => {
    const { name, userId } = req.query;
    try {
        let query = {};
        if (name) {
            query.$or = [
                { name: { $regex: name, $options: 'i' } },
                { bio: { $regex: name, $options: 'i' } },
                { 'workExperience.role': { $regex: name, $options: 'i' } },
                { 'education.degree': { $regex: name, $options: 'i' } },
            ];
        }
        if (userId) {
            query._id = { $ne: new mongoose.Types.ObjectId(userId) };
        }
        const users = await User.find(query).select('-password');
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}