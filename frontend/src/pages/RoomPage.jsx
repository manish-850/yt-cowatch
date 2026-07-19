import VideoContainer from "../components/videoPlayer/VideoContainer";
import Sidebar from "../components/videoPlayer/Sidebar";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { generateName } from "../utils/username";
import Loading from "../components/Loading/Loading";
import useRoom from "@/hooks/room/useRoom";
import useSocket from "@/hooks/socket/useSocket";
import useUpdateRoom from "@/hooks/room/useUpdateRoom";
import useJoinRoom from "@/hooks/room/useJoinRoom";
import useUpdateMessage from "@/hooks/room/useUpdateMessage";

const RoomPage = () => {
  const { roomId } = useParams();
  const { setUsername, isJoined } = useRoom();
  const [isLoading, setIsLoading] = useState(true);

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

  useUpdateRoom(setIsLoading, clientId);
  useJoinRoom(clientId);
  useUpdateMessage();

  if (isLoading) return <Loading />;
  return (
    <div className="app-container">
      <VideoContainer />
      <Sidebar />
    </div>
  );
};

export default RoomPage;
