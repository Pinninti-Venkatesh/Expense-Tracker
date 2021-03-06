const savings = require("../models/savings");
const Transactions = require("../models/Transactions");
const SalaryWallet = require("../models/SalaryWallet");
const Bill = require("../models/bills");
// const { response } = require("../mods/response");
const {
  getExpensesCategorically,
  getExpenses,
} = require("../mods/expenseTransactions");

exports.getBills = (req, res) => {
  try{
    Bill.find({},{name:1,validity:1,pay_date:1,value:1,_id:0}).sort({createdAt:-1}).exec((err, bills) => {
      if (!err && bills) {
        return res.status(200).json({ response: bills });
      }
      return res
        .status(500)
        .json({ response: err });
    })
  }catch(e){
    console.log('error in getBills',e);
  }
}

exports.getTotalSavings = (req, res) => {
  savings
    .findOne()
    .sort({ createdAt: -1 })
    .exec((err, saving) => {
      if (!err && saving) {
        return res.status(200).json({ total_savings: saving.total_savings });
      }
      return res
        .status(500)
        .json({ response: err });
    });
};

exports.getBalance = (req, res) => {
  SalaryWallet.findOne().sort({ createdAt: -1 }).exec((err, salaryWallet) => {
    if (!err && salaryWallet) {
      return res.status(200).json({ balance: salaryWallet.balance_left });
    }
    return res.status(500).json({ response: err });
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
      $gte: new Date(date.setMonth(date.getMonth() - 1)),
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
      $gte: new Date(date.setMonth(date.getMonth() - 1)),
    },
    type: "Expense",
  };
  return getExpensesCategorically(req, res, query);
};

exports.getTotalExpensesCategorically = (req, res) => {
  let query = { type: "Expense" };
  return getExpensesCategorically(req, res, query);
};
