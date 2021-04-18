const express = require('express');
const { isSignedIn } = require('../controllers/auth');
const router=express.Router();
const {createTransaction,deleteTransaction}=require('../controllers/transaction');

router.post('/create',isSignedIn,createTransaction);
router.post('/delete',isSignedIn,deleteTransaction);

module.exports=router;
