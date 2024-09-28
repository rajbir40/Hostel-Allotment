import nodemailer from "nodemailer";
import User from "../Models/user.js";  
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const secret = "rajbirsingh1234";
import crypto from "crypto"

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

export async function handleUserSignUp(req,res) {
        const {name,email,password, role} = req.body;
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password,salt);
        const user = await User.create({
            name,
            email,
            password:secPass,
            role,
        });
        return res.json(user);
} 

export async function handleUserLogin(req,res) {

    const {email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Please try to login with correct credetials"});
        }

        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({error:"Please try to login with correct credetials"});
        }
        const data = {
            user:{
                id : user.id
            }
        }
        const authToken = jwt.sign(data,secret);
        await res.cookie("token",authToken);
        return res.json({authToken});
    } 
    catch (error) {
        console.error(error.message);
        res.status(400).send("Internal server error");
    }

}

export async function handleUserLogout(req,res) {
  try{
    await res.clearCookie("token");
    return res.status(200).json({ message: "Logged out successfully" });
  }
  catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
}



export const handleSendOtp = async (req, res) => {
    const { email} = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
  
    try {
      const otp = generateOTP();
      const expiresAt = Date.now() + 300000; // OTP valid for 5 minutes
  
      const foundUser = await User.findOne({ email });
      if (!foundUser) {
        return res.status(400).json({ message: 'User Not Found' });
      }

      // Find user and update OTP
      foundUser.otp = otp;
      foundUser.expiredAt = new Date() + 600000;

      foundUser.save();
  
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: "rbir3438@gmail.com",
          pass: "nifl uruh usub sxrr",
        },
      });``
      

      const mailOptions = {
        from: 'rbir3438@gmail.com', // Replace with your email
        to: email,
        subject: 'Your OTP for Password Reset',
        text: `Your OTP for password reset is ${otp}. This OTP is valid for 10 minutes.`,
      };
  
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Failed to send OTP. Please try again later.' });
    }
  };
  
  // Verify OTP
  export const handleVerifyOtp = async (req, res) => {
    const { email, verifyOtp, newPassword } = req.body;
    if (!email || !verifyOtp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }
  
    try {
      const user = await User.findOne({ email });
      console.log(user)
  
      if (!user || !user.otp) {
        return res.status(400).json({ message: 'Invalid Email or OTP expired' });
      }
  
      const { otp, expiresAt } = user;
      console.log()
      if (Date.now() > expiresAt) {
        
        user.otp = null; 
        await user.save();
        return res.status(400).json({ message: 'OTP has expired' });
      }
  
      if (verifyOtp !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(newPassword,salt);
  
      // OTP is valid, proceed with password reset
      user.otp = null; // Clear OTP after verification
      user.expiredAt=null;
      user.password=secPass;
      await user.save();
      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error('Error verifying OTP:', error);
      res.status(500).json({ message: 'Failed to verify OTP. Please try again later.' });
    }
  };