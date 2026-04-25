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

  static async inventoryAnalytics() {
    const sql = `SELECT json_build_object(
                    'summary', (
                        SELECT json_build_object(
                            'total_items', COUNT(*)::INT,
                            'low_stock_alert', COUNT(*) FILTER (WHERE current_stock <= (reorder_level * 0.50))::INT, -- less than 50%
                            'total_categories', (SELECT COUNT(DISTINCT category) FROM inventory)
                        ) FROM inventory
                    ),
                    'inventory_item', (
                        SELECT json_agg(inventory_item)
                        FROM (
                            SELECT
                                id,
                                name,
                                category,
                                current_stock,
                                reorder_level,
                                CASE
                                    WHEN current_stock <= (reorder_level * 0.50) THEN 'Low Stock'
                                    WHEN current_stock <= (reorder_level * 0.80) THEN 'Medium'
                                    ELSE 'In Stock'
                                END AS status,
                                updated_at
                            FROM inventory
                            ORDER BY updated_at DESC
                        ) AS inventory_item
                    )
                ) AS inventory_analytics`;
    const { rows } = await db.query(sql);
    return rows;
  }
}

export default InventoryModel;
