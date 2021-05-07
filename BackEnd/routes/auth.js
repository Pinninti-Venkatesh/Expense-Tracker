const express=require("express");
const { signout, signin, changePassword, isSignedIn,} = require("../controllers/auth");
const router=express.Router();

router.get('/signout',signout);

router.post('/signin',signin);
// router.post('changepassword',isSignedIn,changePassword);
router.post('/changepassword',changePassword);

module.exports=router;