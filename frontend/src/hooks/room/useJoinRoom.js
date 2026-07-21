import { getSocket } from "@/services/socket";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const useJoinRoom = (clientId) => {
  const { roomId } = useParams();
  useEffect(() => {
    const s = getSocket();
    s.emit("join-room", {
      roomId,
      username: localStorage.getItem("username"),
      clientId,
      clientTime : Date.now()
    });
  },[roomId]);
};

export default useJoinRoom;
