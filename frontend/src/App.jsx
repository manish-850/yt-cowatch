import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Chat from "./components/chat/Chat";
import Form from "./components/form/Form";
import Loading from "./components/Loading/Loading";
import VideoContainer from "./components/videoPlayer/VideoContainer";
import { useContext } from "react";
import { UserDataContext } from "./context/UserContext";
import { RoomDataContext } from "./context/RoomContext";
import { PlayerDataContext } from "./context/PlayerContext";
import { SocketDataContext } from "./context/SocketContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function App() {
  // user context
  // const [username, setUsername] = useState("");

  // room context
  // const [isJoined, setIsJoined] = useState(false);
  // const [roomId, setRoomId] = useState("");
  // const [roomData, setRoomData] = useState(null);
  
  // player context
  // const [player, setPlayer] = useState(null);
  // const [isMuted, setIsMuted] = useState(true);

  // socket state
  // const [socket, setSocket] = useState(null);

  const { username, setUsername } = useContext(UserDataContext);
  const { isJoined, setIsJoined, roomId, setRoomId, roomData, setRoomData } = useContext(RoomDataContext);
  const { player, setPlayer, isMuted, setIsMuted } = useContext(PlayerDataContext);
  const { socket, setSocket } = useContext(SocketDataContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!isJoined) return;
    const s = io(BACKEND_URL, {
      transports: ["websocket"]
    });
    setSocket(s);
    s.emit("join-room", { roomId, username });
    s.on("room-update", (data) => {
      setRoomData({ ...data, receivedAt: Date.now() });
    });
    s.on("chat-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      s.disconnect();
    };
  }, [isJoined]);

  useEffect(() => {
    if (!socket || !player) return;
    const interval = setInterval(() => {
      if (typeof player.getCurrentTime === "function" && typeof player.getPlayerState === "function") {
        const state = player.getPlayerState();
        socket.emit("report-status", {
          videoId: roomData?.currentVideoId || "6KcV1C1Ui5s",
          isPlaying: state === 1,
          currentTime: player.getCurrentTime()
        });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [socket, player, roomData?.currentVideoId]);


  const handleSendMessage = (text) => {
    if (socket) {
      socket.emit("send-message", { text });
    }
  };

  if (!isJoined) {
    return (
      <Form />
    );
  }

  if (!roomData) {
    return (
      <Loading />
    );
  }

  return (
    <div className="app-container">
      <VideoContainer/>
      <Chat messages={messages} onSendMessage={handleSendMessage} roomData={roomData} />
    </div>
  );
}
