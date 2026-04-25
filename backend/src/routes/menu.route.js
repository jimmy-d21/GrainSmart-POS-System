import express from "express";
import protect from "../middlewares/protect.js";
import { addMenuItem } from "../controllers/menu.controller.js";

const router = express.Router();

router.post("/", protect, addMenuItem);

export default router;
