import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";
import StaffModel from "../models/staffModel.js";
import generateStaffId from "../utils/generateStaffId.js";

export const addStaff = async (staffData) => {
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

export const deleteStaff = async (staffId) => {
  const staff = await StaffModel.findByStaffId(staffId);

  if (!staff) {
    throw new Error("Staff not found");
  }

  // Delete staff
  await StaffModel.deleteStaff(staff.id);
};

export const getAllStaffs = async (staffId) => {
  const staffLists = await StaffModel.getAllStaffMembers(staffId);

  staffLists.map((staff) => {
    delete staff.password;
  });

  return staffLists;
};

export const updateStaffProfile = async (staffId, staffData) => {
  const staff = await StaffModel.findByStaffId(staffId);
  if (!staff) throw new Error("Staff not found");

  if (staffData.email && staff.email !== staffData.email) {
    const existEmail = await StaffModel.findByEmail(staffData.email);
    if (existEmail) {
      throw new Error("A staff member with this email already exists");
    }
  }

  // Image Update Logic
  if (staffData.image && staffData.image.startsWith("data:image")) {
    if (staff.image && staff.image.includes("cloudinary")) {
      const imageId = staff.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imageId);
    }

    const uploadRes = await cloudinary.uploader.upload(staffData.image);
    staffData.image = uploadRes.secure_url;
  }

  return StaffModel.updateStaffProfile(staffId, staffData);
};
