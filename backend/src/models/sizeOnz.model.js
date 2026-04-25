import db from "../config/db.js";

class SizeOnz {
  static async createSizeOnz(itemId, size, price) {
    const sql = `INSERT INTO sizeOnz
                     (menu_id, size, price)
                     VALUES($1, $2, $3)
                     RETURNING *`;
    const values = [itemId, size, price];
    const { rows } = await db.query(sql, values);
    return rows[0];
  }

  static async deleteAllSizesByMenuId(menuId) {
    const sql = `DELETE FROM sizeOnz WHERE menu_id = $1`;
    await db.query(sql, [menuId]);
  }
}

export default SizeOnz;
