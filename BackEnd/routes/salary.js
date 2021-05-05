const express = require('express');
const { isSignedIn } = require('../controllers/auth');
const { addSalary, removeSalary, getAllSalary, getNetSalary } = require('../controllers/salary');

const router=express.Router();

router.post('/create/',addSalary);

router.delete('/remove/',isSignedIn,removeSalary);

router.get('/All',isSignedIn,getAllSalary);

router.get('/getNetSalary',isSignedIn,getNetSalary);

module.exports=router;