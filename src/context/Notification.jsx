import { useContext, createContext , useState, useEffect } from "react";
import baseUrl from "../baseUrl";

const NotificationContext = createContext(null)

export const  Usenotification = ()=>{
      return useContext(NotificationContext)
}

export const NotificationProvider = ({children})=>{
          const [notify , setNotify] = useState(null) ;
          const [myId , setmyId] = useState(JSON.parse(localStorage.getItem('myId')))
        
          
          useEffect(() => {
        
              fetch(`${baseUrl}/api/myNotification/${myId}`)
                .then((res) => {
                  if (res.ok) {
                    return res.json();
                  }
                  throw new Error("Failed to fetch");
                })
                .then((data) => setNotify(data))
                .catch((err) => {
                  setNotify(null);
                  console.error("Error fetching notifications:", err);
                });
            
          }, [myId]);
          return(
            <NotificationContext.Provider value={{notify , setNotify , setmyId , myId}}>
             {children}
            </NotificationContext.Provider>
          )
}
