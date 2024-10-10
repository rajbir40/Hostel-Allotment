import express from "express";
import { createHostelWithRooms, handleRoomBooking, handleGetRoom} from "../Controllers/hostel.js";

const router = express.Router();

router.post("/hostel",createHostelWithRooms);
router.post("/room",handleRoomBooking);
router.get("/room",handleGetRoom);

export default router;  