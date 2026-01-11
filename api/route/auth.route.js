import express from 'express';
import { signup } from '../controller/auth.controller';

const router = express.Router()
router.post('/sign-up', signup)

export default router;