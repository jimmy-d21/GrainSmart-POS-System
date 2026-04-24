import jwt from "jsonwebtoken";
import ENV from "../utils/ENV.js";
import { findStaffById } from "../services/auth.service.js";

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      throw new Error("Please login first");
    }

    const decoded = jwt.verify(token, ENV.jwt);

    const staff = await findStaffById(decoded.staffId);
    req.staff = staff;

    next();
  } catch (error) {
    console.log(`Error in protect middleware: ${error.message}`);
    return res.status(500).json({ message: error.message });
  }
};

export default protect;
