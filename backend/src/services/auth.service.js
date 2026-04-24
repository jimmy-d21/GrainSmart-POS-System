import bcrypt from "bcryptjs";
import StaffModel from "../models/staffModel.js";

export const login = async (staffData) => {
  // Check if email exist
  const staff = await StaffModel.findByEmail(staffData.email);
  if (!staff) {
    throw new Error("Invalid email or password");
  }

  // Check if password correct
  const isPasswordMatch = await bcrypt.compare(
    staffData.password,
    staff.password,
  );
  if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
  }

  delete staff.password; // delete the password object

  return staff;
};
