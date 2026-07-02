import React, { useState, useEffect, useContext } from "react";
import Chat from "./components/chat/Chat";
import Form from "./components/form/Form";
import Loading from "./components/Loading/Loading";
import VideoContainer from "./components/videoPlayer/VideoContainer";
import { RoomDataContext } from "./context/RoomContext";
import { PlayerDataContext } from "./context/PlayerContext";
import { SocketDataContext } from "./context/SocketContext";
import { initSocket, updateVideo } from "./services/socket";

export default function App() {
  const {
    isJoined,
    setIsJoined,
    roomId,
    setRoomId,
    roomData,
    setRoomData,
    messages,
    setMessages,
    username,
    setUsername,
  } = useContext(RoomDataContext);
  const { player, setPlayer, isMuted, setIsMuted } = useContext(PlayerDataContext);
  const { socket, setSocket } = useContext(SocketDataContext);
  useEffect(() => {
    if (!isJoined) return;
    initSocket(socket, setSocket, setRoomData, setMessages, roomId, username);
  }, [isJoined]);

  useEffect(() => {
    if (!socket || !player) return;
    updateVideo(socket, player,roomData);
  }, [socket, player, roomData?.currentVideoId]);

  if (!isJoined) {
    return <Form />;
  }

  if (!roomData) {
    return <Loading />;
  }

  return (
    <div className="app-container">
      <VideoContainer />
      <Chat />
    </div>
  );
}
