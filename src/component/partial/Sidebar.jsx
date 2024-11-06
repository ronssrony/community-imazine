

import { RiCalendarEventLine, RiChat4Line, RiCreativeCommonsByLine, RiHandbagLine, RiHome3Line,  RiLogoutBoxLine, RiNotificationBadgeLine, RiUserSettingsLine, RiVirusLine } from "@remixicon/react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { io } from "socket.io-client"
import { userContext } from "../../context/UserProvider"
import { useContext } from "react"
import { Usenotification } from "../../context/Notification"
import baseUrl from "../../baseUrl"
import socket from "../../service/socket"
import { UseLoginContext } from "../../context/LoginProvider"

function Sidebar() {
   const {setUser} = useContext(userContext)
    const history  =useNavigate()
    const {notify, setmyId , setNotify , myId} = Usenotification()

    const {handleDialog} = UseLoginContext()
    function handlelogout(){
       localStorage.removeItem('myId')
       setmyId(JSON.parse(localStorage.getItem('myId')));
        fetch(`${baseUrl}/api/logout`,{
         credentials:'include'
        }).then((res)=>{
          if(res.ok) return res.json()
           else {
          throw Error('Something Went Wrong')
         }
        }).then((data)=>{
           setUser('logout')
         socket.emit('offline_user', data.status._id)
           history('/login')
        })
    }
   
    const handleMessage = ()=>{
      if(!myId){
         handleDialog(); 
         return ;
      }; 
      if(notify)
      {
         fetch(`${baseUrl}/api/MessageNotify/${myId}`)
         .then(res=>{
            if(res.ok) setNotify(null) 
               else throw new Error("Server is not responding")
         }).catch((err)=>{
            console.log(err.message)
         })
      }
      history('/mymessages')
    }

   const handleAccountsetting = ()=>{
      if(!myId){
         handleDialog(); 
         return ;
      }; 
      history("/accountsetting")
   }
  return (
   <div className=" pl-8 border-black h-full relative  ">
   <div className="sidebaroptions  h-full  rounded-lg  ">
   <div className="flex flex-col h-full  justify-around  w-40 shadow  ">
   
   <div className="flex flex-col gap-4">
   <Link to={'/'}><button className="w-full text-[17px]  active:opacity-60   transition-colors  m  "> <div className="flex items-center px-2 ">
      <div className="w-1/4 "> <RiHome3Line size={24} color="" className="opacity-60" />  </div> <div className=""> <h1>Feed</h1> </div>
         </div> </button></Link>  

      <button onClick={handleMessage} className="w-full text-[17px]   active:opacity-60   transition-colors    "> <div className="flex px-2 items-center ">
      <div className="w-1/4 "> <RiChat4Line size={24} color="" className="opacity-60" />  </div> <div className="3/4 flex items-center "> <h1>Messages</h1> {notify&&<i className="ml-2 text-[10px] bg-red-500 px-1 rounded-xl text-white font-semibold mt-1 ">{notify.notify}</i>}  </div>
         </div> </button>

        <Link to={'#'} > <button className="w-full text-[17px]   active:opacity-60   transition-colors     "> <div className="flex px-2 items-center">
      <div className="w-1/4 "> <RiNotificationBadgeLine size={24} color="" className="opacity-60" />  </div> <div className="3/4"> <h1>Reviews</h1> </div>
         </div> </button></Link>
   </div>


   <div className="flex flex-col gap-4" >
   <button className="w-full text-[17px]    active:opacity-60   transition-colors   "> <div className="flex px-2 items-center">
      <div className="w-1/4 "> <RiCalendarEventLine size={24} color="" className="opacity-60" />  </div> <div className="3/4"> <h1>Events</h1> </div>
         </div> </button>

         <button className="w-full  text-[17px]  active:opacity-60   transition-color   "> <div className="flex px-2 items-center">
      <div className="w-1/4 "> <RiHandbagLine size={24} color="" className="opacity-60" />  </div> <div className="3/4"> <h1>New Arrival </h1> </div>
         </div> </button>

      <button className="w-full text-[17px]    active:opacity-60 transition-colors     "> <div className="flex px-2 items-center">
      <div className="w-1/4 "> <RiVirusLine size={24} color="" className="opacity-60" />  </div> <div className="3/4"> <h1>Trending</h1> </div>
         </div> </button>
   </div>


    <div className="flex flex-col gap-4">
      
     <button onClick={handleAccountsetting} className="w-full  text-[17px]  active:opacity-60   transition-colors  "> <div className="flex px-2  items-center">
      <div className="w-1/4 "> <RiUserSettingsLine size={24} color="" className="opacity-60 " />  </div> <div className="3/4"> <h1 className="text-nowrap">Setting</h1> </div>
         </div> </button>

         <button onClick={handlelogout} className="w-full text-[17px]   active:opacity-60   transition-colors    "> <div className="flex px-2 items-center ">
      <div className="w-1/4 "> <RiLogoutBoxLine size={24} color="" className=" opacity-60 " />  </div> <div className="3/4"> <h1>Logout</h1> </div>
         </div> </button>

    </div>
      
     </div>
   </div>
   </div>
  )
}

export default Sidebar