import express from "express";
import protect from "../middlewares/protect.js";

import { addStaff, deleteStaff } from "../controllers/staff.controller.js";
import { getStaffInfo } from "../controllers/staff.controller.js";

const router = express.Router();

router.post("/", protect, addStaff);
router.get("/", protect, getStaffInfo);
router.delete("/:id", protect, deleteStaff);

export default router;
