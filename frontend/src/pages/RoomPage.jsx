import VideoContainer from "../components/videoPlayer/VideoContainer";
import Sidebar from "../components/videoPlayer/Sidebar";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { getSocket } from "../services/socket";
import useVideoUpdate from "../hooks/youtube/useVideoUpdate";
import { generateName } from "../utils/username";
import Loading from "../components/Loading/Loading";
import usePlayer from "@/hooks/player/usePlayer";
import useRoom from "@/hooks/room/useRoom";
import useSocket from "@/hooks/socket/useSocket";
import { toast } from "sonner";

const RoomPage = () => {
  const { roomId } = useParams();
  const {
    roomDataRef,
    setUsername,
    setRoomId,
    setMessages,
    setIsAdmin,
    isJoined,
    setIsJoined,
  } = useRoom();
  const [isLoading, setIsLoading] = useState(true);
  const { playerRef } = usePlayer();
  const player = playerRef.current;

  const clientId = useMemo(() => {
    let id = localStorage.getItem("clientId");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("clientId", id);
    }
    return id;
  }, []);

  useSocket(isJoined);

  useEffect(() => {
    let uName = localStorage.getItem("username");
    if (!uName) {
      uName = generateName();
      localStorage.setItem("username", uName);
    }
    setUsername(uName);
  }, [roomId]);

  useEffect(() => {
    const handleRoomUpdate = (data) => {
      const currentUser = data.users.find((user) => user.clientId === clientId);
      if (currentUser) {
        roomDataRef.current = data;
        setIsAdmin(currentUser?.isAdmin);
        setUsername(currentUser?.username);
        setIsLoading(false);
        setIsJoined(true);
        setRoomId(roomId);
      }
    };
    const handleChat = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };
    const s = getSocket();
    s.on("room-update", handleRoomUpdate);
    s.emit("join-room", {
      roomId,
      username: localStorage.getItem("username"),
      clientId,
    });
    s.on("chat-message", handleChat);
    return () => {
      s.off("room-update", handleRoomUpdate);
    };
  }, [roomId]);

  useVideoUpdate();
  useEffect(() => {
    if (player) toast.success("YT player ready");
  }, [player]);

  if (isLoading) return <Loading />;
  return (
    <div className="app-container">
      <VideoContainer />
      <Sidebar />
    </div>
  );
};

export default RoomPage;
