import * as authServices from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const { name, email, image, role, status } = req.body;

    // Validate required fields
    if (!name || !email || !image || !role || !status) {
      return res.status(400).json({ message: "Please provide all the fields" });
    }

    const newStaff = await authServices.register({
      name,
      email,
      image,
      role,
      status,
    });

    return res.status(201).json({
      message: "Staff member added successfully!",
      newStaff,
    });
  } catch (error) {
    console.error(`Error in register controller: ${error.message}`);
    return res.status(500).json({ message: error.message });
  }
};
