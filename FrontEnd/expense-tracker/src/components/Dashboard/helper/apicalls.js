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
        return response.json();
    }).catch(err=>{
        console.log('error in loadingBalance',err);
    })
};

export const getPayDay=token=>{
    return fetch(`${API}get/nextPayDay`,{
        method:'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }).then(response=>{
        return response.json();
    }).catch(err=>{
        console.log('error in getPayDay',err);
    });
};

export const getPeriodExpenses=(token,routeName)=>{
    return fetch(`${API}get/${routeName}`,{
        method:'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }).then(response=>{
        return response.json();
    }).catch(err=>{
        console.log('error in getTotalExpenses',err);
    });
};

export const getCategoricalExpenses=(token,routeName)=>{
    return fetch(`${API}get/${routeName}`,{
        method:'GET',
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    }).then(response=>{
        return response.json();
    }).catch(err=>{
        console.log('error in getCategoricalExpenses',err);
    })
};

export const getTotalSavings=token=>{
    return fetch(`${API}get/totalSavings`,{
        method:'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }).then(response=>{
        return response.json();
    }).catch(err=>{
        console.log('error in getTotalExpenses',err);
    });
};

export const getTotalExpenses=token=>{
    return fetch(`${API}get/totalExpenses`,{
        method:'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }).then(response=>{
        return response.json();
    }).catch(err=>{
        console.log('error in getTotalExpenses',err);
    });
};

export const getNetSalary=token=>{
    return fetch(`${API}salary/getNetSalary`,{
        method:'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }).then(response=>{
        return response.json();
    }).catch(err=>{
        console.log('error in getNetSalary',err);
    })
}

export const getAllTransactions=token=>{
    return fetch(`${API}transaction/All`,{
        method:'GET',
        headers:{
            Accept:"application/json",
            "Content-Type":"application",
            Authorization:`Bearer ${token}`
        }
    }).then(response=>{
        return response.json();
    }).catch(err=>{
        console.log('error in getAllTransactions',err);
    })
}