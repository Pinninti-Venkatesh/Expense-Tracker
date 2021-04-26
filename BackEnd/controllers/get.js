const savings = require("../models/savings");
const Transactions = require("../models/Transactions");
const SalaryWallet = require("../models/SalaryWallet");
// const { response } = require("../mods/response");
const {
  getExpensesCategorically,
  getExpenses,
} = require("../mods/expenseTransactions");

exports.getTotalSavings = (req, res) => {
  savings
    .findOne()
    .sort({ createdAt: -1 })
    .exec((err, saving) => {
      if (!err) {
        return res.status(200).json({ total_savings: saving.total_savings });
      }
      return res
        .status(500)
        .json({response:err});
    });
};

exports.getBalance=(req,res)=>{
SalaryWallet.findOne().sort({createdAt:-1}).exec((err,salaryWallet)=>{
  if(!err){
    return res.status(200).json({balance:salaryWallet.balance_left});
  }
  return res.status(500).json({response:err});
})
}
exports.getTotalExpenses = (req, res) => {
  let query = {
    type: "Expense",
  };
  return getExpenses(req, res, query);
};

exports.getMonthlyExpenses = (req, res) => {
  let date = new Date();
  //   console.log( new Date(), new Date(date.setDate(date.getDate() - 2)));
  let query = {
    createdAt: {
      $lte: new Date(),
      $gte: new Date(date.setDate(date.getMonth() - 1)),
    },
    type: "Expense",
  };
  return getExpenses(req, res, query);
};

exports.getWeeklyExpenses = (req, res) => {
  let date = new Date();
  //   console.log( new Date(), new Date(date.setDate(date.getDate() - 2)));
  let query = {
    createdAt: {
      $lte: new Date(),
      $gte: new Date(date.setDate(date.getDate() - 7)),
    },
    type: "Expense",
  };
  return getExpenses(req, res, query);
};

exports.getDailyExpenses = (req, res) => {
  let date = new Date();
  //   console.log( new Date(), new Date(date.setDate(date.getDate() - 2)));
  let query = {
    createdAt: {
      $lte: new Date(),
      $gte: new Date(date.setDate(date.getDate() - 1)),
    },
    type: "Expense",
  };
  return getExpenses(req, res, query);
};

//categorical Expenses

exports.getDailyExpensesCategorically = (req, res) => {
  let date = new Date();
  let query = {
    createdAt: {
      $lte: new Date(),
      $gte: new Date(date.setDate(date.getDate() - 1)),
    },
    type: "Expense",
  };
  return getExpensesCategorically(req, res, query);
};

exports.getWeeklyExpensesCategorically = (req, res) => {
  let date = new Date();
  //   console.log( new Date(), new Date(date.setDate(date.getDate() - 2)));
  let query = {
    createdAt: {
      $lte: new Date(),
      $gte: new Date(date.setDate(date.getDate() - 7)),
    },
    type: "Expense",
  };
  return getExpensesCategorically(req, res, query);
};

exports.getMonthlyExpensesCategorically = (req, res) => {
  let date = new Date();
  //   console.log( new Date(), new Date(date.setDate(date.getDate() - 2)));
  let query = {
    createdAt: {
      $lte: new Date(),
      $gte: new Date(date.setDate(date.getMonth() - 1)),
    },
    type: "Expense",
  };
  return getExpensesCategorically(req, res, query);
};

exports.getTotalExpensesCategorically = (req, res) => {
  let query = { type: "Expense" };
  return getExpensesCategorically(req, res, query);
};
