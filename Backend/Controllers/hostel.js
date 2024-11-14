import { response } from "express";
import Hostel from "../Models/Hostel.js";
import Room from "../Models/room.js";
import User from "../Models/user.js"
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import Roomrequest from "../Models/Roomrequest.js";
import RecentActivity from "../Models/RecentActivity.js";

export async function createHostelWithRooms(req,res) {

    const {hostelName,roomtype,number,bookedRooms,availableRooms,singleRooms,doubleRooms,floor} = req.body;
    try{
        
        for(let i=1 ; i<=number ; i++){
            const room = await Room.create({
                roomNumber:i,
                type:roomtype,
                hostel:hostelName,
                floor:floor,
            })
            await room.save();
        }
        return res.status(200).json({message:"Successfully created hostel"});
    }
    catch(err){
        console.log(err);
        return res.status(404).json({message:"Hostel not created"});
    }

}

export async function createRooms(req,res) {
    const {hostelName,roomtype,starting,ending,floor} = req.body;
    try{
        for(let i=starting ; i<=ending ; i++){
            const room = await Room.create({
                roomNumber:i,
                type:roomtype,
                hostel:hostelName,
                floor:floor,
            })
            await room.save();
        }
        return res.status(200).json({message:"Successfully created rooms"});
    }
    catch(err){
        console.log(err);
        return res.status(404).json({message:"rooms not created"});
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

        const user = await User.findById(studentObjectId).select('email');
        if (!user || !user.email) {
            return res.status(404).json({ message: "Email not found" });
        }
        const userEmail = user.email;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "ggbackup8520@gmail.com",
                pass: "swpj cbea mdni rbdv",
            },
        });

        const mailOptions = {
            from: 'ggbackup8520@gmail.com',
            to: userEmail,
            subject: 'Room Booking Confirmation',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                    <h2 style="text-align: center; color: #333;">Room Booking Confirmation</h2>
                    <p style="font-size: 16px; color: #555;">Dear Student,</p>
                    <p style="font-size: 16px; color: #555;">Your room booking has been successfully processed. Below are the details of your room allocation:</p>
                    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd; background-color: #f0f0f0;">Room Number</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">${room.roomNumber}</td>
                        </tr>
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd; background-color: #f0f0f0;">Floor</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">${room.floor}</td>
                        </tr>
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd; background-color: #f0f0f0;">Hostel</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">${room.hostel}</td>
                        </tr>
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd; background-color: #f0f0f0;">Room Type</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">${room.type}</td>
                        </tr>
                    </table>
                    <p style="font-size: 16px; color: #555;">If you have any questions or require further assistance, please contact the hostel administration.</p>
                    <p style="font-size: 16px; color: #555;">Regards,<br>Hostel Management Team</p>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    <p style="font-size: 12px; color: #999; text-align: center;">
                        This is an automated email. Please do not reply.
                    </p>
                </div>
            `,
        };
        

        await transporter.sendMail(mailOptions);

        console.log("done");
          
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


export async function handleRoomBookingRequest(req, res) {
    try {
        const { roomNumber, hostel, studentId, roomieRollNumber } = req.body;

        if (!roomNumber || !hostel) {
            return res.status(400).json({ message: "Room number and hostel are required" });
        }

        // Find the room
        const room = await Room.findOne({ roomNumber: roomNumber, hostel: hostel });
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        let roomMateId = null;

        // If roommate roll number is provided, fetch the roommate's details
        if (roomieRollNumber) {
            const roomie = await User.findOne({ enrollmentId: roomieRollNumber });
            if (!roomie) {
                return res.status(404).json({ message: "Roommate not found" });
            }
            roomMateId = roomie._id; // Save the roommate's ID
        }

        // Create the room request
        const roomRequest = await Roomrequest.create({
            studentId: studentId,
            hostel: room.hostel,
            type: room.type,
            status: room.status,
            roomNumber: roomNumber,
            roomMateId: roomMateId, // Include roommate ID only if it's available
        });

        // Create a recent activity entry
        await RecentActivity.create({
            type: "Room Booking Request",
            description: `New booking request for Room ${roomNumber} in ${hostel}`,
            resolved: false,
        });

    
        

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: "Request approved" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server didn't respond" });
    }
}


export async function fetchRoomBookingRequest(req,res) {
    try {
        const requests = await Roomrequest.find({status:"Pending"}); 
        return res.status(200).json(requests);
    } catch (error) {
        console.error('Error fetching requests:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function fetchRoomBookingRequestById(req,res) {
    try {
        const id = req.params.id;
        const request = await Roomrequest.findById(id); 
        return res.status(200).json(request);
    } catch (error) {
        console.error('Error fetching request:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateRoomBookingRequest(req, res) {
    const { update } = req.body;
    const Id = req.params.id;

    try {
        const roomRequest = await Roomrequest.findById(Id);
        if (!roomRequest || !roomRequest.status) {
            return res.status(404).json({ message: "Invalid room request" });
        }

        // Find the recent activity related to this room request
        const recentActivity = await RecentActivity.findOne({
            description: `New booking request for Room ${roomRequest.roomNumber} in ${roomRequest.hostel}`,
            resolved: false,
        });

        if (!recentActivity) {
            return res.status(404).json({ message: "Activity not found" });
        }

        // Handle rejection
        if (update === 'Rejected') {
            roomRequest.status = 'Rejected';
            await roomRequest.save();

            // Update the recent activity entry to resolved
            recentActivity.resolved = true;
            recentActivity.description = `Request Rejected for Room ${roomRequest.roomNumber} in ${roomRequest.hostel}`;
            await recentActivity.save();

            return res.status(200).json({ message: "Request rejected" });
        }

        // Handle approval
        if (update === 'Approved') {
            roomRequest.status = 'Approved';
            roomRequest.isAvailable = false;
            await roomRequest.save();

            const studentId = roomRequest.studentId;
            const user = await User.findById(studentId).select('email');
            if (!user) {
                return res.status(404).json({ message: "User email not found" });
            }

            const room = await Room.findOne({ roomNumber: roomRequest.roomNumber, hostel: roomRequest.hostel });
            if (!room) {
                return res.status(404).json({ message: "Room not found" });
            }

            room.isAvailable = false;
            room.studentId = studentId;
            await room.save();

            user.roomId = room._id;
            await user.save();
    
            // Send an email to the student    
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: "ggbackup8520@gmail.com",
                    pass: "swpj cbea mdni rbdv",
                },
            });
    
            const mailOptions = {
                from: 'ggbackup8520@gmail.com',
                to: user.email,
                subject: 'Room Booking Confirmation',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                        <h2 style="text-align: center; color: #333;">Room Booking Confirmation</h2>
                        <p style="font-size: 16px; color: #555;">Dear Student,</p>
                        <p style="font-size: 16px; color: #555;">Your room booking has been successfully processed. Below are the details of your room allocation:</p>
                        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                            <tr>
                                <th style="text-align: left; padding: 8px; border: 1px solid #ddd; background-color: #f0f0f0;">Room Number</th>
                                <td style="padding: 8px; border: 1px solid #ddd;">${room.roomNumber}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left; padding: 8px; border: 1px solid #ddd; background-color: #f0f0f0;">Floor</th>
                                <td style="padding: 8px; border: 1px solid #ddd;">${room.floor}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left; padding: 8px; border: 1px solid #ddd; background-color: #f0f0f0;">Hostel</th>
                                <td style="padding: 8px; border: 1px solid #ddd;">${room.hostel}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left; padding: 8px; border: 1px solid #ddd; background-color: #f0f0f0;">Room Type</th>
                                <td style="padding: 8px; border: 1px solid #ddd;">${room.type}</td>
                            </tr>
                        </table>
                        <p style="font-size: 16px; color: #555;">If you have any questions or require further assistance, please contact the hostel administration.</p>
                        <p style="font-size: 16px; color: #555;">Regards,<br>Hostel Management Team</p>
                        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                        <p style="font-size: 12px; color: #999; text-align: center;">
                            This is an automated email. Please do not reply.
                        </p>
                    </div>
                `,
            };
    
            await transporter.sendMail(mailOptions);

            // Update the recent activity entry to resolved
            recentActivity.resolved = true;
            recentActivity.description = `Request Approved for Room ${room.roomNumber} in ${roomRequest.hostel}`;
            await recentActivity.save();

            return res.status(200).json({ message: "Room booked successfully" });
        }

        await roomRequest.save();
        res.status(200).json({ message: 'Room request status updated successfully', status: update });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Status not updated due to server error" });
    }
}



export async function getHostelDetails(req,res) {
    try {
        const hostel = await Hostel.find(); 
        return res.status(200).json(hostel);
    } catch (error) {
        console.error('Error fetching hostel:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
