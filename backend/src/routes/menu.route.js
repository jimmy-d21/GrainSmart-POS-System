import express from "express";
import protect from "../middlewares/protect.js";
import {
  addMenuItem,
  deleteMenuItem,
  updateMenuItem,
} from "../controllers/menu.controller.js";

const router = express.Router();

router.post("/", protect, addMenuItem);
router.put("/:id", protect, updateMenuItem);
router.delete("/:id", protect, deleteMenuItem);

export default router;
