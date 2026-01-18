import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";
import Listing from "../model/listing.js";
import nodemailer from 'nodemailer';
import multer from 'multer';
import User from "../model/user.js";

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

export const applyForJob = async (req, res, next) => {
    try {
        console.log('Apply for job called');
        const { listingId } = req.params;
        const { proposal } = req.body;
        const resume = req.file;

        console.log('Proposal:', proposal);
        console.log('Resume:', resume ? resume.originalname : 'No resume');

        if (!proposal || !resume) {
            return next(errorHandler(400, 'Proposal and resume are required'));
        }

        const listing = await Listing.findById(listingId);
        if (!listing) {
            return next(errorHandler(404, 'Listing not found'));
        }

        const owner = await User.findById(listing.userRef);
        if (!owner) {
            return next(errorHandler(404, 'Owner not found'));
        }

        const applicant = await User.findById(req.user.id);
        if (!applicant) {
            return next(errorHandler(404, 'Applicant not found'));
        }

        console.log('Sending email to:', owner.email);

        // Create transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: owner.email,
            subject: `Application for ${listing.jobTitle}`,
            text: `Applicant: ${applicant.name} (${applicant.email})\n\nProposal: ${proposal}`,
            attachments: [
                {
                    filename: resume.originalname,
                    content: resume.buffer
                }
            ]
        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');

        res.status(200).json({ message: 'Application sent successfully' });
    } catch (error) {
        console.log('Error in applyForJob:', error);
        next(error);
    }
}