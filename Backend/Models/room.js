import mongoose, { Mongoose } from "mongoose";

const roomSchema = new mongoose.Schema(
    {
        roomNumber:{
            type:Number,
            required:true,
        },
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default:null,
          },
        type:{
            type:String,
            required:true,
            enum: ["Single","Double"],
        },
        isAvailable:{
            type:Boolean,
            required:true,
            default:true,
        },
        hostel: {
            type:String,
            required:true,
        }
    },
    {timestamps:true}
);

roomSchema.index({ roomNumber: 1, hostelId: 1 }, { unique: true });


const Room = mongoose.model("Room",roomSchema);

export default Room;