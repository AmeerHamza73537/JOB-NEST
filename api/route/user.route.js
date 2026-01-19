import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import  { updateUser, getUserListing, getUser, searchUsers } from '../controller/user.controller.js'

const router = express.Router()
router.post('/update-profile/:id', verifyToken, updateUser)
router.get('/listings/:id', verifyToken, getUserListing)
router.get('/:id', verifyToken, getUser)
router.get('/search/:id', searchUsers)

export default router;