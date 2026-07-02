import React, { useState, useEffect, useContext } from "react";
import Chat from "./components/chat/Chat";
import Form from "./components/form/Form";
import Loading from "./components/Loading/Loading";
import VideoContainer from "./components/videoPlayer/VideoContainer";
import { RoomDataContext } from "./context/RoomContext";
import { PlayerDataContext } from "./context/PlayerContext";

import useSocket from "./hooks/useSocket";
import useVideoUpdate from "./hooks/useVideoUpdate";

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
 

  useSocket(setRoomData, setMessages, roomId, username,isJoined);
  useVideoUpdate(player, roomData);

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
