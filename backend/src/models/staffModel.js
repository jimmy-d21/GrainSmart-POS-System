import db from "../config/db.js";

class StaffModel {
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
}

export default StaffModel;
