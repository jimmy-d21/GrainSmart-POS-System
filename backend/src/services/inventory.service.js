import InventoryModel from "../models/inventory.model.js";

export const createInventoryItem = async (itemData, staffRole) => {
  const { name, category, current_stock, unit, reorder_level } = itemData;

  if (staffRole !== "Manager") {
    throw {
      status: 403,
      message: "You're not authorized to add new inventory items",
    };
  }

  if (
    !name ||
    !category ||
    current_stock === undefined ||
    !unit ||
    !reorder_level
  ) {
    throw { status: 400, message: "Please provide all required fields" };
  }

  const allowedCategories = [
    "Cups & Lids",
    "Coffee",
    "Dairy",
    "Toppings",
    "Syrups",
    "Powders",
    "Grains",
  ];
  if (!allowedCategories.includes(category)) {
    throw {
      status: 400,
      message: `Invalid category. Must be one of: ${allowedCategories.join(", ")}`,
    };
  }

  const allowedUnits = ["pcs", "kg", "L"];
  if (!allowedUnits.includes(unit)) {
    throw { status: 400, message: "Invalid unit. Please use pcs, kg, or L" };
  }

  if (Number(current_stock) < 0 || Number(reorder_level) < 0) {
    throw { status: 400, message: "Stock levels cannot be negative" };
  }

  const newItem = await InventoryModel.createInventoryItem(itemData);
  return newItem;
};
