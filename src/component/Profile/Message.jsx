import {  useCallback, useEffect, useState } from "react"
import Sidebar from "../partial/Sidebar"
import { io } from "socket.io-client"
import { useNavigate, useParams } from "react-router-dom"
import useFetch from "../utils/useFetch"
import { RiMenuLine, RiPhoneFill, RiSendPlane2Fill } from "@remixicon/react"



const socket = io('https://imazineblue.onrender.com')
function Message() {
 
  const [message, setMessage] =  useState('')
  const {receiverId} = useParams(); 
  const {data,ispending , error} = useFetch(`https://imazineblue.onrender.com/api/receiverprofile/${receiverId}`)
  const [senderId , setSenderid] = useState()
  const [messages, setMessages] = useState([])

    useEffect(()=>
      {
        fetch('https://imazineblue.onrender.com/api/fetchuserid',{
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
          fetch('https://imazineblue.onrender.com/api/receivemessage', {
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
      },[])


    

    function sentMessage(){
     
      socket.emit('sentMessage',{message , receiverId , senderId:senderId})
      setMessages([...messages,{message,receiverId,senderId}]);  
      var notification = new Audio('/music/tap.mp3')
      notification.play()
    
      fetch('https://imazineblue.onrender.com/api/message', {
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
      window.open( `/videocall/${senderId}/${receiverId}` , 'Popup Windwow' ,"width-800 , height-600 ")
  })

  return (

    <div className="">
        <Sidebar/>
        <div className="max-lg:w-full max-md:p-55  w-4/5 max-lg:3/5  px-10    max-w-4/5  relative flex flex-col  justify-between  max-lg:translate-y-60 lg:translate-y-20   lg:translate-x-60">
          {ispending && <div className="w-full flex justify-between items-center max-md:px-2 px-36">
           <div className="flex items-center gap-2">
           <img className="w-16 h-16 rounded-full object-cover bg-slate-300" src='' alt="" />
           <h1 className="w-20 h-5 rounded-md bg-slate-300"></h1>
           </div>
           <div>
            <button> <RiMenuLine/> </button>
           </div>
          </div>}


          {data &&  <div className="w-full flex justify-between  items-center max-md:px-0  px-36">
           <div className="flex items-center gap-2">
           <img className="w-16 h-16 rounded-full object-cover" src={ `https://imazineblue.onrender.com/images/uploads/${data.user.photo}`} alt=""/>
           <h1>{data.user.name || data.user.email}</h1>
           </div>
           <div>
            <button ><RiPhoneFill onClick={handleCall}/> </button>
            <button> <RiMenuLine/> </button>
           </div>
          </div>}
          
           <div className="flex flex-col items-center">
           <div className="scrollbar max-lg:h-80 lg:h-96 max-h-96 overflow-y-scroll  w-full  lg:w-5/6">
          {(messages.length>1) &&  messages.map((mesg , ind)=>
             <div key={mesg._id || ind} className="messagecart self-end px-10 max-md:px-2 p-2  relative  ">
             <div className=" ">
              {mesg.senderId===senderId ? <div className="sender w-full flex justify-end"> <h1 className="break-words p-2 rounded-tl-xl rounded-br-xl  bg-green-300">{mesg.message} </h1></div>:<div className="receiver flex justify-start w-full md:w-1/2 text-wrap">   <h1 className="bg-green-300 p-2 rounded-tl-xl rounded-br-xl   break-words" >{mesg.message}</h1></div>}             
            </div> 
              </div>
          
          )} </div>
        

            <form onSubmit={(e)=>{e.preventDefault() ;sentMessage()}} action="" className="w-full flex justify-center gap-5 max-md:mt-5 ">
            <input type="text" size={32} className="messagebox bg-slate-200 outline-none  py-4 max-sm:w-5/6 max-sm:px-5 w-4/6 px-10  rounded-xl " onChange={(e)=>setMessage(e.target.value)}/>
            
           {window.innerWidth>768? <button type="submit"  className="py-4 bg-red-300 px-10  rounded-full  ">Send</button> :<button type="submit"  className="py-4  px-2  rounded-full  "> <RiSendPlane2Fill color="crimson"  /> </button>}
            </form>
           </div>   
        </div>
       
    </div>
  )
}

export default Message
