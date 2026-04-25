import express from "express";
import protect from "../middlewares/protect.js";
import { createInventoryItem } from "../controllers/inventory.controller.js";

const router = express.Router();

router.post("/create", protect, createInventoryItem);

export default router;
