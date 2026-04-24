import express from "express";
import { getStaffInfo, login } from "../controllers/auth.controller.js";
import protect from "../middlewares/protect.js";

const router = express.Router();

router.post("/login", login);
router.get("/", protect, getStaffInfo);

export default router;
