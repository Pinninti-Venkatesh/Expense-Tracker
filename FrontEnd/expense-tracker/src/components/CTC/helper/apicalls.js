import {API} from "../../../backend";
export const getAllSalary=token=>{
    return fetch(`${API}salary/All`,{
        method:'GET',
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    }).then(response=>{
        return response.json();
    }).catch(err=>{
        console.log('error in getAllSalary',err);
    });
}

export const addSalary=(token,salary)=>{
    console.log('inside add salary',salary);
    return fetch(`${API}salary/create`,{
        method:'POST',
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:salary
    }).then(response=>{
        console.log('add salary response',response);
        return response.json();
    }).catch(err=>{
        console.log('error in addSalary',err);
    })
}

export const addCTC=(token,ctc)=>{
    console.log('inside add salary',ctc);
    return fetch(`${API}ctc/create`,{
        method:'POST',
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:ctc
    }).then(response=>{
        console.log('add ctc response',response);
        return response.json();
    }).catch(err=>{
        console.log('error in addCTC',err);
    })
}

export const getAllCTC=token=>{
    return fetch(`${API}ctc/All`,{
        method:'GET',
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    }).then(response=>{
        return response.json();
    }).catch(err=>{
        console.log('error in getAllCTC',err);
    })
}

export const removeSalary=(id,token)=>{
    return fetch(`${API}salary/remove`,{
        method:'DELETE',
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(id)
    }).then(response=>{
        return response.json();
    }).catch(err=>{
        console.log('error in removeCTC',err);
    })
}

export const removeCTC=(id,token)=>{
    return fetch(`${API}ctc/remove`,{
        method:'DELETE',
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(id)
    }).then(response=>{
        return response.json();
    }).catch(err=>{
        console.log('error in removeCTC',err);
    })
}