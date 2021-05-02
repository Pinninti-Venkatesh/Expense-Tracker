import { API } from "../../../backend"

export const getBills=token=>{
    return fetch(`${API}get/Bills`,{
        method:'GET',
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    }).then(response=>{
        return response.json();
    }).catch(err=>{
        console.log('error in getBills',err);
    });
}