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

export const deleteMenuItem = async (req, res) => {
  try {
    const { id: menuId } = req.params;
    await menuServices.deleteMenuItem(menuId);

    res.status(200).json({ message: "Deleted menu item successfully" });
  } catch (error) {
    console.log(`Error in deleteMenuItem controller`);
    return res.status(500).json({ message: error.message });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const { id: menuId } = req.params;
    const staff = req.staff;
    const updatedMenu = await menuServices.updateMenuItem(
      menuId,
      req.body,
      staff,
    );

    res.status(200).json({
      message: "Menu item updated successfully!",
      item: updatedMenu,
    });
  } catch (error) {
    console.log(`Error in updateMenuItem controller: ${error.message}`);
    return res.status(500).json({ message: error.message });
  }
};
