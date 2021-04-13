const Transactions = require("../models/Transactions");
const { response } = require("../mods/response");
const {creatLinkTransaction}=require('../mods/linkTransactions');

exports.createTransaction=(req,res)=>{
    const transaction=new Transactions(req.body);
    transaction.save((err,transaction)=>{
        if(!err){
            return creatLinkTransaction(req,res,transaction);
            //return res.status(200).json(response('S','Success',transaction));
        }
        return res.status(500).json(response('E','Failed to create Transaction','err',err));
    });
};

