import * as transactionServices from "../services/transaction.service.js";

export const addTransaction = async (req, res) => {
  try {
    const { payment_method, total_amount, items, status } = req.body;
    const staff = req.staff;

    const newTransaction = await transactionServices.addTransaction(
      staff,
      payment_method,
      total_amount,
      items,
      status,
    );

    res
      .status(201)
      .json({ message: "Order completed successfully!", newTransaction });
  } catch (error) {
    console.log(`Error in addTransaction controller: ${error.message}`);
    return res.status(500).json({ message: error.message });
  }
};

export const getTransacAnalytics = async (req, res) => {
  try {
    const analytics = await transactionServices.getAnalytics();

    res.status(200).json({
      success: true,
      data: {
        total_revenue: analytics.total_revenue.toLocaleString("en-PH"),
        total_transactions:
          analytics.total_transactions.toLocaleString("en-PH"),
        total_completed: analytics.total_completed,
        total_refunded: analytics.total_refunded,
        items: analytics.items,
      },
    });
  } catch (error) {
    console.error(`Error in getTransacAnalytics: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Internal Server Error while fetching analytics.",
    });
  }
};
