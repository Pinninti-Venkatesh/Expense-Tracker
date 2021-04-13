const savings = require("../models/savings");
const { response } = require("../mods/response");
const Transactions = require("../models/Transactions");
const Bills=require('../models/bills');
const SalaryWallet=require('../models/SalaryWallet');

exports.creatLinkTransaction=(req,res,transaction)=>{
    if(req.body.category=='Bills'){
        return createBill(req,res);
    }
    if((req.body.category=='Savings'&& req.body.SOE!='Savings')||(req.body.category!='Savings'&& req.body.SOE=='Savings')){
        return createSavingsTransaction(req,res);
    }
    else if(req.body.category=='Savings'&& req.body.SOE=='Savings'){
        Transactions.findOneAndDelete({},{sort: {createdAt: -1 }},(err,trans)=>{
            console.log('err',err);
            console.log('trans',trans);
        });
        return res.status(500).json(response('E','SOE and category cannot be same'));
    }
    if(req.body.SOE=='Salary'||req.body.category=='Salary'){
        return updateSalaryWallet(req,res,transaction);
    }
    return res.status(200).json(response('S','Success','Transaction',transaction));
};

const updateSalaryWallet=(req,res,transaction)=>{
    let balance_left=0;
    SalaryWallet.findOne().sort({'createdAt':-1}).exec((err,lastSalary)=>{
        console.log(err,lastSalary);
        if(!err&&lastSalary){
            balance_left=parseFloat(lastSalary.balance_left);
        }
        balance_left=req.body.type=='Earn'?balance_left+parseFloat(req.body.value):balance_left-parseFloat(req.body.value);
        if(balance_left<0){
            Transactions.findOneAndDelete({},{sort: {createdAt: -1 }},(err,trans)=>{
                console.log('err',err);
                console.log('trans',trans);
            });
            return res.status(500).json(response('E','You do not have enough funds to spend from Salary','Err',err));
        }
        const wallet={
            value:req.body.value,
            transaction_type:req.body.type=='Earn'?'Credited':'Debited',
            balance_left:balance_left
        };
        new SalaryWallet(wallet).save((err,wallet)=>{
            if(!err){
                // transaction={...wallet};
                return res.status(200).json(response('S','Transaction Saved','Transaction',transaction));
            }
            Transactions.findOneAndDelete({},{sort: {createdAt: -1 }},(err,trans)=>{
                console.log('err',err);
                console.log('trans',trans);
            });
            return res.status(500).json(response('E','Unable to Save Transaction','Err',err));
        })
    });
}

const createBill=(req,res)=>{
    let bill={
        name:req.body.description,
        validity:req.body.validity,
        pay_date:new Date(req.body.paydate),
        value:req.body.value
    };
    bill=new Bills(bill);
    bill.save((err,bill)=>{
        console.log('bills',bill);
        console.log('err',err)
        if(!err){
            return res.status(200).json(response('S','Bill Saved','bill',bill));
        }
        return res.status(500).json(response('E','Unable to Save Bill','Err',err));
    });
}

const createSavingsTransaction=(req,res)=>{
    let totalSavings=0;
    savings.findOne().sort({'createdAt':-1}).exec((err,latestSaving)=>{
        console.log(err,latestSaving);
        if(!err&&latestSaving){
            totalSavings=parseFloat(latestSaving.total_savings);
        }
        totalSavings=req.body.SOE=='Savings'?totalSavings-parseFloat(req.body.value):totalSavings+parseFloat(req.body.value);
        if(totalSavings<0){
            Transactions.findOneAndDelete({},{sort: {createdAt: -1 }},(err,trans)=>{
                console.log('err',err);
                console.log('trans',trans);
            });
            return res.status(500).json(response('E','You do not have enough funds to spend from Savings','Err',err));
        }
        const saving={
            transaction_type:req.body.SOE=='Savings'?'debit':'credit',
            total_savings:totalSavings,
            value:req.body.value
        };
        new savings(saving).save((err,saving)=>{
            if(!err){
                return res.status(200).json(response('S','Transaction Saved','saving',saving));
            }
            Transactions.findOneAndDelete({},{sort: {createdAt: -1 }},(err,trans)=>{
                console.log('err',err);
                console.log('trans',trans);
            });
            return res.status(500).json(response('E','Unable to Save Transaction','Err',err));
        });
    }); 
};

// createBill((req,res)=>{

// });