import { getSocket } from "@/services/socket";
import { useEffect } from "react";
import useRoom from "./useRoom";
import { useParams } from "react-router-dom";
const useUpdateRoom = (setIsLoading, clientId) => {
  const {
    roomDataRef,
    setUsername,
    setRoomId,
    setIsAdmin,
    setIsJoined,
    setVideoId,
  } = useRoom();
  const { roomId } = useParams();
  useEffect(() => {
    const handleRoomUpdate = (data) => {
      const currentUser = data.users.find((user) => user.clientId === clientId);
      if (currentUser) {
        console.log("Room data : ", data,data.isPlaying, data.currentTime, data.id);
        roomDataRef.current = data;
        setIsAdmin(currentUser?.isAdmin);
        setUsername(currentUser?.username);
        setIsLoading(false);
        setIsJoined(true);
        setRoomId(data?.id);
        setVideoId(data?.currentVideoId);
      }
    };
    const s = getSocket();
    s.on("room-update", handleRoomUpdate);
    return () => {
      s.off("room-update", handleRoomUpdate);
    };
  }, [roomId]);
};

export default useUpdateRoom;
