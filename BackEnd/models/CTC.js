const mongoose=require('mongoose');

const CTCSchema=new mongoose.Schema({
    company_name:{
        type:String
    },
    basic_salary:{
        type:Number,
        required:true
    },
    flexi_basket:{
        type:Number,
        required:true
    },
    variable_pay:Number,
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
    health_benefit:{
        type:Number,
    },
    insurance:{
        type:Number,
        required:true
    },
    annual_ctc:{
        type:Number,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    to:Date,
    doc:{
        data:Buffer,
        contentType: String,
    }
},{strict:false});

module.exports=mongoose.model('CTC',CTCSchema);