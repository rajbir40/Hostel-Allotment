import express from "express";
import {handleFetchAllRequests, handleUpdateStatus, handleFetchOutpass } from "../Controllers/outpass.js";

const router = express.Router();

router.get("/fetchoutpass",handleFetchAllRequests);
router.get("/fetch/:id",handleFetchOutpass);
router.post("/status",handleUpdateStatus);

export default router;  