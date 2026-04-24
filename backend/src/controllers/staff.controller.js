import StaffModel from "../models/staffModel.js";
import * as staffServices from "../services/staff.service.js";

export const addStaff = async (req, res) => {
  try {
    const { name, email, image, role, status } = req.body;
    const staff = req.staff;

    // Check if staff is Manager
    if (staff.role !== "Manager") {
      throw new Error("You're not authorize to add new staff");
    }

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

export const deleteStaff = async (req, res) => {
  try {
    const { id: staffId } = req.params;
    const staff = req.staff;

    if (staff.role !== "Manager") {
      throw new Error("You're not authorize to delete the staff");
    }

    await staffServices.deleteStaff(staffId);

    res.status(200).json({ message: "Deleted staff successfully" });
  } catch (error) {
    console.log(`Error in deleteStaff controller: ${error.message}`);
    return res.status(500).json({ message: error.message });
  }
};

export const getStaffInfo = async (req, res) => {
  try {
    const staff = req.staff;
    delete staff.password; // remove password

    return res.status(200).json({ staff });
  } catch (error) {
    console.log(`Error in getStaffInfo controller: ${error.message}`);
    return res.status(400).json({ message: error.message });
  }
};

export const getAllStaffs = async (req, res) => {
  try {
    const staffs = await staffServices.getAllStaffs();

    res.status(200).json(staffs);
  } catch (error) {
    console.log(`Error in getAllStaff controller: ${error.message}`);
    return res.status(500).json({ message: error.message });
  }
};
