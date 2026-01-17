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
    const listing = new Listing({
        ...req.body
    })
}
