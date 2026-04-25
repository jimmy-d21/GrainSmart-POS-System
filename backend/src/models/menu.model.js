import db from "../config/db.js";

class MenuModel {
  static async findMenuItemById(menuId) {
    const sql = `SELECT 
                    id, 
                    name, 
                    image, 
                    category, 
                    temperature,
                    (
                        SELECT json_agg(sizes)
                        FROM (
                            SELECT 
                                id,
                                size, 
                                price
                            FROM sizeOnz
                            WHERE menu_id = $1
                        ) AS sizes
                    ) AS sizes
                FROM menuItems
                WHERE id = $1;`;
    const { rows } = await db.query(sql, [menuId]);
    return rows[0];
  }

  static async addMenuItem(menuData) {
    const { name, image, category, temperature } = menuData;
    const sql = `INSERT INTO menuItems
                     (name, image, category, temperature)
                     VALUES($1, $2, $3, $4)
                     RETURNING *`;
    const values = [name, image, category, temperature];
    const { rows } = await db.query(sql, values);
    return rows[0];
  }

  static async deleteMenuItem(menuId) {
    const sql = `DELETE FROM menuItems
                 WHERE id = $1`;
    const { rows } = await db.query(sql, [menuId]);
    return rows[0];
  }

  static async updateMenuItem(menuId, menuData) {
    const { name, image, category, temperature } = menuData;
    const sql = `UPDATE menuItems
                 SET name = $1, image = $2, category = $3, temperature = $4, updated_at = CURRENT_TIMESTAMP
                 WHERE id = $5
                 RETURNING *`;
    const values = [name, image, category, temperature, menuId];
    const { rows } = await db.query(sql, values);
    return rows[0];
  }
}

export default MenuModel;
