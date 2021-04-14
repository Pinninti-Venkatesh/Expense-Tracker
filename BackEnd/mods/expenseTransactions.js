const Transactions = require("../models/Transactions");
// const { response } = require("./response");

exports.getExpensesCategorically = (req, res, query) => {
  console.log("query", query);
  Transactions.aggregate([
    { $match: query },
    { $group: { _id: "$category", total: { $sum: "$value" } } },
  ]).exec((err, categoricalExpense) => {
    console.log(err, categoricalExpense);
    if (!err) {
      return res.status(200).json({
        response: categoricalExpense,
      });
    }
    return res.status(500).json({
      response: err,
    });
  });
};

exports.getExpenses = (req, res, query) => {
  Transactions.aggregate([
    { $match: query },
    { $group: { _id: null, total: { $sum: "$value" } } },
  ]).exec((err, dayTransactions) => {
    if (!err) {
      return res.status(200).json({ response: dayTransactions });
    }
    return res.status(500).json({
      response: err,
    });
  });
};
