import { useEffect } from "react";
import { socket } from "@/services/socket";
import useRoom from "../room/useRoom";

const usePlaybackControll = () => {
  const { playbackControlRef } = useRoom();

  const handlePlaybackControl = (isPlaying, currentTime) => {
    if (socket) {
      console.log("handlePlaybackControl : ", isPlaying, currentTime);
      socket.emit("playback-control", { isPlaying, currentTime });
    }
  };

  useEffect(() => {
    playbackControlRef.current = handlePlaybackControl;
  }, []);

};

export default usePlaybackControll;
