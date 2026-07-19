import { getSocket } from "@/services/socket";
import { useEffect } from "react";
import useRoom from "./useRoom";
const useUpdateRoom = (setIsLoading, clientId) => {
  const {
    roomDataRef,
    setUsername,
    setRoomId,
    setIsAdmin,
    setIsJoined,
    setVideoId,
  } = useRoom();
  useEffect(() => {
    const handleRoomUpdate = (data) => {
      const currentUser = data.users.find((user) => user.clientId === clientId);
      if (currentUser) {
        // console.log("Room data : ", data);
        roomDataRef.current = data;
        setIsAdmin(currentUser?.isAdmin);
        setUsername(currentUser?.username);
        setIsLoading(false);
        setIsJoined(true);
        setRoomId(data?.id);
        console.log("Room video:", data.currentVideoId);
        setVideoId(data?.currentVideoId);
      }
    };
    const s = getSocket();
    s.on("room-update", handleRoomUpdate);
    return () => {
      s.off("room-update", handleRoomUpdate);
    };
  });
};

export default useUpdateRoom;
