import express from "express";
import { createHostelWithRooms, handleRoomBooking, fetchAllRooms} from "../Controllers/hostel.js";

const router = express.Router();

router.post("/hostel",createHostelWithRooms);
router.post("/room",handleRoomBooking);
router.get("/",fetchAllRooms);

export default router;  