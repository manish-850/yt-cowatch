import { useEffect } from "react";
import useRoom from "../room/useRoom";


const useVideoLoader = (playerRef) => {
    const { roomData } = useRoom();
    const videoId = roomData?.currentVideoId || "6KcV1C1Ui5s";
  useEffect(() => {
  console.log("videoId changed:", videoId);

  if (!roomData) return;

  // hasSyncedRef.current = false;
  const player = playerRef.current;

  console.log("player:", player);

  if (player && typeof player.loadVideoById === "function") {
    console.log("Loading video:", videoId);
    player.loadVideoById({ videoId });
  }
}, [videoId,playerRef.current]);
}

export default useVideoLoader