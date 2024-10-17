import { response } from "express";
import Hostel from "../Models/Hostel.js";
import Room from "../Models/room.js";
import User from "../Models/user.js"

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

        return res.status(200).json(room);

    }

    catch(err){
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
