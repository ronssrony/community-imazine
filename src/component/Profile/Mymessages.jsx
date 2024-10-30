import { useEffect, useMemo, useState } from "react"
import { io } from "socket.io-client"
import People from "./People"
import MymessageShimmer from "../Shimmers/MymessageShimmer"
import baseUrl from "../../baseUrl";


function Message() {

    const [people, setPeople] = useState([]); 
   useEffect(()=>{
          fetch(`${baseUrl}/api/mymessages`,{
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

    <div className="grid h-full">

        <div className=" ">
          
           {people.length===0 && <> <MymessageShimmer/>  <MymessageShimmer/>  <MymessageShimmer/> </>}
           {(people.length>0) && people.map((chatpeople ,ind)=>
           <div className="mt-5" key={ind}>
           <People data={chatpeople} chatlist ={people} width={`w-1/6`} />
          </div>
            ) }
        </div>
    </div>
  )
}

export default Message