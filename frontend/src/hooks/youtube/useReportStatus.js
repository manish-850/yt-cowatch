import useRoom from "../room/useRoom";
import usePlayer from "../player/usePlayer";
import { getSocket } from "@/services/socket";

const useReportStatus = () => {
  const { videoId } = useRoom();
  const { playerRef } = usePlayer();
  const s = getSocket();
  if (!s || !s.connected) return;
  const interval = setInterval(() => {
    if (
      playerRef.current &&
      typeof playerRef.current.getCurrentTime === "function" &&
      typeof playerRef.current.getPlayerState === "function"
    ) {
      const state = playerRef.current.getPlayerState();
      s.emit("report-status", {
        videoId,
        isPlaying: state === 1,
        currentTime: playerRef.current?.getCurrentTime(),
        clientTime: Date.now(),
      });
    }
  }, 3000);
  return () => clearInterval(interval);
};

export default useReportStatus;
