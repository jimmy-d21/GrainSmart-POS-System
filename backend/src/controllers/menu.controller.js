import * as menuServices from "../services/menu.service.js";

export const addMenuItem = async (req, res) => {
  try {
    const staff = req.staff;
    const newMenuItem = await menuServices.addMenuItem(staff, req.body);

    res
      .status(201)
      .json({ message: "Added new menu item successfully", newMenuItem });
  } catch (error) {
    console.log(`Error in addMenuItem controller: ${error.message}`);
    return res.status(500).json({ message: error.message });
  }
};
