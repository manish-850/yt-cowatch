import "./videoPlayer.css";
import VideoPlayer from "./VideoPlayer";
import Navbar from "./Navbar";

const VideoContainer = () => {
  return (
    <div className="main-content">
      <Navbar />
      <VideoPlayer />
    </div>
  );
};

export default VideoContainer;
