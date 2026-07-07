import { useContext } from "react";
import { RoomDataContext } from "./context/RoomContext";
import { PlayerDataContext } from "./context/PlayerContext";

import useSocket from "./hooks/socket/useSocket";
import useVideoUpdate from "./hooks/socket/useVideoUpdate";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const {
    isJoined,
    roomId,
    roomData,
    setRoomData,
    setMessages,
    username,
    setIsLoading,
  } = useContext(RoomDataContext);
  const { player } = useContext(PlayerDataContext);

  const clientId = localStorage.getItem("clientId") ?? crypto.randomUUID();
  localStorage.setItem("clientId", clientId);

  useSocket(setRoomData, setMessages, roomId, username, isJoined, setIsLoading, clientId);
  useVideoUpdate(player, roomData);

  return <AppRoutes />;
}
