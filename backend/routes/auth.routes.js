import express from "express";
import {
  login,
  logout,
  signup,
  updateUserData,
  deleteSelfAccount,
} from "../controllers/auth.js";
import protectRoutes from "../middleware/protectRoute.js";
import { uploadProfilePic, updateProfilePic } from "../middleware/multer.js";
const router = express.Router();

router.post("/login", login);
router.post("/signup", uploadProfilePic, signup);
router.post("/update", protectRoutes, updateProfilePic, updateUserData);
router.post("/logout", logout);
router.delete("/deleteAccount/:id", protectRoutes, deleteSelfAccount);

export default router;
