import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/UserProvider";
import { Usenotification } from "../context/Notification";
import { toast } from "react-toastify";
import LoginFunc from "../Utility/LoginFn";
import { UseLoginContext } from "../context/LoginProvider";
import { RiFacebookLine, RiGoogleLine } from "@remixicon/react";
import baseUrl from "../baseUrl";
function Login() {
  const {setUser} = useContext(userContext)
  const history = useNavigate()
  const {setmyId} = Usenotification()
  const [email, setEmail] = useState(''); 
  const [password ,setPassword] = useState('') ;
  const {CloseDialog} = UseLoginContext(); 
  
  const handleLogin =()=>{
      
      LoginFunc(email ,password , history ,setmyId , setUser , toast ,CloseDialog)
  }
  return (

  <div className="  h-full " >
    <div className="  flex flex-col items-center gap-5">
       <div className=" mt-10  p-10  flex flex-col gap-4 col-span-1  ">
       <h1 className="p-2  text-3xl">Log In Your Account</h1>
       <input type="email" className="w-full min-w-60 p-2 text-lg outline-none bg-transparent border-b border-black" placeholder="Email or Username" onChange={(e)=>{setEmail(e.target.value)}} value={email} required />
       <input type="password" className="w-full  min-w-60 p-2 text-lg outline-none bg-transparent border-b border-black " placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} value={password} required />
 
        <div className="flex gap-28 items-center">
        <button type="submit" onClick={()=>handleLogin()} className="bg-white w-20 border border-black py-2 rounded ">Log In</button>
         <div className="flex gap-3">
         <a href={`${baseUrl}/auth/google`} className="border border-black px-2 py-2 bg-white"> <RiGoogleLine/> </a>
         <a href={`${baseUrl}/auth/facebook`} className="border border-black px-2 py-2 bg-white"> <RiFacebookLine/> </a>
         </div>
        </div>
        <a href={`${baseUrl}/user/registration`} target="_top" > Create Account?</a>
  
       </div>

    </div>
    </div>
  )
}

export default Login