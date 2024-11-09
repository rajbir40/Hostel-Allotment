import nodemailer from "nodemailer";
import User from "../Models/user.js";  
import bcrypt from "bcryptjs";
import RecentActivity from "../Models/RecentActivity.js";
import jwt from "jsonwebtoken";
const secret = "rajbirsingh1234";
import crypto from "crypto"

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

export async function handleUserSignUp(req, res) {
    try {
        const { name, email, password, address, dob ,phoneNumber, enrollmentId} = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            address,
            phoneNumber,
            password: secPass,
            dob,
            enrollmentId,
        });

        const userResponse = { 
            name: user.name,
            email: user.email,
            address: user.address,
            dob: user.dob,
            phoneNumber: user.phoneNumber,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        return res.status(201).json(userResponse); 
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
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
              id : user.id,
              enrollmentId : user.enrollmentId
            }
        }
        const authToken = jwt.sign(data,secret);
        await res.cookie("token",authToken);
        return res.json({authToken,"id":user._id,"role":user.role});
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

export async function fetchUserData(req,res) {
  try{
      const studentId = req.params.id;
      if(!studentId){
          return res.status(400).json({message:"Student id required"});
      }
      const student = await User.findById(studentId);
      if(!student){
          return res.status(400).json({message:"User not found"});
      }
      return res.status(200).json(student);
  }
  catch(error){
      return res.status(404).json({message:"Server error"});
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

export const userEdit= async (req, res) => {
    try {
      const { _id, fullName, email, mobile } = req.body;
  
      if (!_id) {
        return res.status(400).json({ error: 'User ID (_id) is required' });
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        { fullName, email, mobile },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json({ user: updatedUser });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Server Error' });
    } 
  };

export const handleFetchRecentActivity = async (req, res) => {
    try {
      const user = req.user;
      console.log(user.enrollmentId);
      const activities = await RecentActivity.find({enrollmentId: user.enrollmentId}).sort({ createdAt: -1 });
      return res.status(200).json(activities);
    }
    catch (error) {
      console.error('Error fetching recent activities:', error);
      return res.status(500).json({ error: 'Failed to fetch recent activities' });
    }
}