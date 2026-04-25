import express from "express";
import protect from "../middlewares/protect.js";
import {
  createInventoryItem,
  inventoryAnalytics,
  restockInventoryItem,
} from "../controllers/inventory.controller.js";

const router = express.Router();

router.get("/analytics", protect, inventoryAnalytics);
router.post("/create", protect, createInventoryItem);
router.patch("/restock/:id", protect, restockInventoryItem);

export default router;
