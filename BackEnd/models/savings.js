const mongoose = require("mongoose");

const SavingSchema = new mongoose.Schema(
  {
    value: {
      type:Number,
      required:true
  },
    total_savings: {
      type:Number,
      required:true
  },
    transaction_type: {
      type:String,
      required:true
  },
  },
  { timestamps: true }
);

module.exports=mongoose.model("Savings",SavingSchema,'Savings');