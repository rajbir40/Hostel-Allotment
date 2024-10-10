import { response } from "express";
import Hostel from "../Models/Hostel.js";
import Room from "../Models/room.js";

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
        const {roomId,studentId} = req.body;

        const room = await Room.findById(roomId);

        if(!room ){
            return response.status(400).json({message:"room not found"});
        }

        if(!room.isAvailable){
            return response.json(400).json({message:"room is not available"});
        }

        room.studentId = studentId;
        room.isAvailable = false;

        await room.save();

        return res.json(200).json({message:"room booked successfully",room});
    }
    catch(err){
        return res.json(500).json({message:"internal server occured"});
    }

}

const fetchAllRooms = async () => {
    try {
        const rooms = await Room.find(); 
        return rooms; 
    } catch (error) {
        console.error('Error fetching rooms:', error);
        throw error;
    }
};