import { useContext } from "react";
import { RoomDataContext } from "./context/RoomContext";
import { PlayerDataContext } from "./context/PlayerContext";

import useSocket from "./hooks/useSocket";
import useVideoUpdate from "./hooks/useVideoUpdate";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const {
    isJoined,
    roomId,
    roomData,
    setRoomData,
    setMessages,
    username,
    setIsLoading
  } = useContext(RoomDataContext);
  const { player } = useContext(PlayerDataContext);
 
  useSocket(setRoomData, setMessages, roomId, username, isJoined, setIsLoading);
  useVideoUpdate(player, roomData);

  return(
    <AppRoutes />
  )
}
