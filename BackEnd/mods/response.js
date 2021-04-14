exports.response=(code,message,key,value)=>{
    let resJSON={
        code:code,
        message:message,
    };
    if(key&&value)
    resJSON[key]=value;
    // if(other){
    //     console.log(other);
    //     resJSON(...other);
    // }
    return resJSON;
}