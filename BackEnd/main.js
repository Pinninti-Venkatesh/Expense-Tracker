const express = require('express');
const  mongoose  = require('mongoose');
const app=express();
const cors = require('cors');
const cookieParser=require("cookie-parser");
const authRouter=require('./routes/auth');
const categoriesRouter=require('./routes/categories');
const transactionRouter=require('./routes/transaction');
const getRouter=require('./routes/get');
const ctcRouter=require('./routes/ctc');
const salaryRouter=require('./routes/salary');
require('dotenv').config();
mongoose.connect(process.env.DATABASEURL,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:true,useCreateIndex:true}).then(()=>{
    console.log('DB CONNECTED');
}).catch((err)=>{
    console.log('error in connecting database ',err);
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/',authRouter);
app.use('/categories/',categoriesRouter);
app.use('/transaction/',transactionRouter);
app.use('/get/',getRouter);
app.use('/ctc/',ctcRouter);
app.use('/salary/',salaryRouter);

app.listen(8080,()=>{
    console.log('app server running at 8080');
})

