import { Volume2, VolumeX, LogOut } from "lucide-react";
import "./VideoPlayer.css";
import VideoPlayer from "./VideoPlayer";
import RoomControls from "./RoomControls";
import { useContext } from "react";
import { RoomDataContext } from "../../context/RoomContext";
import { PlayerDataContext } from "../../context/PlayerContext";
import { socket } from "../../services/socket";

const VideoContainer = () => {
  const { roomId, roomData, setRoomData } = useContext(RoomDataContext);
  const { player, setPlayer, isMuted, setIsMuted } = useContext(PlayerDataContext);

  const currentUser = roomData?.users.find((u) => u.id === socket?.id);
  const isAdmin = currentUser?.isAdmin || false;

  const toggleMute = () => {
    if (player && typeof player.mute === "function") {
      if (isMuted) {
        player.unMute();
        setIsMuted(false);
      } else {
        player.mute();
        setIsMuted(true);
      }
    }
  };

  const handleLeave = () => {
    if (socket) socket.disconnect();
    socket = null;
    setRoomData(null);
    setMessages([]);
    setPlayer(null);
    setIsMuted(true);
    setIsJoined(false);
  };

  const handlePlayerReady = (playerInst) => {
    setPlayer(playerInst);
    if (!isAdmin) {
      playerInst.mute();
    }
    if (roomData) {
      playerInst.seekTo(roomData.currentTime, true);
      if (roomData.isPlaying) {
        playerInst.playVideo();
      } else {
        playerInst.pauseVideo();
      }
    }
  };

  const handlePlaybackControl = (isPlaying, currentTime) => {
    if (socket) {
      socket.emit("playback-control", { isPlaying, currentTime });
    }
  };

  const handleChangeVideo = (videoId) => {
    if (socket) {
      socket.emit("change-video", { videoId });
    }
  };

  return (
    <div className="main-content">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Room: {roomId}</h2>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={toggleMute}
            className="btn-secondary"
            style={{ padding: "0.5rem" }}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <button
            onClick={handleLeave}
            className="btn-secondary"
            style={{ padding: "0.5rem" }}
          >
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

      {isAdmin && <RoomControls onChangeVideo={handleChangeVideo} />}
    </div>
  );
};

export default VideoContainer;
