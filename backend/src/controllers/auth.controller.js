import * as authServices from "../services/auth.service.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide all the fields" });
    }

    const staff = await authServices.login({ email, password });

    generateTokenAndSetCookie(res, staff.staff_id);

    res.status(200).json({ message: "Login successfully", staff });
  } catch (error) {
    console.log(`Error in login controller: ${error.message}`);
    return res.status(500).json({ message: error.message });
  }
};
