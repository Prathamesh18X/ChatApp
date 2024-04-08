import express from 'express'
import protectRoutes from '../middleware/protectRoute.js';
import { getUsers } from '../controllers/user.js';

const router = express.Router();

router.get("/",protectRoutes,getUsers)

export default router;