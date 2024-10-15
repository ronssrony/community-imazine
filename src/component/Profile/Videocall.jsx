import { useParams } from "react-router-dom"
import ReactPlayer from "react-player"
import { useEffect ,useState, useRef } from "react"
import peer from "../../service/peer"
import { io } from "socket.io-client"
const socket = io('http://localhost:3000')
function Videocall() {
  const [mystream , setMystream] = useState(null)
  const {senderId , receiverId} = useParams()
  const [remotestream ,setRemoteStream] = useState(null)
  const videoRef = useRef();

  useEffect( ()=>{
     const handlestream = async ()=>{
      const stream = await navigator.mediaDevices.getUserMedia({
        audio:true , 
        video:true 
      })
    setMystream(stream)
     }
     handlestream()
  },[])

  const handleSendStream = ()=>{
    for(const track of mystream.getTracks()){
      console.log('indexing tracks')
        peer.peer.addTrack(track,mystream)
      }
  }

  useEffect(()=>{
    if(mystream){
        console.log('tracking')
          handleSendStream();
      }
  },[mystream])

  useEffect(()=>{
   const createOffer = async()=>{
    const offer = await peer.getOffer(); 
    socket.emit("calling" , {senderId ,receiverId ,offer})
   }  
   createOffer()
  },[socket])

  
  useEffect(()=>{
    console.log('track event is run')
    peer.peer.addEventListener('track', async ev=>{
        console.log('got the tracks')
        const remoteStream = ev.streams
        console.log("remoteStream" , remoteStream)
        setRemoteStream(remoteStream[0])
    })
  },[])
 
  useEffect(()=>{
      peer.peer.addEventListener('negotiationneeded',async ()=>{
        const offer = await peer.getOffer()
        socket.emit('peer:nego:needed',{offer,senderId})
      })
  }, [socket])
   

   
  useEffect(()=>{
    socket.on('call:accepted',async (data)=>{
     console.log(data.ans,'accepted')
    await peer.setRemoteAnswer(data.ans)
    
    })
    socket.on('peer:nego:final', async (data)=>{
        console.log("negotiatioin done",data)
      await peer.setRemoteAnswer(data.ans)
    })
  }, [socket])

  return (
        
    <div className="profileside w-4/6  items-center gap-5    max-lg:translate-y-48 lg:translate-y-36   lg:translate-x-60 ">

      <div className="bg-gray-700 w-3/4 h-96 rounded-xl relative ">
      {console.log("remoteStrem", remotestream)}    
      {console.log("myStream", mystream)}                  
      {remotestream&& <button onClick={handleSendStream} className="bg-green-400 p-2 rounded text-white">Send Stream</button> }                           
     {remotestream &&  <div> <h1>Remote Stream</h1> <ReactPlayer height="100%" width="100%"  url={remotestream} playing    /></div> }
      <div className="videosection absolute right-0 top-0 rounded-xl overflow-hidden  h-36  w-48 z-50">
          <ReactPlayer height="100%" width="100%"  url={mystream} playing muted   />
        </div>
      </div>
     
    </div>
  )
}

export default Videocall