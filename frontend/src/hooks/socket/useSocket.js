import { initSocket } from "../../services/socket";
import { useEffect } from "react";
import useRoom from "../room/useRoom";

const useSocket = () => {
  const { isJoined } = useRoom();
  useEffect(() => {
    if (isJoined) return;
    initSocket();
  }, [isJoined]);
};

export default useSocket;
