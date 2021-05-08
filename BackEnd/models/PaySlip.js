const mongoose = require('mongoose');

const salarySchema=new mongoose.Schema({
    company_name:{
        type:String
    },
    month:{
        type:String
    },
    year:{
        type:Number
    },
    basic:{
        type:Number,
        required:true
    },
    flexi_basket:{
        type:Number,
        required:true
    },
    variable_pay:{
        type:Number,
    },
    PF:{
        type:Number,
        required:true
    },
    total_salary:{
        type:Number,
    },
    net_salary:{
        type:Number,
        required:true
    },
    doc:{
        // data:Buffer,
        // contentType: String,
    }
},{timestamps:true,strict:false});

module.exports=mongoose.model("PaySlip",salarySchema,'PaySlip');