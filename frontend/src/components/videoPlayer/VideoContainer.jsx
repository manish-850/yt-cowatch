import { Volume2, VolumeX, LogOut } from "lucide-react";
import './VideoPlayer.css'
import VideoPlayer from './VideoPlayer';
import RoomControls from "../RoomControls";


const VideoContainer = () => {
  return (
    <div className="main-content">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Room: {roomId}</h2>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={toggleMute} className="btn-secondary" style={{ padding: "0.5rem" }}>
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <button onClick={handleLeave} className="btn-secondary" style={{ padding: "0.5rem" }}>
              <LogOut size={18} />
            </button>
          </div>
        </div>

        <VideoPlayer
          videoId={roomData?.currentVideoId || "6KcV1C1Ui5s"}
          socket={socket}
          onPlayerReady={handlePlayerReady}
          isAdmin={isAdmin}
          roomData={roomData}
          onAdminPlaybackControl={handlePlaybackControl}
        />

        {isAdmin && (
          <RoomControls
            onChangeVideo={handleChangeVideo}
          />
        )}

      </div>
  )
}

export default VideoContainer