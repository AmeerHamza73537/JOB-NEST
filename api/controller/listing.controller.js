import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";
import Listing from "../model/listing.js";

export const createListing = async (req, res, next) => {
    try {
        if(!req.user) {
            return next(errorHandler(401, 'Unauthorized'))
        }
        const {
            jobTitle,
            description,
            company,
            location,
            address,
            workType,
            minSalary,
            maxSalary,
            deadline,
            qualifications,
            skills,
        } = req.body

        if(!jobTitle ||
            !description ||
            !location ||
            !workType ||
            !minSalary ||
            !maxSalary ||
            !deadline ||
            !qualifications ||
            !skills
        ) {
                return next(errorHandler(400, 'Please provide all required fields.'))
        }
        const listing = await Listing.create({
            jobTitle,
            description,
            company,
            location,
            address,
            workType,
            minSalary,
            maxSalary,
            deadline,
            qualifications,
            skills,
            userRef: req.user.id,
        })
        res.status(200).json(listing)
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id)
        if(!listing) {
            return next(errorHandler(404, 'Listing Not Found'))
        }
        res.status(200).json(listing)
    } catch (error) {
        next(error)
    }
}

export const getListings = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 10
        const startIndex = parseInt(req.query.startIndex) || 0
        

        const searchTerm = req.query.searchTerm || ""
        const sort = req.query.sort || "createdAt"
        const order = req.query.order || "desc"

        const listings = await Listing.find({
            jobTitle: { $regex: searchTerm, $options: "i"},
        })
        .sort({ [sort]: order})
        .limit(limit)
        .skip(startIndex)

        return res.status(200).json(listings)
    } catch (error) {
        next(error)
    }
}