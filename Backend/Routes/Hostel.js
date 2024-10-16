import express from "express";
import { createHostelWithRooms, handleRoomBooking} from "../Controllers/hostel.js";

const router = express.Router();

router.post("/hostel",createHostelWithRooms);
router.post("/room",handleRoomBooking);

export default router;  