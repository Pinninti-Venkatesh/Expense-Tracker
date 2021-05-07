import { API } from "../../../backend"

export const updatePassword=(token,body)=>{
    return fetch(`${API}changepassword`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`,
        },
        body:JSON.stringify(body)
    }).then(res=>{
        return res.json();
    }).catch(err=>{
        console.log('error in updatePassword',err);
    })
}