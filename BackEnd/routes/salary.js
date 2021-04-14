const express = require('express');
const { isSignedIn } = require('../controllers/auth');
const { addSalary, removeSalary, getAllSalary } = require('../controllers/salary');

const router=express.Router();

router.post('/create/',isSignedIn,addSalary);

router.delete('/remove/',isSignedIn,removeSalary);

router.get('/All',isSignedIn,getAllSalary);

module.exports=router;