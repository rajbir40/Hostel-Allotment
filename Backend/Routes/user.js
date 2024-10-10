import express from "express";
import User from "../Models/user.js";
import { handleUserSignUp,handleUserLogin, handleSendOtp, handleVerifyOtp, handleUserLogout,userEdit} from "../Controllers/user.js";
import { handleApplyOutpass } from "../Controllers/outpass.js";
import { authenticateuser } from "../Middlewares/auth.js";

const router = express.Router();

// Create a new user
router.post("/signup",handleUserSignUp);
router.post("/login",handleUserLogin);
router.post("/logout",authenticateuser,handleUserLogout);
router.post("/getuser",authenticateuser,async (req,res)=>{
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        res.send(user);
    } catch (error) {
        return res.status(400).json({message:"login"});
    }
});
router.post("/send-code", handleSendOtp)
router.post("/verify-code", handleVerifyOtp)

router.post("/apply",authenticateuser,handleApplyOutpass);
router.post("/user/update",userEdit);

export default router;  