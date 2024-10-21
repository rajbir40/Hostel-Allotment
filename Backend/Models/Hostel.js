import mongoose, { Mongoose } from "mongoose";
const Schema = mongoose.Schema;

const hostelSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  floor: {
    type: String,
    default: "Ground",
  },
  totalRooms: {
    type: Number,
    default: 100
  },
  roomId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true
}]
});

const Hostel = mongoose.model("Hostel", hostelSchema);

export default Hostel;
