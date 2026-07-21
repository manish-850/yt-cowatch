import usePlayer from "@/hooks/player/usePlayer";
import useRoom from "@/hooks/room/useRoom";
import { useRef } from "react";

export const syncToTargetTime = () => {
  const { playerRef } = usePlayer();
  const { roomDataRef } = useRoom();
  // const hasSyncedRef = useRef(false);
  // if (hasSyncedRef.current) return;
  const player = playerRef.current;
  const roomData = roomDataRef.current;
  if (
    !player ||
    !roomData ||
    typeof player.getCurrentTime !== "function"
  )
    return;

  let targetTime = roomData.currentTime;
  if (roomData.isPlaying && roomData.serverTime) {
    targetTime += (Date.now() - roomData.serverTime) / 1000;
  }

  const currentVideoTime = player.getCurrentTime();
  if (Math.abs(currentVideoTime - targetTime) > 1) { 
    player.seekTo(targetTime, true);
  }

  // if (isFromPlayingState || !roomData.isPlaying) {
  //   hasSyncedRef.current = true;
  // }
};
