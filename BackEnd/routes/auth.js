const express=require("express");
const { signout, signup, signin,} = require("../controllers/auth");
const {check}=require("express-validator");
const router=express.Router();

router.get('/signout',signout);

router.post('/signin',[
    check("email","email is in bad format").isEmail(),
    check("password","password should be 5 characters min").isLength({min:5}),
],signin);

// router.get('/testroute',isSignedIn,(req,res)=>{
//     res.send('a protected route');
// });

module.exports=router;