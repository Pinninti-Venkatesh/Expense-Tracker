const mongoose=require('mongoose');

const CTCSchema=new mongoose.Schema({
    basic_salary:{
        type:Number,
        required:true
    },
    flexi_basket:{
        type:Number,
        required:true
    },
    provident_fund:{
        type:Number,
        required:true
    },
    gratuity:{
        type:Number,
        required:true
    },
    statutory_bonus:{
        type:Number,
        required:true
    },
    health_benfit:{
        type:Number,
    },
    insurance:{
        type:Number,
        required:true
    },
    variable_pay:Number,
    annual_ctc:{
        type:Number,
        required:true
    },
    from:{
        type:Date,
        required:true
    },
    to:Date,
    doc:{
        type:Buffer,
        contentType: String,
    }
});

module.exports=mongoose.model('CTC',CTCSchema);