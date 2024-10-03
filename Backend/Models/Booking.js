import mongoose, { Mongoose } from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default:null,
          },
          roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room', 
            required: true
          },
          bookingDate: {
            type: Date,
            default: Date.now,
          },
          status: {
            type: String,
            enum: ['pending', 'approved', 'canceled'],
            default: 'pending'
          },
    },
    {timestamps:true}
);

const Booking = mongoose.model("Booking",bookingchema);

export default Booking;