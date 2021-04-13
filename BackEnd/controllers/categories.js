const Categories = require("../models/Categories");
const { response } = require("../mods/response");

let Types=['Expense','Earn']
exports.createCategory=(req,res)=>{
    console.log(req.body);
    if(Types.includes(req.body.type)){
        const category=new Categories(req.body);
        category.save((err,category)=>{
            if(!err){
                return res.status(200).json(response('S','Category Saved','Category',category));
            }
            return res.status(500).json(response('E','Unable to Save Category','Err',err));
        });
    }
};

exports.deleteCategory=(req,res)=>{
    Categories.remove({name:req.name},(err,category)=>{
        if(!err){
            return res.status(200).json(response('S','Category deleted'));
        }
        return res.status(500).json(response('E','Unable to delete Category','Err',err));
    });
};

exports.getAllCategories=(req,res)=>{
    Categories.find((err,Categories)=>{
        if(!err){
            return res.status(200).json(response('S','Successs','Categories',Categories));
        }
        return res.status(500).json(response('E','Unable to fetch all  Categories','Err',err));
    });
};

exports.getEarnCategories=(req,res)=>{
    Categories.find({type:Types[1]},(err,Categories)=>{
        if(!err){
            return res.status(200).json(response('S','Successs','Categories',Categories));
        }
        return res.status(500).json(response('E','Unable to fetch all  Categories','Err',err));
    });
};

exports.getExpenseCategories=(req,res)=>{
    Categories.find({type:Types[0]},(err,Categories)=>{
        if(!err){
            return res.status(200).json(response('S','Successs','Categories',Categories));
        }
        return res.status(500).json(response('E','Unable to fetch all  Categories','Err',err));
    });
};