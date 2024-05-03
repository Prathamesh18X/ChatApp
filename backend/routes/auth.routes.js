import express from 'express';
import { login,logout,signup } from '../controllers/auth.js';
import  upload  from '../middleware/multer.js';
const router = express.Router();

router.post('/login',login);
router.post('/signup', upload, signup);
router.post('/logout',logout);

export default router;