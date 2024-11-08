import mongoose from "mongoose";
const Schema = mongoose.Schema;

const recentActivitySchema = new Schema({
  type: {
    type: String, // e.g., "Room Booking Request"
    required: true,
  },
  description: {
    type: String, // e.g., "Request Approved for Room 101 in Hostel A"
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  resolved: {
    type: Boolean,
    default: false,
  },
});

const RecentActivity = mongoose.model("RecentActivity", recentActivitySchema);

export default RecentActivity;
