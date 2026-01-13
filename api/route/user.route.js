import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import  { updateUser, getUserListing, getUser } from '../controller/user.controller.js'

const router = express.Router()
router.post('/update/:id', verifyToken, updateUser)
router.post('/listings/:id', verifyToken, getUserListing)
router.post('/:id', verifyToken, getUser)

export default router;