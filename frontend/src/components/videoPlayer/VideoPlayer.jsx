import "./videoPlayer.css";
import usePlaybackSocket from "@/hooks/youtube/usePlaybackSocket";
// import usePlaybackControll from "@/hooks/youtube/usePlaybackControll";
import useVideoLoader from "@/hooks/youtube/useVideoLoader";
import useYoutubePlayer from "@/hooks/youtube/useYoutubePlayer";
import useVideoUpdate from "@/hooks/youtube/useVideoUpdate";
// import useRoom from "@/hooks/room/useRoom";

export default function VideoPlayer() {
  // const { isAdmin } = useRoom();
  const iframeId = "yt-player";

  useYoutubePlayer();
  // usePlaybackControll();
  usePlaybackSocket();
  useVideoLoader();
  useVideoUpdate();

  return (
    <div
      className="player-container"
      // style={{ pointerEvents: isAdmin ? "auto" : "none" }}
    >
      <div id={iframeId}></div>
    </div>
  );
}
