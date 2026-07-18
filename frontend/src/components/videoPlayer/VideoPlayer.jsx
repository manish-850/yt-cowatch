import "./videoPlayer.css";
import usePlaybackSocket from "@/hooks/youtube/usePlaybackSocket";
import usePlaybackControll from "@/hooks/youtube/usePlaybackControll";
import useVideoLoader from "@/hooks/youtube/useVideoLoader";
import useYoutubePlayer from "@/hooks/youtube/useYoutubePlayer";
// import useRoom from "@/hooks/room/useRoom";

export default function VideoPlayer() {
  // const { isAdmin } = useRoom();
  const iframeId = "yt-player";

  const { handlePlaybackControlRef } = usePlaybackControll();
  useYoutubePlayer(handlePlaybackControlRef);
  usePlaybackSocket();
  useVideoLoader();

  return (
    <div
      className="player-container"
      // style={{ pointerEvents: isAdmin ? "auto" : "none" }}
    >
      <div id={iframeId}></div>
    </div>
  );
}
