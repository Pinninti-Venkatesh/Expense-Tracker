//const { truncate } = require("lodash");
var mongoose = require("mongoose");
const crypto = require("crypto");
// const uuidv1 = require("uuid/v1");
// import { v4 as uuidv4 } from 'uuid';
const {v4 : uuidv4} = require('uuid')

var userSchema = new mongoose.Schema(
  {
    encry_password: {
      type: String,
      required: true,
    },
    salt: String,
  },
  { timestamps: true }
);
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });
userSchema.methods = {
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },
  securePassword: function (plainpassword) {
    if (!plainpassword) return true;
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (error) {
      return "";  
    }
  },
};

module.exports = mongoose.model("User", userSchema,'users');
