import express from "express";
import protect from "../middlewares/protect.js";
import {
  createInventoryItem,
  restockInventoryItem,
} from "../controllers/inventory.controller.js";

const router = express.Router();

router.post("/create", protect, createInventoryItem);
router.patch("/restock/:id", protect, restockInventoryItem);

export default router;
