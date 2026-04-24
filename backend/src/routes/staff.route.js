import express from "express";
import protect from "../middlewares/protect.js";

import {
  addStaff,
  deleteStaff,
  getAllStaffs,
  getStaffInfo,
  updateStaffProfile,
} from "../controllers/staff.controller.js";

const router = express.Router();

router.get("/", protect, getStaffInfo);
router.get("/all", protect, getAllStaffs);
router.post("/", protect, addStaff);
router.delete("/:id", protect, deleteStaff);
router.put("/:id", protect, updateStaffProfile);

export default router;
