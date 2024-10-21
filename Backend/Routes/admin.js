import express from "express";
import { getNumberOfStudents ,UpdateRoomBookingRequest} from "../Controllers/admin.js";

const router = express.Router();

router.get("/",getNumberOfStudents);
router.post("/status",UpdateRoomBookingRequest);


export default router;  