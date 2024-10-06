import Hostel from "../Models/Hostel.js";
import Room from "../Models/room.js";

export async function createHostelWithRooms(req,res) {

    const {hostelName,roomtype,number} = req.body;
    try{
        const newhostel = await Hostel.create({
            name : hostelName,
        })
        await newhostel.save();

        let roomIds = [];
        for(let i=1 ; i<=5 ; i++){
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
        return res.status(404).json({message:"Hostel not created"});
    }

}

export async function handleRoomBooking(req,res) {

    const roomId = req.params;
    const studentId = req.params;
}