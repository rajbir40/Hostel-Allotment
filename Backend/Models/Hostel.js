import mongoose, { Mongoose } from "mongoose";
const Schema = mongoose.Schema;

const hostelSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  totalRooms: {
    type: Number,
    default: 100
  },
  roomId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true
  }],
  bookedRooms : {
    type: Number,
  },
  singleRooms: {
    type: Number,
  },
  doubleRooms: {
    type: Number,
  },
  availableRooms: {
    type: Number,
  },

});

const Hostel = mongoose.model("Hostel", hostelSchema);

export default Hostel;
