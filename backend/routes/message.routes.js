import express from 'express';
import { sendMessage , getMessage ,getGroupMessages, sendGroupMessage } from '../controllers/message.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();
//conversations
router.get('/:id', protectRoute,getMessage);
router.post('/send/:id', protectRoute,sendMessage);
//groups
router.get('/groups/:id', protectRoute, getGroupMessages);
router.post('/groups/send/:id',protectRoute, sendGroupMessage);


export default router;