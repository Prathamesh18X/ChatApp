import express from 'express';
import { createGroup , getGroups, addMemberToGroup, removeMemberFromGroup} from '../controllers/group.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();


router.get('/', protectRoute, getGroups);//done
router.post('/create', protectRoute, createGroup);
router.post('/add/:groupId', protectRoute, addMemberToGroup);
router.post('/remove/:groupId', protectRoute, removeMemberFromGroup);


export default router;