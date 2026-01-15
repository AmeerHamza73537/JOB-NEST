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
    workType: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
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