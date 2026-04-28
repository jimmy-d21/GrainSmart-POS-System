import express from "express";
import protect from "../middlewares/protect.js";
import {
  addTransaction,
  getTransacAnalytics,
} from "../controllers/transaction.controller.js";

const router = express.Router();

router.get("/analytics", protect, getTransacAnalytics);
router.post("/create", protect, addTransaction);

export default router;
