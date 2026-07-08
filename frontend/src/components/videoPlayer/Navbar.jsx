import { Volume2, VolumeX, LogOut } from "lucide-react";
import RoomControls from "./RoomControls";
import { useContext } from "react";
import { RoomDataContext } from "../../context/RoomContext";
import { PlayerDataContext } from "../../context/PlayerContext";
import { socket, disconnectSocket } from "../../services/socket";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { player, isMuted, setIsMuted, setPlayer } =
    useContext(PlayerDataContext);
  const {
    roomId,
    roomData,
    setRoomData,
    setMessages,
    setIsJoined,
    setIsLoading,
  } = useContext(RoomDataContext);
  const clientId = localStorage.getItem("clientId");
  const currentUser = roomData?.users.find((u) => u.clientId === clientId);
  const isAdmin = currentUser?.isAdmin || false;
  const [isLeaved, setIsLeaved] = useState(false);
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

  const handleChangeVideo = (videoId) => {
    if (socket) {
      socket.emit("change-video", { videoId });
    }
  };

  useEffect(() => {
    if (isLeaved) return navigate("/");
  }, [isLeaved]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h3>Room : {roomId}</h3>
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
  );
};

export default Navbar;
