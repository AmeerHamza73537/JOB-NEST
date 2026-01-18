import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createListing, getListing, getListings } from '../controller/listing.controller.js';

const router = express.Router()

router.post('/create-listing', verifyToken, createListing)
router.get('/get/:id', getListing)
router.get('/get', getListings)

export default router;