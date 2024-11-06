
import baseUrl from "../baseUrl";
import socket from "../service/socket";


function LoginFunc (email ,password , history ,setmyId , setUser , toast,CloseDialog ){

    fetch(`${baseUrl}/api/login`,{
    method:"POST" , 
    headers:{
      'content-type': 'application/json'
    },
    body:JSON.stringify({email,password}) , 
    credentials: 'include' 
   }).then((res)=>{
    if(res.ok) { return res.json()}
    else {throw Error("The server is Not responding")}
   }).then((data)=>{
     CloseDialog(); 
     setUser(data)
     localStorage.setItem('myId',JSON.stringify(data.imazinistId))
     setmyId(JSON.parse(localStorage.getItem('myId'))); 
     socket.emit('active_user', data.imazinistId)
     history('/') ; 
   }).catch((err)=>{
     toast.error("Email or Password is not correct")
     console.log(err.message); 
   })
  
}

export default LoginFunc