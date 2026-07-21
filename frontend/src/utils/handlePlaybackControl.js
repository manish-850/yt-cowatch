import { getSocket } from "@/services/socket";

export const handlePlaybackControl = (isPlaying, currentTime) => {
  const s = getSocket();
  s.emit("playback-control", { isPlaying, currentTime, clientTime : Date.now() });
};
