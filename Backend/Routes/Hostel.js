import express from "express";
import { createHostelWithRooms, handleRoomBooking, fetchAllRooms ,handleRoomBookingRequest} from "../Controllers/hostel.js";

const router = express.Router();

router.post("/hostel",createHostelWithRooms);
router.post("/room",handleRoomBooking);
router.post("/req",handleRoomBookingRequest);

router.get("/",fetchAllRooms);


export default router;  