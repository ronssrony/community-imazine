import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import socket from "../../service/socket";
import { userContext } from "../../context/UserProvider";
import baseUrl from "../../baseUrl";
import { Usenotification } from "../../context/Notification";
import { PlaceholdersAndVanishInputDemo } from "./searchbar";
function Navbar(){
   const searchbar = useRef(null)
   const [login, setLogin] = useState(null);
   const {user} = useContext(userContext)
   const {setmyId} = Usenotification()
   const localuser = JSON.parse(localStorage.getItem('myId'))

   useEffect(()=>{
       
    fetch(`${baseUrl}/api/middleware`,{
     credentials: 'include'
    }).then((res)=>{
      if(res.ok) {    setLogin('valid') ; return res.json()} 
      else {
        setLogin(null)
       throw Error('user not logged in')
      }
    })
    .then(data=>{
      localStorage.setItem('myId',JSON.stringify(data.imazineId))
      setmyId(JSON.parse(localStorage.getItem('myId'))); 
      socket.emit('active_user', data.imazineId)
    })
    .catch((err)=>
   console.log(err.message))
   },  [user] )
   

    

   return(
      <div   className=" w-full  shadow-sm z-50 grid grid-cols-12 px-4 gap-x-4 items-center">
      <div className=" col-span-4 md:col-span-2 h-16 min-w-32" >
          <Link to="/" className=" ">
              <img className="w-full h-full object-cover" src="/images/snaplogo.png" alt=""/>
          </Link>
          
      </div>
  
      <div ref={searchbar}  className="col-span-8  md:col-span-7  items-center">
        <div className="searchwala relative ">
        <PlaceholdersAndVanishInputDemo/>
      </div>
      </div>

      <div className="hidden md:col-span-3 md:flex justify-around gap-x-4 w-full md:gap-0 md:px-0 px-3 text-nowrap"> 
              
      <Link  to={`/products`} className="">Shop</Link>
      <Link  to={login==='valid'?'/profile':'/login'} className=""> {login==='valid'?'Profile':'Log In' } </Link>
        <a href="https://mazn.onrender.com" target="_blank" >Try Imazine</a>
      </div>
     
  </div>

   ) ;
}

export default Navbar 