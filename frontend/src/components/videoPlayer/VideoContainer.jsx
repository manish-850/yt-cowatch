import "./videoPlayer.css";
import VideoPlayer from "./VideoPlayer";
import Navbar from "./Navbar";
import useRoom from "@/hooks/room/useRoom";

const VideoContainer = () => {
  const { videoId } = useRoom();
  return (
    <div className="main-content">
      <Navbar />
      {videoId && <VideoPlayer />}
    </div>
  );
};

export default VideoContainer;
