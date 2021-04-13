const mongoose = require('mongoose');

const BillSchema=new mongoose.Schema({
    value:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    validity:String,
    pay_date:Date
},{timestamps:true});

module.exports=mongoose.model("Bill",BillSchema);