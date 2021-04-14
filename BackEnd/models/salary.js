const mongoose = require('mongoose');

const salarySchema=new mongoose.Schema({
    month:{
        type:String
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
        required:true
    },
    net_salary:{
        type:Number,
        required:true
    },
    doc:{
        type:Buffer,
        contentType: String,
    }
});

module.exports=mongoose.model("Salary",salarySchema);