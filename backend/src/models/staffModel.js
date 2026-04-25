import db from "../config/db.js";

class StaffModel {
  // Get all staff member
  static async getAllStaffMembers(staffId) {
    const sql = `SELECT * FROM staff WHERE staff_id != $1 ORDER BY created_at DESC`;
    const { rows } = await db.query(sql, [staffId]);
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

  // Update staff info by id
  static async updateStaffProfile(staffId, staffData) {
    const { image, name, email, role, status } = staffData;
    const sql = `UPDATE staff
                 SET image = $1, name = $2, email = $3, role = $4, status = $5
                 WHERE staff_id = $6 
                 RETURNING *`;
    const { rows } = await db.query(sql, [
      image,
      name,
      email,
      role,
      status,
      staffId,
    ]);

    return rows[0];
  }

  // Update staff status
  static async updateStaffStatus(staffId, status) {
    const { rows } = await db.query(
      "UPDATE staff SET status = $1 WHERE staff_id = $2",
      [status, staffId],
    );
    return rows[0];
  }

  // Get staff analytics
  static async getStaffAnalytics(staffId) {
    const sql = `SELECT json_build_object(
                    'summary', (
                        SELECT json_build_object(
                            'total_staff', COUNT(*)::INT,
                            'total_active', COUNT(*) FILTER(WHERE status = 'Active')::INT,
                            'total_manager', COUNT(*) FILTER(WHERE role = 'Manager')::INT,
                            'total_cashier', COUNT(*) FILTER(WHERE role = 'Cashier')::INT
                        ) FROM staff
                      ),
                    'staff_members', (
                        SELECT json_agg(staff_members)
                        FROM (
                            SELECT
                              id,
                              staff_id,
                              image,
                              name,
                              email,
                              role,
                              status
                            FROM staff
                            WHERE staff_id != $1
                            ORDER BY created_at DESC
                        ) AS staff_members
                    )
                 ) AS analytics`;
    const { rows } = await db.query(sql, [staffId]);
    return rows;
  }
}

export default StaffModel;
