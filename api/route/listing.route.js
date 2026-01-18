import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createListing, getListing, getListings, applyForJob } from '../controller/listing.controller.js';
import multer from 'multer';

const router = express.Router()

const upload = multer({ storage: multer.memoryStorage() });

router.post('/create-listing', verifyToken, createListing)
router.get('/get/:id', getListing)
router.get('/get', getListings)
router.post('/apply/:listingId', verifyToken, upload.single('resume'), applyForJob)

export default router;