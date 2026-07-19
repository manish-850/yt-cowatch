import { getSocket } from "@/services/socket";
import { useEffect } from "react";
import useRoom from "./useRoom";

const useJoinRoom = (clientId) => {
  const { roomId } = useRoom();
  useEffect(() => {
    const s = getSocket();
    s.emit("join-room", {
      roomId,
      username: localStorage.getItem("username"),
      clientId,
    });
  },[roomId]);
};

export default useJoinRoom;
