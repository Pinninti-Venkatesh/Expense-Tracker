const express = require('express');
const { isSignedIn } = require('../controllers/auth');
const router=express.Router();
const {createTransaction,deleteTransaction, getTransactions}=require('../controllers/transaction');

router.post('/create',isSignedIn,createTransaction);
router.delete('/delete',isSignedIn,deleteTransaction);
router.get('/All',isSignedIn,getTransactions);
module.exports=router;
