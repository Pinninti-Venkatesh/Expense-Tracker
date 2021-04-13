const express = require('express');
const { isSignedIn } = require('../controllers/auth');
const router=express.Router();
const {createTransaction}=require('../controllers/transaction');

router.post('/create',isSignedIn,createTransaction);

module.exports=router;
