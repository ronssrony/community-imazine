import { useParams } from "react-router-dom"
import ReactPlayer from "react-player"
import { useEffect ,useState } from "react"
import peer from "../../service/peer"
import { io } from "socket.io-client"
const socket = io('http://localhost:3000')
function Videocall() {
const [mystream , setMystream] = useState(null)
const [remotestream , setRemotestream] = useState(null)
  
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
      peer.peer.addTrack(track,mystream)
    }
  }

 useEffect(()=>{
     if(mystream){
         console.log('tracking')
         handleSendStream() ;
     }
    },[mystream])
  
    useEffect(()=>{
      socket.on('calling',async(info)=>{
              console.log(info.offer)
              const ans = await peer.getAnswer(info.offer); 
              console.log(ans)
              socket.emit('call:accepted', {senderId:info.senderId, ans})   
      })
     
    },[socket])
  
    useEffect(()=>{
        socket.on('peer:nego:needed',async (data)=>{
        console.log('negotiation on frontend')
        const ans = await peer.getAnswer(data.offer)
        socket.emit('peer:nego:final', {senderId:data.senderId , ans})
     })
  
    }, [socket])
  

    useEffect(()=>{
      peer.peer.addEventListener('track', async ev=>{
             const remoteStream = ev.streams 
             console.log(remoteStream)
             setRemotestream(remoteStream[0])
             console.log('Got receivetrack')
      })
      },[remotestream])
 
       
  return (
        
    <div className=" w-4/6  items-center gap-5    max-lg:translate-y-48 lg:translate-y-36   lg:translate-x-60 ">
        
      <div className="bg-gray-700 w-3/4 h-96 rounded-xl relative ">
       {console.log("remoteStream",remotestream)}  
       {console.log("myStream", mystream)}
       {remotestream&& <button onClick={handleSendStream} className="bg-green-400 p-2 rounded text-white">Send Stream</button> }                  
       {remotestream&&<div> <h1>Remote Stream</h1> <ReactPlayer height="100%" width="100%"  url={remotestream} playing  /></div>}
      <div className="videosection absolute right-0 top-0 rounded-xl overflow-hidden  h-36  w-48 z-50">
          <ReactPlayer height="100%" width="100%"  url={mystream} playing muted   />
        </div>
      </div>
     
    </div>
  )
}

export default Videocall