const mongoose = require('mongoose');

const SalaryWalletSchema=new mongoose.Schema({
    value:{
        type:Number,
        required:true
    },
    transaction_type:{
        type:String,
        required:true
    },
    balance_left:{
        type:Number,
        required:true
    },
},{timestamps:true});

module.exports=mongoose.model("SalaryWallet",SalaryWalletSchema,'SalaryWallet');