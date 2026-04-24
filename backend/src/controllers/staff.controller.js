import * as staffServices from "../services/staff.service.js";

export const addStaff = async (req, res) => {
  try {
    const { name, email, image, role, status } = req.body;

    // Validate required fields
    if (!name || !email || !image || !role || !status) {
      return res.status(400).json({ message: "Please provide all the fields" });
    }

    const newStaff = await staffServices.addStaff({
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
    console.error(`Error in addStaff controller: ${error.message}`);
    return res.status(500).json({ message: error.message });
  }
};
