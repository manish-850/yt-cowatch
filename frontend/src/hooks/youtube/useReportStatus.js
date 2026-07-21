import useRoom from "../room/useRoom";
import usePlayer from "../player/usePlayer";
import { getSocket } from "@/services/socket";

const useReportStatus = () => {
  const { videoId } = useRoom();
  const { playerRef } = usePlayer();
  const s = getSocket();
  const interval = setInterval(() => {
    if (
      typeof playerRef.current.getCurrentTime === "function" &&
      typeof playerRef.current.getPlayerState === "function"
    ) {
      const state = playerRef.current.getPlayerState();
      if (!s || !s.connected) return () => clearInterval(interval);
      s.emit("report-status", {
        videoId,
        isPlaying: state === 1,
        currentTime: playerRef.current.getCurrentTime(),
      });
    }
  }, 3000);
  return () => clearInterval(interval);
};

export default useReportStatus;
