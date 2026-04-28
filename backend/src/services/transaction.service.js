import MenuModel from "../models/menu.model.js";
import TransactionModel from "../models/transaction.model.js";
import generateTransactionId from "../utils/generateTransactionId.js";
import db from "../config/db.js"; // Import your db pool

export const addTransaction = async (
  staff,
  payment_method,
  total_amount,
  items,
  status,
) => {
  // Get a single client from the pool to run a transaction
  const client = await db.connect();

  try {
    await client.query("BEGIN"); // START DATABASE TRANSACTION

    // Generate Unique ID (Simple check)
    let uniqueId = generateTransactionId();

    // Create the Main Transaction
    const newTransaction = await TransactionModel.addTransactionWithClient(
      client,
      {
        transaction_id: uniqueId,
        staff_id: staff.id,
        payment_method,
        total_amount,
        status,
      },
    );

    const transactionDetails = [];

    // Process Items
    for (const item of items) {
      const existingMenu = await MenuModel.findMenuItemById(item.menu_item_id);
      if (!existingMenu)
        throw new Error(`Menu item ${item.menu_item_id} not found`);

      const newTransactionItem =
        await TransactionModel.addTransacItemWithClient(client, {
          item_name: existingMenu.name,
          transaction_id: newTransaction.id,
          menu_item_id: existingMenu.id,
          size: item.size,
          temperature: item.temperature,
          quantity: item.quantity,
          price_per_unit: item.price_per_unit,
          total: item.total,
        });

      // Process Add-ons
      const savedAddons = [];
      if (item.addons && item.addons.length > 0) {
        for (const addon of item.addons) {
          const newAddon =
            await TransactionModel.addTransacItemAddOnzWithClient(
              client,
              newTransactionItem.id,
              addon.name,
              addon.price,
            );
          savedAddons.push(newAddon);
        }
      }

      transactionDetails.push({
        ...newTransactionItem,
        addons: savedAddons,
      });
    }

    await client.query("COMMIT"); // SAVE EVERYTHING TO DB
    return { ...newTransaction, items: transactionDetails };
  } catch (error) {
    await client.query("ROLLBACK"); // UNDO EVERYTHING IF ERROR OCCURS
    throw error;
  } finally {
    client.release(); // Close the connection
  }
};

export const getAnalytics = async () => {
  const [summary, transacHistory] = await Promise.all([
    TransactionModel.getAnalyticsSummary(),
    TransactionModel.getAllTransactions(),
  ]);

  return {
    total_revenue: Number(summary.total_revenue),
    total_transactions: Number(summary.total_transactions),
    total_completed: Number(summary.total_completed),
    total_refunded: Number(summary.total_refunded),
    items: transacHistory,
  };
};
