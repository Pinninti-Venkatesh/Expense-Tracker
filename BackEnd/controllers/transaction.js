const savings = require("../models/savings");
const Transactions = require("../models/Transactions");
const Bills = require("../models/bills");
const SalaryWallet = require("../models/SalaryWallet");


exports.createTransaction = async (req, res) => {
  let LinkId = [];

  if (req.body.category == "Savings" && req.body.SOE == "Savings") {
    return res.status(500).json({ response: "SOE and category cannot be same" });
  }

  let salary = await updateSalaryWallet(req);
  console.log('salary', salary);
  if (typeof salary == 'object' && salary.hasOwnProperty('code')) {
    return res.status(500).json({ response: salary.response });
  }
  if (salary != 'NA' &&!Object.keys(salary).length == 0)
    LinkId.push({ SalaryWallet: salary });

  let savings = await createSavingsTransaction(req);
  console.log('savings', savings);
  if (typeof savings == 'Object' && savings.hasOwnProperty('code')) {
    return res.status(500).json({ response: savings.response });
  }
  if (savings != 'NA' && !Object.keys(savings).length == 0)
    LinkId.push({ Savings: savings });

  let BillId = await createBill(req);
  console.log('BillId', BillId);
  if (BillId != 'NA' && !Object.keys(BillId).length == 0)
    LinkId.push({ Bills: BillId });
  createTransactionWithLinkId(req, res, LinkId);
};

exports.deleteTransaction = (req, res) => {
  Transactions.find({ _id: req._id }, (err, transaction) => {
    if (!err) {
      Transactions.findOneAndDelete({ _id: req._id });
    }
    if (transaction.link_id) {
      if (transaction.category == "Bills") {
        Bills.findOneAndDelete({ _id: transaction.link_id });
      }
      else if ((transaction.category == "Savings" && transaction.SOE != "Savings") || (transaction.category != "Savings" && transaction.SOE == "Savings")) {
        savings.findOneAndDelete({ _id: transaction.link_id });
      }
      else if (req.body.SOE == "Salary" || req.body.category == "Salary") {
        SalaryWallet.findOneAndDelete({ _id: transaction.link_id });
      }
    }
  });
}

const createBill = (req) => {
  return new Promise(function (resolve, reject) {
    if (req.body.category == "Bills") {
      let bill = {
        name: req.body.description,
        validity: req.body.validity,
        pay_date: new Date(req.body.paydate),
        value: req.body.value,
      };
      bill = new Bills(bill);
      bill.save((err, bill) => {
        if (!err) {
          resolve(bill._id);
        }
      });
    }
    else{
      resolve('NA');
    }
  });
};

const updateSalaryWallet = (req) => {
  return new Promise(function (resolve, reject) {
    if (req.body.SOE == "Salary" || req.body.category == "Salary") {
      let balance_left = 0;
      SalaryWallet.findOne().sort({ createdAt: -1 }).exec((err, lastSalary) => {
        if (!err && lastSalary) {
          balance_left = parseFloat(lastSalary.balance_left);
        }
        balance_left = req.body.type == "Earn" ? balance_left + parseFloat(req.body.value) : balance_left - parseFloat(req.body.value);
        if (balance_left < 0) {
          let response = { response: 'You do not have enough funds to spend from Salary', code: 'T' };
          resolve(response);
          return;
        }
        const wallet = {
          value: req.body.value,
          transaction_type: req.body.type == "Earn" ? "Credited" : "Debited",
          balance_left: balance_left,
        };
        new SalaryWallet(wallet).save((err, wallet) => {
          if (!err) {
            resolve(wallet._id);
            return;
          } else {
            resolve({ response: err });
            return;
          }
        });
      });
    }
    else{
      resolve('NA');
    }
  });
};



const createSavingsTransaction = (req) => {
  return new Promise(function (resolve, reject) {
    if ((req.body.category == "Savings" && req.body.SOE != "Savings") || (req.body.category != "Savings" && req.body.SOE == "Savings")) {
      let totalSavings = 0;
      savings.findOne().sort({ createdAt: -1 }).exec(async (err, latestSaving) => {
        console.log(err, latestSaving);
        if (!err && latestSaving) {
          totalSavings = parseFloat(latestSaving.total_savings);
        }
        totalSavings = req.body.SOE == "Savings" ? totalSavings - parseFloat(req.body.value) : totalSavings + parseFloat(req.body.value);
        if (totalSavings < 0) {
          resolve({ response: "You do not have enough funds to spend from Salary", code: 'T' });
        }
        const saving = {
          transaction_type: req.body.SOE == "Savings" ? "debit" : "credit",
          total_savings: totalSavings,
          value: req.body.value,
        };
        await new savings(saving).save((err, saving) => {
          if (!err) {
            resolve(saving._id);
          } else {
            resolve({ response: err });
          }
        });
      });
    }
    else{
      resolve('NA');
    }
  });
};

const createTransactionWithLinkId = (req, res, linkId) => {
  if (linkId) {
    req.body.link_id = linkId;
  }
  const transaction = new Transactions(req.body);
  transaction.save((err, transaction) => {
    if (!err) {
      return res.status(200).json({ response: transaction });
    }
    return res.status(500).json({ response: err });
  });
}
