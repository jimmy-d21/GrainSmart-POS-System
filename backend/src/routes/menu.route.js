import express from "express";
import protect from "../middlewares/protect.js";
import {
  addMenuItem,
  deleteMenuItem,
  getAllMenuItems,
  getMenuAnalytics,
  updateMenuItem,
} from "../controllers/menu.controller.js";

const router = express.Router();

router.get("/all", protect, getAllMenuItems);
router.get("/analytics", protect, getMenuAnalytics);
router.post("/", protect, addMenuItem);
router.put("/:id", protect, updateMenuItem);
router.delete("/:id", protect, deleteMenuItem);

export default router;
