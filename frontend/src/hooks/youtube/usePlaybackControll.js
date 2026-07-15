import { useEffect, useRef } from "react";
import { socket } from "@/services/socket";

const usePlaybackControll = () => {
  const handlePlaybackControlRef = useRef(null);

  const handlePlaybackControl = (isPlaying, currentTime) => {
    if (socket) {
      console.log("handlePlaybackControl : ", isPlaying, currentTime);
      socket.emit("playback-control", { isPlaying, currentTime });
    }
  };

  useEffect(() => {
    handlePlaybackControlRef.current = handlePlaybackControl;
  }, [handlePlaybackControl]);

  return { handlePlaybackControlRef }
};

export default usePlaybackControll;
