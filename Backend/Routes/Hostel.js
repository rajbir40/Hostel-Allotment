import express from "express";
import { createHostelWithRooms } from "../Controllers/hostel.js";

const router = express.Router();

router.post("/hostel",createHostelWithRooms);

export default router;  