import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsers, getBlockedStatus, blockUser } from "../controllers/user.js";

const router = express.Router();

router.get("/", protectRoute, getUsers);
router.get("/block/:id", protectRoute, getBlockedStatus);
router.post("/block/:id", protectRoute, blockUser);

export default router;
