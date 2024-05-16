import express from "express";
import {
  createGroup,
  getGroups,
  addMemberToGroup,
  removeMemberFromGroup,
} from "../controllers/group.js";
import { uploadGroupPic } from "../middleware/multer.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getGroups); //done
router.post("/create", protectRoute, uploadGroupPic, createGroup);
router.post("/add/:groupId", protectRoute, addMemberToGroup);
router.post("/remove/:groupId", protectRoute, removeMemberFromGroup);

export default router;
