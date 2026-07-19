import { useEffect } from "react";
import useRoom from "../room/useRoom";
import usePlayer from "../player/usePlayer";

const useVideoLoader = () => {
  const { roomDataRef, videoId } = useRoom();
  const { playerRef } = usePlayer();
  useEffect(() => {
    // console.log("videoId changed:", videoId);
    if (!roomDataRef.current) return;
    // hasSyncedRef.current = false;
    // console.log("player:", playerRef.current);
    if (playerRef.current && typeof playerRef.current.loadVideoById === "function") {
      console.log("Loading video:", videoId);
      // console.log(playerRef.current);
      // console.log(typeof playerRef.current?.loadVideoById);
      playerRef.current.loadVideoById({ videoId });
    }
  }, [videoId]);
};

export default useVideoLoader;
