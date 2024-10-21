import Hostel from "../Models/Hostel.js";
import Room from "../Models/room.js";
import User from "../Models/user.js"
import Roomrequest from "../Models/Roomrequest.js";
import nodemailer from "nodemailer";
export async function getNumberOfStudents(req,res) {

    const number = await User.find().countDocuments({"role":'student'});
    return res.status(200).json({number});
    
}

export async function fetchRoomBookingRequests(req,res) {

    const requests = await Roomrequest.find({"status":"Pending"});
    return res.status(200).json(requests);
    
}

export async function UpdateRoomBookingRequest(req,res) {

    const {Id,update} = req.body;


    try{
        const roomRequest = await Roomrequest.findById(Id);
        if(!roomRequest || !roomRequest.status){
            return res.status(404).json({message:"invalid room request"});
        }
        roomRequest.status = update;


        if(update === 'Approved'){

            const studentId = roomRequest.studentId;
            const userEmail = await User.findOne(studentId).select('email');
            if(!userEmail){
                return res.status(404).json({message:"Email not found"});   
            }

            const roomid = roomRequest.roomId;
            const room = await Room.findById(roomid);

            room.isAvailable = false;
            room.studentId = studentId;
            await room.save();

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
                text: `You has been alloted room number : ${room.roomNumber} of hostel.`,
            };
    
            await transporter.sendMail(mailOptions);
              
            return res.status(200).json(room);

        }

        await roomRequest.save();
        res.status(200).json({ message: 'Room request status updated successfully', status:update });
    }
    catch(err){
        console.log(err);
        return res.status(404).json({message:"status not updated"});
    }
    
}
