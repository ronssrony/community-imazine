import { useCallback, useEffect, useMemo, useRef, useState  } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Peer } from "peerjs";
import { RiMicFill , RiVideoOnFill ,RiMicOffFill , RiVideoOffFill  , RiCloseLargeLine } from '@remixicon/react';
import socket from '../../service/socket';


function Receiver() {
  const navigate = useNavigate()
  const [incomingCall, setIncomingCall] = useState(null);
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const {senderId , receiverId} = useParams()
  const [Videostate, setVideo]= useState(true)
  const [Audiostate, setAudio]  = useState(true)
  const [callingstate ,setCallingstate] = useState(false)

  useEffect(() => {
    const peer = new Peer(senderId,{
      host: 'peerserver-m2lw.onrender.com',
      path: '/peerjs/myapp',
      secure: true,
  });
    peer.on('call', (call) => {
      console.log('call is comming')
      setIncomingCall(call);
      const getUserMedia = navigator.mediaDevices.getUserMedia; 
  
      getUserMedia({ video: true })
        .then((mediaStream) => {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play();
          call.answer(mediaStream);
  
          call.on('stream', (remoteStream) => {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          });
        })
        .catch((err) => {
          console.error('Failed to get local stream', err);
        });
    });

    peerInstance.current = peer;

    return () => {
      peer.destroy();
    };
  }, []);

 

 window.addEventListener('beforeunload' , ()=>{  
  handleDisconnected() ;
})

const handleMic = useCallback(()=>{
  if (currentUserVideoRef.current.srcObject) {
    currentUserVideoRef.current.srcObject.getAudioTracks().forEach(track => {
      track.enabled = !track.enabled;
    });
    setAudio(!Audiostate) ;
  }
})
const handleVideo = useCallback(()=>{
     if(currentUserVideoRef.current.srcObject)
     {
        currentUserVideoRef.current.srcObject.getVideoTracks().forEach(track =>{
          track.enabled = !track.enabled ;
        }); 

        setVideo(!Videostate) ;

     }

})

const handleDisconnected = useCallback(()=>{
   if(currentUserVideoRef.current.srcObject)
   {
       currentUserVideoRef.current.srcObject.getTracks().forEach(track=>
         track.stop() 
       )

       currentUserVideoRef.current.srcObject= null ; 
       remoteVideoRef.current.srcObject = null ;
       socket.emit('CallRejected', {senderId,receiverId})
       window.close()
   }
})
  
 const RejectCall = useCallback(()=>{
      if(currentUserVideoRef.current.srcObject)
      {
         currentUserVideoRef.current.srcObject.getTracks().forEach((track)=>{
                track.stop();
         })
         currentUserVideoRef.current.srcObject = null ;  
         remoteVideoRef.current.srcObject = null ;
      }
      setCallingstate(true) ;
 })

   useEffect(()=>{
     socket.on('CallRejected' ,(data)=>{
         if(data.receiverId===senderId) RejectCall(); 
     })     
   }, [socket])
   const handleCross = useCallback(()=>{
    window.close() ;
})
const handleRedial = useCallback(()=>{
console.log('navigating')
navigate(`/videocall/${senderId}/${receiverId}` ) ;
})

  return (
    <>
   {!callingstate &&  <div className="App flex justify-center items-center w-screen h-screen absolute top-0 left-0 bg-white overflow-hidden ">
    <div className='w-96 relative bg-slate-600 rounded overflow-hidden'>
    <div className='w-40 absolute right-0 rounded-md overflow-hidden'>
     <video ref={currentUserVideoRef} />
   </div>
   <div className='w-96 h-96 '>
     <video className='w-full h-full object-cover' ref={remoteVideoRef} />
   </div>

     <div className='flex gap-5 absolute bottom-5 right-[30%]'>
         <button onClick={handleMic} > {Audiostate?<RiMicFill size={30}  className='text-slate-400' />:<RiMicOffFill size={30}  className='text-slate-400' />} </button>
         <button onClick={handleVideo} >{Videostate? <RiVideoOnFill size={30}  className='text-slate-400' />: <RiVideoOffFill size={30}  className='text-slate-400' />} </button>
         <button onClick={handleDisconnected}><img className='w-9 inline-block cursor-pointer' src="/images/rejectcall.png" alt="" /> </button>
          </div>
    </div>
 </div>}
     {callingstate && <div className="App flex justify-center items-center w-screen h-screen absolute top-0 left-0 bg-white overflow-hidden ">
      <div className='w-48 h-32 relative bg-slate-200 bg-opacity-90 rounded overflow-hidden flex items-center justify-around '>
         <button onClick={handleCross} > <RiCloseLargeLine size={34} className='text-black mb-1' /> <h1>Close</h1> </button>
         <button onClick={handleRedial} className='mb-2' ><img className='w-12 inline-block cursor-pointer' src="/images/accept.png" alt="" />  <h1>Redial</h1> </button>
     </div> 
     </div>
      }
    </>
  );
}

export default Receiver;
