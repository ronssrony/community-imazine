import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
const socket = io('http://localhost:3000')
function Login() {
  const history = useNavigate()
  const [email, setEmail] = useState(''); 
  const [password ,setPassword] = useState('') ;
  function handlelogin(){
     
     fetch('http://localhost:3000/api/login',{
      method:"POST" , 
      headers:{
        'content-type': 'application/json'
      },
      body:JSON.stringify({email,password}) , 
      credentials: 'include'  
      
     }).then((res)=>{
      if(res.ok) {history('/') ; return res.json()}
      else {throw Error("The server is Not responding")}
     }).then((data)=>{
    
       socket.emit('active_user', data.imazinistId)
     }).catch((err)=>{
       console.log(err.message); 
     })
  }
  return (
  <div className=" " >
    <div className=" flex translate-y-40 ">
     <h1 className= "font-[joan]  max-sm:text-lg sm:text-3xl  bg-white rounded py-2 text-center">Imazinist, Where Every Find Tells a Story</h1>
   
       <div className=" mt-10 w-1/4 p-10 flex flex-col gap-4 ">
       <h1 className=" p-2 font-[joan] text-xl">Log In Your Account</h1>
       <input type="email" className="w-full min-w-60 p-2 text-lg outline-none bg-transparent border-b border-black" placeholder="Email or Username" onChange={(e)=>{setEmail(e.target.value)}} value={email} required />
       <input type="password" className="w-full  min-w-60 p-2 text-lg outline-none bg-transparent border-b border-black " placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} value={password} required />
       <button type="submit" onClick={()=>handlelogin()} className="bg-white w-20 border border-black py-2 rounded ">Log In</button>
       </div>
     
   
    </div>
    </div>
  )
}

export default Login