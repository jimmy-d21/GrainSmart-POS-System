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
