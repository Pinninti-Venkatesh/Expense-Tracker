const express = require('express');
const { isSignedIn, isAuthenticated } = require('../controllers/auth');
const { createCategory, deleteCategory, getAllCategories, getEarnCategories, getExpenseCategories } = require('../controllers/categories');
const router=express.Router();

router.post('/create/',isSignedIn,createCategory);

router.delete('/remove/',isSignedIn,deleteCategory);

router.get('/All',isSignedIn,getAllCategories);
router.get('/Earn',isSignedIn,getEarnCategories);
router.get('/Expense',isSignedIn,getExpenseCategories);

module.exports=router;