const User=require('../models/user');
const {validationResult}=require("express-validator");
var jwt=require("jsonwebtoken");
var expressjwt=require("express-jwt");
require('dotenv').config();
exports.signin=(req,res)=>{
    const errors=validationResult(req);
    console.log('inside signin');
    console.log('ERRORS',errors);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        });
    }
    const{email,password}=req.body;
    // console.log(req.body);
    User.findOne({email:email},(err,user)=>{
        // console.log(err,user);
        if(err||!user){
           return res.status(400).json({
                error:'User does not exist'
            });
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error:'Invalid credentials'
            });
        }
        const authToken=jwt.sign({_id:user._id},process.env.SECRET);
        res.cookie("token",authToken,{expire:new Date()+9999});
        const{_id,name,email,role}=user;
        return res.json({
            authToken,user:{_id,name,email,role}
        });
    });
};

exports.signout=(req,res)=>{
    res.clearCookie("token");
    res.json({
        message:'user signout successful'
    });
    //res.send('user signout successful');
}

//protected routes

exports.isSignedIn=expressjwt({
    secret:process.env.SECRET,
    userProperty:"auth",
    algorithms: ['sha1', 'RS256', 'HS256'],
    // algorithms: ['RS256']
});

//custom middleware

exports.isAuthenticated=(req,res,next)=>{
    let checker=req.profile&&req.auth&&req.profile._id==req.auth._id
    console.log('isAuthenticated req profile',req.profile);
    console.log('isAuthenticated req auth',req.auth);
    if(!checker){
        return res.status(403).json({
            error:"ACCESS DENIED"
        });
    }
    next();
}