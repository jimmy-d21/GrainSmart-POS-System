import express from "express";
import { addStaff } from "../controllers/staff.controller.js";

const router = express.Router();

router.post("/", addStaff);

export default router;
