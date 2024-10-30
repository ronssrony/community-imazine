import baseUrl from "../baseUrl";
import axios from "axios";
async function getData (){
    const response = await axios.get(`${baseUrl}/api/products`)
    return response.data
}

async function getHomepage (){
     const response = await axios.get(`${baseUrl}/api/postfeed`,{
        withCredentials: true, 
     }); 
     return response.data
}

async function getProfile(){
    const response = await axios.get(`${baseUrl}/api/profile` , {
        withCredentials:true,
    })
    return response.data
}

export {getData , getHomepage , getProfile}