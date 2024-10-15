

import { RiCalendarEventLine, RiChat4Line, RiCreativeCommonsByLine, RiHandbagLine, RiHome3Line,  RiLogoutBoxLine, RiNotificationBadgeLine, RiUserSettingsLine, RiVirusLine } from "@remixicon/react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { io } from "socket.io-client"
const socket = io('http://localhost:3000')
function Sidebar() {
    const history  =useNavigate()
    function handlelogout(){
        fetch('http://localhost:3000/api/logout',{
         credentials:'include'
        }).then((res)=>{
          if(res.ok) return res.json()
           else {
          throw Error('Something Went Wrong')
         }
        }).then((data)=>{
           console.log(data.status._id)
         socket.emit('offline_user', data.status._id)
           history('/login')
        })
    }
  return (
    <div className="w-1/6 py-10 max-lg:translate-y-32  border-black max-lg:hidden font-[joan]">

      <div className="sidebaroptions w-48 left-7  shadow-md  fixed top-36 bg-opacity-10 rounded-lg py-10 pl-2 ">
      

      <div className="">
      <Link to={'/'}><button className="w-full text-lg   active:bg-stone-400   transition-colors  hover:bg-stone-100  mb-2 "> <div className="flex px-2">
         <div className="w-1/4 "> <RiHome3Line size={24} color="" className="opacity-60" />  </div> <div className="3/4"> <h1>Feed</h1> </div>
            </div> </button></Link>  

         <Link to={'/mymessages'}><button className="w-full text-lg   active:bg-stone-400   transition-colors  hover:bg-stone-100  mb-2 "> <div className="flex px-2">
         <div className="w-1/4 "> <RiChat4Line size={24} color="" className="opacity-60" />  </div> <div className="3/4"> <h1>Messages</h1> </div>
            </div> </button></Link>   

           <Link to={'/profile'} > <button className="w-full text-lg   active:bg-stone-400   transition-colors  hover:bg-stone-100  mb-8 "> <div className="flex px-2">
         <div className="w-1/4 "> <RiNotificationBadgeLine size={24} color="" className="opacity-60" />  </div> <div className="3/4"> <h1>Reviews</h1> </div>
            </div> </button></Link>


            <button className="w-full text-lg   active:bg-stone-400   transition-colors  hover:bg-stone-100  mb-2 "> <div className="flex px-2">
         <div className="w-1/4 "> <RiCalendarEventLine size={24} color="" className="opacity-60" />  </div> <div className="3/4"> <h1>Events</h1> </div>
            </div> </button>

            <button className="w-full text-lg   active:bg-stone-400   transition-colors  hover:bg-stone-100  mb-2 "> <div className="flex px-2">
         <div className="w-1/4 "> <RiHandbagLine size={24} color="" className="opacity-60" />  </div> <div className="3/4"> <h1>New Arrival</h1> </div>
            </div> </button>

         <button className="w-full text-lg   active:bg-stone-400 transition-colors  hover:bg-stone-100  mb-20 "> <div className="flex px-2">
         <div className="w-1/4 "> <RiVirusLine size={24} color="" className="opacity-60" />  </div> <div className="3/4"> <h1>Trending</h1> </div>
            </div> </button>


            <button className="w-full text-lg   active:bg-stone-400   transition-colors  hover:bg-stone-100  mb-2 "> <div className="flex px-2">
         <div className="w-1/4 "> <RiCreativeCommonsByLine size={24} color="" className="opacity-60" />  </div> <div className="3/4"> <h1>Top Creators</h1> </div>
            </div> </button>

         <Link to={`/accountsetting`}>   <button className="w-full text-lg   active:bg-stone-400   transition-colors  hover:bg-stone-100  mb-2 "> <div className="flex px-2">
         <div className="w-1/4 "> <RiUserSettingsLine size={24} color="" className="opacity-60 " />  </div> <div className="3/4"> <h1 className="text-nowrap">Account Setting</h1> </div>
            </div> </button></Link>

            <button onClick={handlelogout} className="w-full text-lg   active:bg-stone-400   transition-colors  hover:bg-stone-100  mb-2 "> <div className="flex px-2">
         <div className="w-1/4 "> <RiLogoutBoxLine size={24} color="" className="opacity-60" />  </div> <div className="3/4"> <h1>Logout</h1> </div>
            </div> </button>

         
        </div>
      </div>
      </div>
  )
}

export default Sidebar