import { response } from "express";
import Hostel from "../Models/Hostel.js";
import Room from "../Models/room.js";
import User from "../Models/user.js"
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import Roomrequest from "../Models/Roomrequest.js";

export async function createHostelWithRooms(req,res) {

    const {hostelName,roomtype,number} = req.body;
    try{
        const newhostel = await Hostel.create({
            name : hostelName,
        })
        let roomIds = [];
        for(let i=101 ; i<=121 ; i++){
            const room = await Room.create({
                roomNumber:i,
                type:roomtype,
                hostel:hostelName,
            })
            await room.save();
            roomIds.push(room._id);
        }
        newhostel.roomId = roomIds;
        await newhostel.save();
        return res.status(200).json({message:"Successfully created hostel"});
    }
    catch(err){
        console.log(err);
        return res.status(404).json({message:"Hostel not created"});
    }

}

export async function handleRoomBooking(req,res) {

    try{
        
        const {roomNumber,hostel,studentId} = req.body;
        
        const studentObjectId = new mongoose.Types.ObjectId(studentId);
        const existingRoom = await Room.findOne({studentId:studentObjectId});

        if (existingRoom) {
            return res.status(208).json({ message: 'You have already booked a room.' });
        }


        if(!roomNumber || !hostel){
            return res.status(400).json({message:"Roomnumber and hostel are required"});
        }

        const room = await Room.findOne({roomNumber:roomNumber, hostel:hostel});
        if(!room){
            return res.status(404).json({message:"Room not found"});
        }

        room.isAvailable = false;
        room.studentId = studentId;
        await room.save();

        const userEmail = await User.findById(studentObjectId).select('email');
        if(!userEmail){
            return res.status(404).json({message:"Email not found"});
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, 
            auth: {
                user: "mahakumbhlostfound@gmail.com", 
                pass: "oevg lizk taxf hkrj", 
            },
        });``

        const mailOptions = {
            from: 'rbir3438@gmail.com', 
            to: userEmail,
            subject: 'Regarding Room Booking',
            text: `You has been alloted room number : ${roomNumber} of hostel ${hostel}.`,
        };

        await transporter.sendMail(mailOptions);
          
        return res.status(200).json(room);

    }

    catch(err){
        console.log(err)
        return res.status(404).json({message:"Server didn't responded"});
    }

    
}

export const fetchAllRooms = async (req,res) => {
    try {
        const rooms = await Room.find(); 
        return res.status(200).json(rooms);
    } catch (error) {
        console.error('Error fetching rooms:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

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

export async function handleRoomBookingRequest(req,res) {

    try{
        
        const {roomNumber,hostel,studentId} = req.body;


        if(!roomNumber || !hostel){
            return res.status(400).json({message:"Roomnumber and hostel are required"});
        }

        const room = await Room.findOne({roomNumber:roomNumber, hostel:hostel});
        if(!room){
            return res.status(404).json({message:"Room not found"});
        }

        const roomReqest = await Roomrequest.create({
            studentId:studentId,
            roomId:room._id,
        })

        return res.status(200).json({message:"Request sent"});

    }

    catch(err){
        console.log(err)
        return res.status(404).json({message:"Server didn't responded"});
    }

    
}
