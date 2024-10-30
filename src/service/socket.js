import { io } from "socket.io-client";
import baseUrl from "../baseUrl";

const socket =io(`${baseUrl}`)

export default socket