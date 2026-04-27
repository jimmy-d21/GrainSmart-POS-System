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
}

export default TransactionModel;
