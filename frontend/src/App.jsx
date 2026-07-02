import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Chat from "./components/chat/Chat";
import Form from "./components/form/Form";
import Loading from "./components/Loading/Loading";
import VideoContainer from "./components/videoPlayer/VideoContainer";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function App() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [socket, setSocket] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [player, setPlayer] = useState(null);
  const [isMuted, setIsMuted] = useState(true);

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

  const handleJoin = (e) => {
    e.preventDefault();
    if (roomId.trim() && username.trim()) {
      setIsJoined(true);
    }
  };

  const handleCreateRoom = () => {
    const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomId(randomId);
  };

  const handleLeave = () => {
    if (socket) socket.disconnect();
    setSocket(null);
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

  const handleSendMessage = (text) => {
    if (socket) {
      socket.emit("send-message", { text });
    }
  };

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

  const currentUser = roomData?.users.find((u) => u.id === socket?.id);
  const isAdmin = currentUser?.isAdmin || false;

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
