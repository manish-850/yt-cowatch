import "./videoPlayer.css";
import usePlaybackSync from "@/hooks/youtube/usePlaybackSync";
import useReportStatus from "@/hooks/youtube/useReportStatus";
// import usePlaybackControll from "@/hooks/youtube/usePlaybackControll";
import useVideoLoader from "@/hooks/youtube/useVideoLoader";
import useYoutubePlayer from "@/hooks/youtube/useYoutubePlayer";
// import useRoom from "@/hooks/room/useRoom";

export default function VideoPlayer() {
  // const { isAdmin } = useRoom();
  const iframeId = "yt-player";

  useYoutubePlayer();
  // usePlaybackControll();
  useVideoLoader();
  useReportStatus()
  usePlaybackSync();

  return (
    <div
      className="player-container"
      // style={{ pointerEvents: isAdmin ? "auto" : "none" }}
    >
      <div id={iframeId}></div>
    </div>
  );
}
