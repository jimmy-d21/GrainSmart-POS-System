import db from "../config/db.js";

class InventoryModel {
  static async createInventoryItem(itemData) {
    const { name, category, current_stock, unit, reorder_level } = itemData;
    const sql = `INSERT INTO inventory
                     (name, category, current_stock, unit, reorder_level)
                     VALUES($1, $2, $3, $4, $5) RETURNING *`;
    const values = [name, category, current_stock, unit, reorder_level];
    const { rows } = await db.query(sql, values);

    return rows;
  }
}

export default InventoryModel;
