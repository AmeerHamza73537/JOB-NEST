import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs'
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
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                bio: req.body.bio,
                title: req.body.title,
                skills:  req.body.skills,
                education: req.body.education,
                workExperience: req.body.workExperience,
                contactDetails: req.body.contactDetails,
                location: req.body.location,
                resume: req.body.resume,
                avatar: req.body.avatar,
                linkedin: req.body.linkedin,
                github: req.body.github,
            }
        }, {new: true})

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