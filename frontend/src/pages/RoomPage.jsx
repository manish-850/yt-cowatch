import VideoContainer from "../components/videoPlayer/VideoContainer";
import Sidebar from "../components/videoPlayer/Sidebar";
import { useState, useMemo } from "react";
import Loading from "../components/Loading/Loading";
import useSocket from "@/hooks/socket/useSocket";
import useUpdateRoom from "@/hooks/room/useUpdateRoom";
import useJoinRoom from "@/hooks/room/useJoinRoom";
import useUpdateMessage from "@/hooks/room/useUpdateMessage";
import useInitUsername from "@/hooks/room/useInitUsername";

const RoomPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const clientId = useMemo(() => {
    let id = localStorage.getItem("clientId");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("clientId", id);
    }
    return id;
  }, []);

  useSocket();
  useInitUsername();
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
