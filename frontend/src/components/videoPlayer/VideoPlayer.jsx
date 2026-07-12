
import "./videoPlayer.css";

import useInitialSync from "@/hooks/youtube/useInitialSync";
import usePlaybackSocket from "@/hooks/youtube/useYoutubePlayer";
import usePlaybackControll from "@/hooks/youtube/usePlaybackControll";
import useVideoLoader from "@/hooks/youtube/useVideoLoader";
import useYoutubePlayer from "@/hooks/youtube/useYoutubePlayer";
import useRoom from "@/hooks/room/useRoom";

export default function VideoPlayer() {
  const { roomData } = useRoom();
  const iframeId = "yt-player";
  const clientId = localStorage.getItem("clientId");
  const currentUser = roomData?.users.find((u) => u.clientId === clientId);
  let isAdmin = currentUser?.isAdmin || false;
  isAdmin = true;
  
  // new
  
  // let isFromPlayingState = false;
  
  
  const playerRef = useYoutubePlayer();


  usePlaybackSocket(playerRef);
  useInitialSync(playerRef);
  usePlaybackControll();
  useVideoLoader(playerRef);
  
  return (
    <div
      className="player-container"
      style={{ pointerEvents: isAdmin ? "auto" : "none" }}
    >
      <div id={iframeId}></div>
    </div>
  );
}
