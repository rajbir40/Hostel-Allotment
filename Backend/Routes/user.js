import express from "express";
import User from "../Models/user.js";
import { handleUserSignUp,handleUserLogin, handleSendOtp, handleVerifyOtp, handleUserLogout,userEdit
    ,fetchUserData,handleFetchRecentActivity} from "../Controllers/user.js";
import { handleApplyOutpass } from "../Controllers/outpass.js";
import { authenticateuser } from "../Middlewares/auth.js";

const router = express.Router();

// Create a new user
router.post("/signup",handleUserSignUp);
router.post("/login",handleUserLogin);
router.post("/logout",authenticateuser,handleUserLogout);
router.post("/send-code", handleSendOtp)
router.post("/verify-code", handleVerifyOtp)
router.post("/apply",authenticateuser,handleApplyOutpass);
router.post("/update",userEdit);
router.get("/recent-activities",handleFetchRecentActivity);
router.get("/student/:id",fetchUserData);

export default router;  