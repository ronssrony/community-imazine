import {  useCallback, useEffect, useState,useRef, useMemo } from "react"
import socket from "../../service/socket"
import { io } from "socket.io-client"
import { useNavigate, useParams } from "react-router-dom"
import People from "./People"
import useFetch from "../utils/useFetch"
import { RiMenuLine, RiPhoneFill, RiSendPlane2Fill } from "@remixicon/react"
import baseUrl from "../../baseUrl"
function Message() {
  const [message, setMessage] =  useState('')
  const {receiverId} = useParams(); 
  const {data,ispending , error} = useFetch(`${baseUrl}/api/receiverprofile/${receiverId}`)
  const [senderId , setSenderid] = useState()
  const [messages, setMessages] = useState([])
  const [people, setPeople] = useState([]);
  const [user , setUser] = useState() 

 useEffect(()=>{
  socket.on('notification',(data)=>{
    console.log('notify')
    console.log(data)
  })
 },[socket])

  const handleTargetPeople = useCallback((e)=>{
    if(e.target.getAttribute("name")==="user") setUser(Math.random()); 
 })

 function sentMessage(){
     
  socket.emit('sentMessage',{message , receiverId , senderId:senderId})
  setMessages([...messages,{message,receiverId,senderId}]);  
  var notification = new Audio('/music/tap.mp3')
  notification.play()

  fetch(`${baseUrl}/api/message`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify({
      message,          
      receiverId,       
      senderId          
    })
  })
  .then((res) => {
    if (res.ok) {
       document.querySelector(".messagebox").value = ''; 
      setMessage('')}  

    else throw Error('The message is not sent');
  })
  .catch((err) => {
    console.log(err.message);  
  });
  

}

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

  useEffect(()=>
      {
        fetch(`${baseUrl}/api/fetchuserid`,{
          credentials:'include'
        }).then((res)=>{
          if(res.ok) return res.json()
              else {
          throw Error("something went wrong in mymessage useeffect")}
        }).then((data)=>{         
          setSenderid(data.message)
          socket.emit('join_room',{receiverId , senderId:data.message})
          return data.message
        }).then((senderId)=>{
          fetch(`${baseUrl}/api/receivemessage`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
              message,          
              receiverId,       
              senderId          
            })
          })
          .then((res) => {
            if (res.ok) return res.json();  
            else throw Error('The message is not sent');
          })
          .then((messages) => {
              
            setMessages(messages.message);  
              
          })
          .catch((err) => {
            console.log(err.message);  
          });
        })
      },[user])

   useEffect(()=>{
   
      socket.on('receiveMessage',(data)=>{
        setMessages((prevMessages) => [...prevMessages, data]);
        var notification = new Audio('/music/livechat.mp3')
      notification.play()
        
       })
  },[socket])

  useEffect(()=>{
   
   const messagecart = document.querySelectorAll('.messagecart'); 
   const lastmessage =  messagecart[messagecart.length - 1] ;
   
   setTimeout(() => {
    
     if(lastmessage){
      lastmessage.scrollIntoView({behavior:"smooth"}); 
     }
   }, 100);
  
  },[messages])
  
  const handleCall = useCallback( async ()=>{
      window.open( `/videocall/${senderId}/${receiverId}` , 'Popup Windwow', 'width=1200,height=600')

  })

  return (

    <div className="grid relative grid-cols-7 ">
        <div className="col-span-7 md:col-span-5 mr-6 ">
          {ispending && <div className="w-full flex justify-between items-center max-md:px-2 ">
           <div className="flex items-center gap-2">
           <img className="w-16 h-16 rounded-full object-cover bg-slate-300" src='' alt="" />
           <h1 className="w-20 h-5 rounded-md bg-slate-300"></h1>
           </div>
           <div>
            <button> <RiMenuLine/> </button>
           </div>
          </div>}


          {data &&  <div className="w-full flex justify-between shadow-sm  items-center max-md:px-0  ">
           <div className="flex items-center gap-2">
           <img className="w-16 h-16 rounded-full object-cover" src={ `${baseUrl}/images/uploads/${data.user.photo}`} alt=""/>
           <h1>{data.user.name || data.user.email}</h1>
           </div>
           <div className="flex gap-4 items-center">
            <button ><RiPhoneFill onClick={handleCall}/> </button>
            <button> <RiMenuLine/> </button>
           </div>
          </div>}
          
           <div className="flex flex-col items-center">
           <div className="scrollbar h-80 overflow-y-scroll  w-full ">
          {(messages.length>1) &&  messages.map((mesg , ind)=>
             <div key={mesg._id || ind} className="messagecart self-end px-10 max-md:px-2 p-2  relative  ">
             <div className=" ">
              {mesg.senderId===senderId ? <div className="sender w-full flex justify-end"> <h1 className="break-words p-2 rounded-tl-xl rounded-br-xl  bg-green-300">{mesg.message} </h1></div>:<div className="receiver flex justify-start w-full md:w-1/2 text-wrap">   <h1 className="bg-green-300 p-2 rounded-tl-xl rounded-br-xl   break-words" >{mesg.message}</h1></div>}             
            </div> 
              </div>
          
          )} </div>
        

            <form onSubmit={(e)=>{e.preventDefault() ;sentMessage()}} action="" className="w-full flex justify-center gap-5 max-md:mt-5 ">
            <input type="text" size={32} className="messagebox bg-slate-200 outline-none  py-4 max-sm:w-5/6 max-sm:px-5 w-4/6 px-10  rounded-xl " onChange={(e)=>setMessage(e.target.value)}/>
            
           {window.innerWidth>768? <button type="submit"  className="py-4 px-10 bg-red-300  rounded-full  ">Send</button> :<button type="submit"  className="py-4  px-2  rounded-full  "> <RiSendPlane2Fill color="crimson"  /> </button>}
            </form>
           </div>   
        </div>

        <div className=" hidden lg:block col-span-2 pt-4  ">
             <h1 className="w-full text-lg mb-1" >Chatlist</h1>
             <div className="border border-slate-400 "></div>
          <div onClick={handleTargetPeople} className="targetPeople w-full  relative">
          {(people.length>0) && people.map((chatpeople ,ind)=>
           <div className="mt-5" key={ind}>
           <People data={chatpeople} chatlist ={people} width={`w-1/2`} />
          </div>
            ) }
          </div>
        </div>
       
    </div>
  )
}

export default Message