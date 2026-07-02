 import { initSocket} from "../services/socket";
 import { useEffect } from "react";
 const useSocket = ( setRoomData, setMessages, roomId, username, isJoined) => {
    useEffect(() => {
    if (!isJoined) return;
    initSocket(setRoomData, setMessages, roomId, username);
  }, [isJoined]);
 }

 export default useSocket;