import { useEffect, useState } from "react"
import Sidebar from "../partial/Sidebar"
import { io } from "socket.io-client"
import People from "./People"
import MymessageShimmer from "../Shimmers/MymessageShimmer"
import useFetch from "../utils/useFetch"
import { RiCloseCircleFill, RiPhoneFill } from "@remixicon/react"
function Message() {
  const {data , ispending , error} = useFetch('http://localhost:3000/api/fetchuserid')
    const [people, setPeople] = useState([]); 
  


   useEffect(()=>{
          fetch('http://localhost:3000/api/mymessages',{
            credentials:'include'
          }).then((res)=>{
            if(res.ok) return res.json()
                else {
            throw Error("something went wrong in mymessage useeffect")}
          }).then((data)=>{         
              setPeople(data.chatlist)
          })
   }, [])

   

  return (

    <div className="">
        <Sidebar/>
       
        <div className=" px-28  w-5/6 max-sm:translate-y-60 lg:translate-y-20 max-sm:translate-x-8  lg:translate-x-60  ">
          
           {people.length===0 && <> <MymessageShimmer/>  <MymessageShimmer/>  <MymessageShimmer/> </>}
           {(people.length>0) && people.map((chatpeople ,ind)=>
           <div className="mt-5" key={ind}>
           <People data={chatpeople} />
          </div>
            ) }
        </div>
    </div>
  )
}

export default Message