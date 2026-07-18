import { socket } from "@/services/socket";
import { useEffect } from "react";
import usePlayer from "../player/usePlayer";

const usePlaybackSocket = () => {
  const { playerRef } = usePlayer()
  useEffect(() => {
    if (!socket) return;

    const handleSync = ({ isPlaying, currentTime }) => {
      console.log("handle sync fired")
      const player = playerRef.current;
      if (!player || typeof player.getPlayerState !== "function") return;

      const playerState = player.getPlayerState();
      const currentVideoTime = player.getCurrentTime();

      if (!isPlaying || Math.abs(currentVideoTime - currentTime) > 1) {
        player.seekTo(currentTime, true);
      }

      if (isPlaying && playerState !== 1) {
        player.playVideo();
      } else if (!isPlaying && playerState === 1) {
        player.pauseVideo();
      }
    };

    socket.on("playback-sync", handleSync);
    return () => {
      if(socket) socket.off("playback-sync", handleSync);
    };
  }, [socket]);
}

export default usePlaybackSocket