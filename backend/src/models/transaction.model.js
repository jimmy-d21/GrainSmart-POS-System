import db from "../config/db.js";

class TransactionModel {
  // Pass 'client' as an argument to use the same connection/session
  static async addTransactionWithClient(client, transacData) {
    const { transaction_id, staff_id, payment_method, total_amount, status } =
      transacData;
    const sql = `INSERT INTO transactions 
                 (transaction_id, staff_id, payment_method, total_amount, status) 
                 VALUES($1, $2, $3, $4, $5) RETURNING *`;
    const { rows } = await client.query(sql, [
      transaction_id,
      staff_id,
      payment_method,
      total_amount,
      status,
    ]);
    return rows[0];
  }

  static async addTransacItemWithClient(client, data) {
    const sql = `INSERT INTO transaction_items 
                 (item_name, transaction_id, menu_item_id, size, temperature, quantity, price_per_unit, total) 
                 VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
    const values = [
      data.item_name,
      data.transaction_id,
      data.menu_item_id,
      data.size,
      data.temperature,
      data.quantity,
      data.price_per_unit,
      data.total,
    ];
    const { rows } = await client.query(sql, values);
    return rows[0];
  }

  static async addTransacItemAddOnzWithClient(
    client,
    transacItemId,
    name,
    price,
  ) {
    const sql = `INSERT INTO transaction_item_addons (transac_item_id, addon_name, addon_price) 
                 VALUES ($1, $2, $3) RETURNING *`;
    const { rows } = await client.query(sql, [transacItemId, name, price]);
    return rows[0];
  }

  static async getAnalyticsSummary() {
    const sql = `
      SELECT 
        COALESCE(SUM(total_amount), 0) AS total_revenue,
        COUNT(*) AS total_transactions,
        COUNT(*) FILTER (WHERE status = 'Completed') AS total_completed,
        COUNT(*) FILTER (WHERE status = 'Refunded') AS total_refunded
      FROM transactions;
    `;
    const { rows } = await db.query(sql);
    return rows[0];
  }

  static async getAllTransactions() {
    const sql = `
      SELECT
        t.id,
        t.transaction_id, 
        (
          SELECT JSON_AGG(item_obj)
          FROM (
            SELECT
              ti.id,
              ti.item_name AS name,
              ti.total,
              ti.size,
              ti.temperature,
              ti.quantity,
              (
                SELECT JSON_AGG(addon_row)
                FROM (
                  SELECT tia.id, tia.addon_name, tia.addon_price
                  FROM transaction_item_addons AS tia
                  WHERE tia.transac_item_id = ti.id
                ) AS addon_row
              ) AS addons
            FROM transaction_items AS ti
            WHERE ti.transaction_id = t.id
          ) AS item_obj
        ) AS items,
        (
          SELECT JSON_BUILD_OBJECT('id', s.id, 'name', s.name)
          FROM staff AS s
          WHERE s.id = t.staff_id
        ) AS cashier,
        t.payment_method,
        t.total_amount,
        t.status,
        t.created_at
      FROM transactions AS t
      ORDER BY t.created_at DESC;
    `;
    const { rows } = await db.query(sql);
    return rows;
  }
}

export default TransactionModel;
