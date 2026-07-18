import { useEffect } from "react";
import useRoom from "../room/useRoom";
import usePlayer from "../player/usePlayer";

const useVideoLoader = () => {
  const { roomDataRef, videoId } = useRoom();
  const { playerRef } = usePlayer();
  useEffect(() => {
    console.log("videoId changed:", videoId);

    if (!roomDataRef.current) return;

    // hasSyncedRef.current = false;
    const player = playerRef.current;

    console.log("player:", player);

    if (player && typeof player.loadVideoById === "function") {
      console.log("Loading video:", videoId);
      player.loadVideoById({ videoId });
    }
  }, [videoId, playerRef.current]);
};

export default useVideoLoader;
