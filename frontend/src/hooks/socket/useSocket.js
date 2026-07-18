 import { initSocket} from "../../services/socket";
 import { useEffect } from "react";
 const useSocket = (isJoined) => {
    useEffect(() => {
    if (isJoined) return;
    initSocket();
  }, [isJoined]);
 }

 export default useSocket;