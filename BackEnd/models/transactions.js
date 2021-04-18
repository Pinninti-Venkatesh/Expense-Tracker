var mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: String,
    value: {
      type: Number,
      required: true,
    },
    SOE: {
      type: String,
      required: true,
    },
    link_id:{
      type:Array,
      default:[]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transactions", TransactionSchema,'Transactions');
