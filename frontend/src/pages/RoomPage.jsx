import VideoContainer from "../components/videoPlayer/VideoContainer";
import Sidebar from "../components/videoPlayer/Sidebar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSocket } from "../services/socket";
import useVideoUpdate from "../hooks/socket/useVideoUpdate";
import { generateName } from "../utils/username";
import Loading from "../components/Loading/Loading";
import { useMemo } from "react";
import usePlayer from "@/hooks/player/usePlayer";
import useRoom from "@/hooks/room/useRoom";

const RoomPage = () => {
  const { roomId } = useParams();
  const {
    setRoomData,
    setUsername,
    setRoomId,
    setMessages,
    roomData,
  } = useRoom();
  const [isLoading, setIsLoading] = useState(true);
  const { player } = usePlayer();

  const clientId = useMemo(() => {
  let id = localStorage.getItem("clientId");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("clientId", id);
  }
  return id;
}, []);

useEffect(() => {
  let uName = localStorage.getItem("username");
  if (!uName) {
    uName = generateName();
    localStorage.setItem("username", uName);
  }
  setUsername(uName);
}, [setUsername]);

  useEffect(() => {
    const handleRoomUpdate = (data) => {
      const currentUser = data.users.find(
        (user) => user.clientId === clientId,
      );
      console.log("Room update received:", data);
      console.log("currentUser : ", currentUser);
      setRoomData(data);
      if (currentUser) {
        setUsername(currentUser.username);
        setIsLoading(false);
      }
    };
    const handleChat = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };
    setRoomId(roomId);
    const s = getSocket();
    s.on("room-update", handleRoomUpdate);
    s.emit("join-room", {
      roomId,
      username : localStorage.getItem("username"), // can't use username bcz react takes time to update the state
      clientId,
    });
    s.on("chat-message", handleChat);
    return () => {
      s.off("room-update", handleRoomUpdate);
    };
  }, [roomId]);

  useVideoUpdate(player, roomData);

  if(isLoading) return <Loading/>
  return (
    <div className="app-container">
      <VideoContainer />
      <Sidebar/>
    </div>
  );
};

export default RoomPage;
