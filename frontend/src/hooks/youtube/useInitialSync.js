import { useEffect, useRef } from "react";
import useRoom from "../room/useRoom";

const useInitialSync = (playerRef, isFromPlayingState = false) => {
  const hasSyncedRef = useRef(false);
  const { roomData } = useRoom();
  const roomDataRef = useRef(roomData);
  useEffect(() => {
    roomDataRef.current = roomData;
  }, [roomData]);
  //   const syncToTargetTime = () => {
  if (hasSyncedRef.current) return;
  const player = playerRef.current;
  const currentRoomData = roomDataRef.current;
  if ( !player || !currentRoomData || typeof player.getCurrentTime !== "function") return;

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
// }

export default useInitialSync;
