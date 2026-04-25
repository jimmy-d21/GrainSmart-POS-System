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

  static async menuAnalytics() {
    const sql = `SELECT JSON_BUILD_OBJECT(
                      'summary', (
                          SELECT JSON_BUILD_OBJECT(
                              'total_items', COUNT(*)::INT,
                              'reg_drinks', COUNT(*) FILTER(WHERE category = 'Regular Drinks')::INT,
                              'frappe', COUNT(*) FILTER(WHERE category = 'Frappe')::INT,
                              'shim_juices', COUNT(*) FILTER(WHERE category = 'Shimmer Juices')::INT,
                              'premium_drinks', COUNT(*) FILTER(WHERE category = 'Premium Drinks')::INT,
                              'rice_coffee', COUNT(*) FILTER(WHERE category = 'Rice Coffee Series')::INT
                          )
                          FROM menuItems
                      ),
                      'menuItems', (
                          SELECT JSON_AGG(items)
                          FROM (
                              SELECT
                                  id,
                                  name,
                                  image,
                                  category,
                                  temperature
                              FROM menuItems
                              ORDER BY name ASC
                          ) AS items
                      )
                  )`;
    const { rows } = await db.query(sql);
    return rows[0];
  }

  static async allMenuItems() {
    const sql = `SELECT
                      m.id AS item_id,
                      m.name,
                      m.image,
                      m.category,
                      m.temperature,
                      (
                        SELECT JSON_AGG(
                            JSON_BUILD_OBJECT(
                                'id', s.size,
                                'size', s.size,
                                'price', s.price
                            )
                        )
                        FROM sizeOnz AS s
                        WHERE s.menu_id = m.id
                      ) AS sizes
                  FROM menuItems AS m
                  ORDER BY m.created_at DESC`;
    const { rows } = await db.query(sql);
    return rows;
  }
}

export default MenuModel;
