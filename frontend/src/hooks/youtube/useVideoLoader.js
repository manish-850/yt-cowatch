import { useEffect } from "react";
import useRoom from "../room/useRoom";
import usePlayer from "../player/usePlayer";

const useVideoLoader = () => {
  const { roomDataRef, videoId } = useRoom();
  const { playerRef } = usePlayer();
  useEffect(() => {
    if (!roomDataRef.current) return;
    // hasSyncedRef.current = false;
    if (playerRef.current && typeof playerRef.current.loadVideoById === "function") {
      console.log("Loading video:", videoId);
      playerRef.current.loadVideoById({ videoId });
    }
  }, [videoId]);
};

export default useVideoLoader;
