import cloudinary from "../config/cloudinary.js";
import MenuModel from "../models/menu.model.js";
import SizeOnz from "../models/sizeOnz.model.js";

export const addMenuItem = async (staff, menuData) => {
  const { name, image, category, temperature, sizesOnz } = menuData;

  if (!name || !image || !category || !temperature || !sizesOnz) {
    throw new Error("Please provide all the fields");
  }

  if (staff.role !== "Manager") {
    throw new Error("You're not authorized to add new menu items");
  }

  const validSizes = [12, 16, 22];
  for (const item of sizesOnz) {
    if (!validSizes.includes(Number(item.size))) {
      throw new Error(`Invalid size: ${item.size}. Must be 12, 16, or 22.`);
    }
  }

  let imageUrl = image;
  if (image.startsWith("data:image")) {
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "grainsmart_menu",
    });
    imageUrl = uploadResponse.secure_url;
  }

  const newMenuItem = await MenuModel.addMenuItem({
    name,
    image: imageUrl,
    category,
    temperature,
  });

  if (!newMenuItem) throw new Error("Failed to create menu item");

  const savedSizes = [];
  for (const item of sizesOnz) {
    const newSizeOnz = await SizeOnz.createSizeOnz(
      newMenuItem.id,
      item.size,
      item.price,
    );
    savedSizes.push(newSizeOnz);
  }

  return {
    item: newMenuItem,
    sizes: savedSizes,
  };
};

export const deleteMenuItem = async (menuId) => {
  const menuItem = await MenuModel.findMenuItemById(menuId);
  if (!menuItem) {
    throw new Error("Menu item not found");
  }
  await MenuModel.deleteMenuItem(menuId);
};

export const updateMenuItem = async (menuId, menuData, staff) => {
  let { name, image, category, temperature, sizesOnz } = menuData;

  if (staff.role !== "Manager") {
    throw new Error("You're not authorized to update the menu item");
  }

  const existingItem = await MenuModel.findMenuItemById(menuId);
  if (!existingItem) throw new Error("Menu item not found");

  let finalImageUrl = existingItem.image;

  if (image && image.startsWith("data:image")) {
    if (existingItem.image) {
      try {
        const publicId = existingItem.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error("Cloudinary Delete Error:", err);
      }
    }

    const uploadResponse = await cloudinary.uploader.upload(image);
    finalImageUrl = uploadResponse.secure_url;
  }

  const updatedMenu = await MenuModel.updateMenuItem(menuId, {
    name: name || existingItem.name,
    image: finalImageUrl,
    category: category || existingItem.category,
    temperature: temperature || existingItem.temperature,
  });

  const newSizes = [];
  if (sizesOnz && Array.isArray(sizesOnz)) {
    await SizeOnz.deleteAllSizesByMenuId(menuId);

    for (const s of sizesOnz) {
      const savedSize = await SizeOnz.createSizeOnz(menuId, s.size, s.price);
      newSizes.push(savedSize);
    }
  }

  return { ...updatedMenu, sizes: newSizes };
};

export const getMenuAnalytics = async () => {
  return await MenuModel.menuAnalytics();
};

export const getAllMenuItems = async () => {
  return await MenuModel.allMenuItems();
};
