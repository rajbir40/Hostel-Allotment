import express from "express";
import {handleFetchAllRequests, handleUpdateStatus } from "../Controllers/outpass.js";

const router = express.Router();

router.get("/",handleFetchAllRequests);
router.post("/:Id/status",handleUpdateStatus);

export default router;  