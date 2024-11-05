import mongoose, { Mongoose } from "mongoose";
const Schema = mongoose.Schema;

const roomBookingSchema = new mongoose.Schema({
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    roomMateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      default: null,
    },
    hostel: {
      type:String,
      required:true,
    },
    roomNumber:{
      type:Number,
      required:true,
  },
    isAvailable:{
      type:Boolean,
      default:true,
  },
    type:{
      type:String,
      required:true,
      enum: ["Single","Double"],
  },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending'
    },
    requestedAt: {
      type: Date,
      default: Date.now
    },
    processedAt: {
      type: Date
    },
  });
  

const Roomrequest = mongoose.model("RoomRequest", roomBookingSchema);

export default Roomrequest;
