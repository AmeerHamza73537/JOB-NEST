import mongoose from 'mongoose'

const listingSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: false,
    },
    workType: {
        type: String,
        required: true,
    },
    minSalary: {
        type: String,
        required: true,
    },
    maxSalary: {
        type: String,
        required: true,
    },
    deadline: {
        type: String,
        required: true,
    },
    qualifications: {
        type: String,
        required: true,
    },
    skills: {
        type: String,
        required: true,
    },
    userRef: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const Listing = mongoose.model('Listing', listingSchema)

export default Listing;