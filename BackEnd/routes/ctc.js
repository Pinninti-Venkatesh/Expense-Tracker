const express = require('express');
const { isSignedIn } = require('../controllers/auth');
const { addCTC, removeCTC, getAllCTC } = require('../controllers/CTC');
const router=express.Router();

router.post('/create/',isSignedIn,addCTC);

router.delete('/remove/',isSignedIn,removeCTC);

router.get('/All',isSignedIn,getAllCTC);

module.exports=router;