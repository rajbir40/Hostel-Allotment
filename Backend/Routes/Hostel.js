import express from "express";
import { createHostelWithRooms, handleRoomBooking, fetchAllRooms ,
    handleRoomBookingRequest ,fetchRoomBookingRequest ,fetchRoomBookingRequestById,
    updateRoomBookingRequest, getHostelDetails ,createRooms} from "../Controllers/hostel.js";

const router = express.Router();

router.post("/hostel",createHostelWithRooms);
router.post("/room",handleRoomBooking);
router.post("/req",handleRoomBookingRequest);

router.get("/",fetchAllRooms);
router.get("/hostel",getHostelDetails);
router.get("/fetch",fetchRoomBookingRequest);
router.get("/requestdetails/:id",fetchRoomBookingRequestById);
router.post("/update/:id",updateRoomBookingRequest)
router.post("/create",createRooms);


export default router;  