import express from "express";
import {handleFetchAllRequests, handleUpdateStatus } from "../Controllers/outpass.js";

const router = express.Router();

router.get("/fetchoutpass",handleFetchAllRequests);
router.post("/status",handleUpdateStatus);

export default router;  