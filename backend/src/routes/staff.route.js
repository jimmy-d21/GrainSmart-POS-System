import express from "express";
import protect from "../middlewares/protect.js";

import {
  addStaff,
  deleteStaff,
  getAllStaffs,
  getStaffAnalytics,
  getStaffProfile,
  updateStaffProfile,
} from "../controllers/staff.controller.js";

const router = express.Router();

router.get("/all", protect, getAllStaffs);
router.get("/analytics", protect, getStaffAnalytics);
router.get("/:id", protect, getStaffProfile);

router.post("/", protect, addStaff);
router.delete("/:id", protect, deleteStaff);
router.put("/:id", protect, updateStaffProfile);

export default router;
