import usePlayer from "@/hooks/player/usePlayer";
import useRoom from "@/hooks/room/useRoom";
import { useRef } from "react";

export const syncToTargetTime = (isFromPlayingState = false) => {
  const { playerRef } = usePlayer();
  const { roomDataRef } = useRoom();
  const hasSyncedRef = useRef(false);
  if (hasSyncedRef.current) return;
  const player = playerRef.current;
  const currentRoomData = roomDataRef.current;
  if (
    !player ||
    !currentRoomData ||
    typeof player.getCurrentTime !== "function"
  )
    return;

  let targetTime = currentRoomData.currentTime;
  if (currentRoomData.isPlaying && currentRoomData.receivedAt) {
    targetTime += (Date.now() - currentRoomData.receivedAt) / 1000;
  }

  const currentVideoTime = player.getCurrentTime();
  if (Math.abs(currentVideoTime - targetTime) > 1) {
    // time changed to 1 sec from 2 sec
    player.seekTo(targetTime, true);
  }

  if (isFromPlayingState || !currentRoomData.isPlaying) {
    hasSyncedRef.current = true;
  }
};
