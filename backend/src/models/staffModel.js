import db from "../config/db.js";

class StaffModel {
  // Get all staff member
  static async getAllStaffMembers() {
    const { rows } = await db.query(
      "SELECT * FROM staff ORDER BY created_at DESC",
    );
    return rows;
  }

  // Find staff by email
  static async findByEmail(email) {
    const { rows } = await db.query("SELECT * FROM staff WHERE email = $1", [
      email,
    ]);
    return rows[0];
  }

  // Find staff by staff_id
  static async findByStaffId(staff_id) {
    const { rows } = await db.query("SELECT * FROM staff WHERE staff_id = $1", [
      staff_id,
    ]);
    return rows[0];
  }

  // Register new staff
  static async register(staffData) {
    const { name, email, image, role, status, staff_id, password } = staffData;
    const { rows } = await db.query(
      `INSERT INTO staff (name, email, image, role, status, staff_id, password) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [name, email, image, role, status, staff_id, password],
    );
    return rows[0];
  }

  // Delete staff by id
  static async deleteStaff(staffId) {
    await db.query("DELETE FROM staff WHERE id = $1", [staffId]);
  }
}

export default StaffModel;
