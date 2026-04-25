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

export const restockInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { restock_amount } = req.body;
    const staff = req.staff;

    const updatedItem = await inventoryService.restockInventoryItem(
      id,
      staff,
      restock_amount,
    );

    res.status(200).json({
      message: "Restock inventory item successfully",
      item: updatedItem,
    });
  } catch (error) {
    console.log(`Error in restockInventoryItem controller: ${error.message}`);
    return res.status(500).json({ message: error.message });
  }
};
