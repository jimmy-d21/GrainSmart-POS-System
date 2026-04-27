import express from "express";
import protect from "../middlewares/protect.js";
import { addTransaction } from "../controllers/transaction.controller.js";

const router = express.Router();

router.post("/create", protect, addTransaction);

export default router;
