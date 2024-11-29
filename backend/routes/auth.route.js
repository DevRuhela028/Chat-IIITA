import express from "express";
import {
	login,
	logout,
	signup,
	verifyEmail,
	forgotPassword,
	resetPassword,
	checkAuth,
	updateProfile,
	feedback, 
	googleAuth,
	setPass,
	deleteUser
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

// Authentication routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Email verification and password reset routes
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// New route for updating profile (protected by verifyToken middleware)
router.put("/profile", verifyToken, updateProfile);
router.post("/feedback",feedback);
router.post("/googleAuth", googleAuth);
router.post("/setPass", setPass);

// delete Profile
router.delete("/deleteUser/:id",deleteUser)
export default router;
