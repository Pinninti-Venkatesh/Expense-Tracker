import { API } from "../../../backend"

export const loadBalance=token=>{
    return fetch(`${API}get/getBalance`,{
        method:'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }).then(response=>{
        console.log('getBalance API',response);
        return response.json();
    }).catch(err=>{
        console.log('error in loadingBalance',err);
    })
}