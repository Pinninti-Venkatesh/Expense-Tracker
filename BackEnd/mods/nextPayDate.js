exports.nextPayDate=(req,res)=>{
    let daysUntil=0;
    let date=new Date();
    salaryDate=getSalaryDay();
    if(date.getDate()==salaryDate){
        daysUntil='PayDay';
    }
    else if(salaryDate>date.getDate()){
        daysUntil=salaryDate-date.getDate();
    }
    else{
        let day=getSalaryDay();
        const currDate = new Date();
        const nextDate = new Date(date.getFullYear(),date.getMonth()+1,day)
        daysUntil = Math.ceil(Math.abs(nextDate - currDate) / (1000 * 60 * 60 * 24));
    }
    return res.status(200).json({response:daysUntil});
}

getSalaryDay=()=>{
    let inputDate=new Date(new Date().getFullYear(),new Date().getMonth(),7);
    let day=inputDate.getDay();
    console.log('day',day);
    let currentSalaryDate=7;
    if(day==6){
        currentSalaryDate=6;
    }
    if(day==0){
        currentSalaryDate=5;
    }
    return currentSalaryDate;
}