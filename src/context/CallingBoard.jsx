import { createContext , useContext , useEffect ,useState ,useCallback } from "react";
import baseUrl from "../baseUrl";
import socket from "../service/socket";
var Tune = new Audio('/music/OnePlus.mp3')
const callingContext = createContext(null); 

export const UseCallingBoard = ()=>{
    const callingcont = useContext(callingContext) ; 
    return callingcont ;
}

export const CallingBoardProvider = ({children})=>{
    const [incomingCall, setIncomingCall] = useState(null);
    const [senderId , setSenderid] = useState()
    const [receiverId , setreceiverId] = useState()
    
    const stopTune = () => {
      console.log('Stoping The RingTone')
      Tune.pause();
      Tune.currentTime = 0; 
    };
    
     useEffect(()=>{
      fetch(`${baseUrl}/api/fetchuserid`,{
        credentials:'include'
      }).then((res)=>{
        if(res.ok) return res.json()
            else {
        throw Error("something went wrong in mymessage useeffect")}
      }).then((data)=>{         
        setSenderid(data.message)})
    })
    
    
    useEffect(() => {
      const handleIncomingCall = (data) => {
        setreceiverId(data.senderId);
        if(data.senderId===data.receiverId) return; 
        if (data.receiverId === senderId) {
          try {
            fetch(`${baseUrl}/api/chatpeople/${data.senderId}`)
              .then((res) => res.ok && res.json())
              .then((data) => {
                setIncomingCall(data);
                Tune.play();
              });
          } catch (error) {
            console.log('Something went wrong to get CallerInformation');
          }
        }
      };
    
      socket.on('CallingFrom', handleIncomingCall);
      return () => {
        socket.off('CallingFrom', handleIncomingCall); 
      };
    }, [socket, senderId]);
    
    const handleReceivercall = useCallback(async()=>{
      stopTune()
      window.open(`/reicevecalll/${senderId}/${receiverId}`  ,'Popup Windwow', 'width=1200,height=600')
      setIncomingCall(false)
     
    })
    
    const handleRejectCall = useCallback(()=>{
    stopTune(); 
    setIncomingCall(false) ;
    socket.emit('CallRejected', {senderId,receiverId})
    })
    
    return (
        <callingContext.Provider value={null}>
            {incomingCall&& <div className={` absolute z-50 drop-shadow-md  flex flex-col gap-3 rounded bg-opacity-80 items-center justify-center left-[20%]  sm:top-[30%] sm:left-[40%]  w-72 h-40 bg-slate-300`}>
            <div className="flex justify-around w-full items-center">
            <img className="w-12 h-12 object-cover rounded-3xl" src={`${baseUrl}/images/uploads/${incomingCall.photo}`} alt="" />
            <h1 className="w-24 truncate" >{incomingCall.name?incomingCall.name:incomingCall.email}</h1>
            </div>
            <h1 className="text-lg tracking-wider font-medium">Calling.....</h1>
            <div className="flex justify-around w-full">
              <button onClick={handleRejectCall} > <img className="w-[42px]" src="/images/rejectcall.png" alt="" />  </button>
              <button onClick={handleReceivercall} ><img className="w-[50px]" src="/images/accept.png" alt="" /> </button>
            </div>
        </div> }
            {children}
        </callingContext.Provider>
    )
}