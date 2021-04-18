const Savings = require("../models/savings");
const Transactions = require("../models/Transactions");
const Bills = require("../models/bills");
const SalaryWallet = require("../models/SalaryWallet");
const salary = require("../models/salary");


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
  if (salary != 'NA' && !Object.keys(salary).length == 0)
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
  // console.log(req.body._id);
  Transactions.findOneAndDelete({ _id: req.body._id }, (err, transaction) => {
    console.log('transaction to delete', transaction);
    if (transaction.link_id) {
      let linkId = transaction.link_id;
      console.log('linkId', linkId);
      console.log('linkId type', typeof link_id);
      linkId.forEach((obj) => {
        console.log('obj', obj);
        let modelName = Object.keys(obj)[0];
        console.log('modelName', modelName);
        if (modelName == 'SalaryWallet') {
          console.log('id', obj[modelName]);
          SalaryWallet.findOne({ _id: obj[modelName] }, async (err, salaryWallet) => {
            if (!err) {
              SalaryWallet.findOne().sort({ createdAt: -1 }).exec((err, lastSalary) => {
                let balance_left = 0;
                if (!err && lastSalary) {
                  balance_left = parseFloat(lastSalary.balance_left);
                }
                balance_left = salaryWallet.transaction_type == "Debited" ? balance_left + parseFloat(salaryWallet.value) : balance_left - parseFloat(salaryWallet.value);
                const wallet = {
                  value: salaryWallet.value,
                  transaction_type:salaryWallet.transaction_type == "Debited" ? "Credited" : "Debited",
                  balance_left: balance_left,
                  description: 'Created because of deletion of record',
                  deleted_doc: [salaryWallet],
                };
                new SalaryWallet(wallet).save((err, wallet) => {
                  console.log('wallet', wallet)
                  if (!err) {
                    console.log(wallet._id);
                  } else {
                    console.log({ response: err });
                  }
                  SalaryWallet.findOneAndDelete({ _id: obj[modelName] }, (err, deletedSalary) => {
                    console.log('err', err);
                    console.log('deletedSalary', deletedSalary);
                  });
                });
              });

            }
          });
        }
        if (modelName == 'Savings') {
          Savings.findOne({ _id: obj[modelName] }, (err, saving) => {
            
            let totalSavings = 0;
            Savings.findOne().sort({ createdAt: -1 }).exec(async (err, latestSaving) => {
              if (!err && latestSaving) {
                totalSavings = parseFloat(latestSaving.total_savings);
                totalSavings = saving.transaction_type == 'credit' ? totalSavings - parseFloat(saving.value) : totalSavings + parseFloat(saving.value);
                // saving.transaction_type = saving.transaction_type == 'credit' ? 'debit' : 'credit';
                // saving.total_savings = totalSavings;
                let newSaving={
                  deleted_doc:[saving],
                  transaction_type:saving.transaction_type == 'credit' ? 'debit' : 'credit',
                  total_savings:totalSavings,
                  value:saving.value,
                  description: 'Created because of deletion of record',
                };
                new Savings(newSaving).save((err, saving) => {
                  if (!err) {
                    console.log(saving._id);
                  } else {
                    console.log({ response: err });
                  }
                  Savings.findOneAndDelete({ _id: obj[modelName]},(err, deletedSaving) => {
                    console.log('err', err);
                    console.log('deletedSaving', deletedSaving);
                  });
                });
              }
            });
          })
        }
        if (modelName == 'Bills') {
          Bills.findOneAndDelete({ _id: obj[modelName] }, (err, bill) => {
            if (!err) {
              console.log('bill', bill);
            }
          });
        }

      })
      res.status(200).json({ response: 'done' });
    }
    // return res.status(200);
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
    else {
      resolve('NA');
    }
  });
};

const updateSalaryWallet = (req) => {
  console.log('req usw', req.body);
  return new Promise(function (resolve, reject) {
    if (req.body.SOE == "Salary" || req.body.category == "Salary") {
      let balance_left = 0;
      SalaryWallet.findOne().sort({ createdAt: -1 }).exec((err, lastSalary) => {
        if (!err && lastSalary) {
          balance_left = parseFloat(lastSalary.balance_left);
        }
        balance_left = req.body.type == "Earn" && req.body.category == "Salary"? balance_left + parseFloat(req.body.value) : balance_left - parseFloat(req.body.value);
        if (balance_left < 0) {
          let response = { response: 'You do not have enough funds to spend from Salary', code: 'T' };
          resolve(response);
          return;
        }
        const wallet = {
          value: req.body.value,
          transaction_type: req.body.type == "Earn" && req.body.category == "Salary"? "Credited" : "Debited",
          balance_left: balance_left
        };
        new SalaryWallet(wallet).save((err, wallet) => {
          console.log('wallet', wallet)
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
    else {
      resolve('NA');
    }
  });
};



const createSavingsTransaction = (req) => {
  return new Promise(function (resolve, reject) {
    if ((req.body.category == "Savings" && req.body.SOE != "Savings") || (req.body.category != "Savings" && req.body.SOE == "Savings")) {
      let totalSavings = 0;
      Savings.findOne().sort({ createdAt: -1 }).exec(async (err, latestSaving) => {
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
        await new Savings(saving).save((err, saving) => {
          if (!err) {
            resolve(saving._id);
          } else {
            resolve({ response: err });
          }
        });
      });
    }
    else {
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
