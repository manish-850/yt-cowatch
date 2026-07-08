import { Volume2, VolumeX, LogOut } from "lucide-react";
import "./videoPlayer.css";
import VideoPlayer from "./VideoPlayer";
import RoomControls from "./RoomControls";
import { useContext } from "react";
import { RoomDataContext } from "../../context/RoomContext";
import { PlayerDataContext } from "../../context/PlayerContext";
import { socket, disconnectSocket } from "../../services/socket";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const VideoContainer = () => {
  const navigate = useNavigate();
  const { roomId, roomData, setRoomData, setMessages, setIsJoined, setIsLoading } =
    useContext(RoomDataContext);
  const { player, setPlayer, isMuted, setIsMuted } =
    useContext(PlayerDataContext);
  const [isLeaved, setIsLeaved] = useState(false);
  useEffect(() => {
    if (isLeaved) return navigate("/");
  }, [isLeaved]);

  const clientId = localStorage.getItem("clientId");
  const currentUser = roomData?.users.find((u) => u.clientId === clientId);
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
    disconnectSocket();
    setIsLeaved(true);
    setRoomData(null);
    setMessages([]);
    setPlayer(null);
    setIsMuted(true);
    setIsJoined(false);
    setIsLoading(false);
    localStorage.removeItem("clientId");
    localStorage.removeItem("username");
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
        <h2>Room : {roomId}</h2>
        {isAdmin && <RoomControls onChangeVideo={handleChangeVideo} />}
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
            style={{ padding: "0.5rem", backgroundColor: "var(--destructive)" }}
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      <VideoPlayer
        videoId={roomData?.currentVideoId || "6KcV1C1Ui5s"}
        socket={socket}
        onPlayerReady={handlePlayerReady}
        isAdmin={true}
        roomData={roomData}
        onAdminPlaybackControl={handlePlaybackControl}
      />
    </div>
  );
};

export default VideoContainer;
