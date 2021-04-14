const { response } = require("../mods/response");

exports.nextPayDate=(req,res)=>{
    let daysUntil=0;
    let date=new Date();
    salaryDate=getSalaryDay(new Date(date.getFullYear,date.getMonth(),7));
    if(date.getDate()==salaryDate){
        daysUntil='PayDay';
    }
    else if(salaryDate>date.getDate()){
        daysUntil=salaryDate-date.getDate();
    }
    else{
        let day=getSalaryDay(new Date(date.getFullYear,date.getMonth()+1,7));
        const currDate = new Date();
        const nextDate = new Date(date.getFullYear,date.getMonth()+1,day)
        return daysUntil = Math.ceil(Math.abs(nextDate - currDate) / (1000 * 60 * 60 * 24)); 
    }
    return res.status(200).json(response('S',daysUntil+''));
}

getSalaryDay=(Date)=>{
    let day=Date.getDay();
    let currentSalaryDate=7;
    if(day==6){
        currentSalaryDate=6;
    }
    if(day==7){
        currentSalaryDate=5;
    }
    return currentSalaryDate;
}