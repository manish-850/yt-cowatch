import { updateVideo, socket } from "../services/socket";
import { useEffect } from "react";

const useVideoUpdate = (player, roomData) => {
  useEffect(() => {
    if (!socket || !player) return;
    updateVideo(player, roomData);
  }, [socket, player, roomData?.currentVideoId]);
};

export default useVideoUpdate;
