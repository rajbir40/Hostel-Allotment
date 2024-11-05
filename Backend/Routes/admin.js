import express from "express";
import { getNumberOfStudents } from "../Controllers/admin.js";

const router = express.Router();

router.get("/students",getNumberOfStudents);

export default router;  