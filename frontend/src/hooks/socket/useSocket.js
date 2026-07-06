 import { initSocket} from "../../services/socket";
 import { useEffect } from "react";
 const useSocket = ( setRoomData, setMessages, roomId, username, isJoined,setIsLoading, clientId) => {
    useEffect(() => {
    if (!isJoined) return;
    initSocket(setRoomData, setMessages, roomId, username,setIsLoading, clientId);
  }, [isJoined]);
 }

 export default useSocket;