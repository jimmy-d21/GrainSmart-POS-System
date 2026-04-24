import express from "express";
import { login, logout } from "../controllers/auth.controller.js";
import protect from "../middlewares/protect.js";
import { getMe } from "../controllers/staff.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);

export default router;
