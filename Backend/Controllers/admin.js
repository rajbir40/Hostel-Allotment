import Hostel from "../Models/Hostel.js";
import Room from "../Models/room.js";
import User from "../Models/user.js"

export async function getNumberOfStudents(req,res) {

    const number = await User.find().countDocuments({"role":'Student'});
    return res.status(200).json({number});
    
}



