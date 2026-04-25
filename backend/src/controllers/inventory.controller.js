import * as inventoryService from "../services/inventory.service.js";

export const createInventoryItem = async (req, res) => {
  try {
    const staff = req.staff;

    const newItem = await inventoryService.createInventoryItem(
      req.body,
      staff.role,
    );

    return res.status(201).json({
      message: "Inventory item added successfully",
      item: newItem,
    });
  } catch (error) {
    console.error(`Error in createInventoryItem controller: ${error.message}`);
    return res.status(statusCode).json({ message: error.message });
  }
};
