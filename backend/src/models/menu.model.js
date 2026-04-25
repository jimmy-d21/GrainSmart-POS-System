import db from "../config/db.js";

class MenuModel {
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
}

export default MenuModel;
