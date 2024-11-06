import { useContext , createContext , useState, useEffect } from "react";
import Login from "../Pages/Login";
const LoginContext = createContext(null) ; 

export const UseLoginContext = ()=>{
    const logincontext = useContext(LoginContext); 
    return logincontext 
}


export const LoginProvider = ({children})=>{
       const handleDialog = ()=>{
        const dialogbox = document.querySelector('.dialogbox'); 
        dialogbox.showModal(); 
       }
       const CloseDialog = ()=>{
        const dialogbox = document.querySelector('.dialogbox'); 
        dialogbox.close(); 
       }
       document.addEventListener('click',function (event){
           if(event.target.nodeName=="DIALOG")CloseDialog(); 
       })
        return (
     
            <LoginContext.Provider value={{handleDialog ,CloseDialog}}>
              <dialog className="dialogbox px-5   p-2  rounded-lg bg-[#f7f6f4]  ">    
              <figure className="w-28 h-16 absolute">
           <img className="w-full h-full object-cover " src="/images/snaplogo.png" alt=""/>
             </figure> 
               <Login></Login>
              </dialog>
                {children}
            </LoginContext.Provider>
        )
}