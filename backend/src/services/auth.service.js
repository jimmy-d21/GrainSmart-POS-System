import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";
import StaffModel from "../models/staffModel.js";
import generateStaffId from "../utils/generateStaffId.js";

export const register = async (staffData) => {
  // Check if email already exists
  const existingEmail = await StaffModel.findByEmail(staffData.email);
  if (existingEmail) {
    throw new Error("A staff member with this email already exists");
  }

  // Upload image to Cloudinary
  const uploadedImage = await cloudinary.uploader.upload(staffData.image);
  staffData.image = uploadedImage.secure_url;

  // Generate a unique staff ID
  let uniqueStaffId = null;
  while (!uniqueStaffId) {
    const generatedId = generateStaffId();
    const existingStaffId = await StaffModel.findByStaffId(generatedId);
    if (!existingStaffId) {
      uniqueStaffId = generatedId;
    }
  }

  // Hash the generated staff ID as the default password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(uniqueStaffId, salt);

  staffData.staff_id = uniqueStaffId;
  staffData.password = hashedPassword;

  const newStaff = await StaffModel.register(staffData);
  delete newStaff.password; // delete the password object
  return newStaff;
};
