import mongoose, { Mongoose } from "mongoose";
const Schema = mongoose.Schema;

const roomBookingSchema = new mongoose.Schema({
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
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
