import express from 'express';
import { verifyToken } from '../utils/verifyUser';
import { createListing } from '../controller/listing.controller';

const router = express.Router()

router.post('/create-listing', verifyToken, createListing)

export default router;