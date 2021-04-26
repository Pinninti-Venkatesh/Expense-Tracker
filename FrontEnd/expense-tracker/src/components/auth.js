import { API } from "../backend"
import { Link, Redirect } from "react-router-dom";
export const signIn=user=>{
    return fetch(`${API}signin`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    }).then(response=>{
        return response.json();
    }).catch(err=>{
        console.log(err);
    });
}

export const authenticate=(data,next)=>{
    if(window){
        localStorage.setItem('jwt',JSON.stringify(data));
        next();
    } 
}

export const signOut=(next)=>{
    if(window){
        localStorage.removeItem('jwt')
        next();
    }
    return fetch(`{API}/signout`,{
        method:"GET"
    })
    .then(response=>console.log('signout success'))
    .catch(err=>console.log(err));
}

export const isAuthenticated=()=>{
    if(!window){
        return false;
    }
    if (localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem("jwt"));
    }
    else{
        return false;
    }
}