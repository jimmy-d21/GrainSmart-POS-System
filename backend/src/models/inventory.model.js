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

  static async findItemById(itemId) {
    const sql = `SELECT
                    id,
                    name,
                    category,
                    current_stock,
                    unit,
                    reorder_level
                FROM inventory
                WHERE id = $1`;
    const { rows } = await db.query(sql, [itemId]);
    return rows[0];
  }

  static async restockInventoryItem(itemId, restock_amount) {
    const sql = `UPDATE inventory
                 SET current_stock = $1
                 WHERE id = $2
                 RETURNING *`;
    const { rows } = await db.query(sql, [restock_amount, itemId]);
    return rows[0];
  }
}

export default InventoryModel;
