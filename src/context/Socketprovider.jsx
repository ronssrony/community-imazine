// import { io } from "socket.io-client";
// import { createContext, useContext, useMemo } from "react";

// export const Socketcontext = createContext(null);

// export const useSocket = () => {
//   const socket = useContext(Socketcontext);
//   return socket;
// };

// export const SocketProvider = (props) => {
//   const socket = useMemo(() => io("http://localhost:3000"), []);

//   return (
//     <Socketcontext.Provider value={{ socket }}>
//       {props.children}
//     </Socketcontext.Provider>
//   );
// };
