import VideoContainer from "../components/videoPlayer/VideoContainer";
import Chat from "../components/chat/Chat";
import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { RoomDataContext } from "../context/RoomContext";
import { socket } from "../services/socket";
import axios from "axios";
import { generateName } from "../utils/username";

const RoomPage = () => {
  const { roomId } = useParams();
  const {
    setIsJoined,
    setRoomData,
    username,
    setUsername,
    setIsLoading,
    setRoomId,
  } = useContext(RoomDataContext);
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setIsLoading(true);
        const clientId = localStorage.getItem("clientId") ?? crypto.randomUUID();
        localStorage.setItem("clientId", clientId);
        // socketId, username, clientId
        if(!username){
          const generatedUsername = generateName();
          setUsername(generatedUsername);
        }
        const res = await axios.post(`http://localhost:5000/api/room/${roomId}`,{socketId: socket.id, username, clientId});
        const data = res.data;
        const currentUser = data.roomData.users.find(
          (user) => user.clientId === localStorage.getItem("clientId"),
        );
        console.log(data);
        setUsername(currentUser.username);
        setRoomId(data.roomData.id);
        setRoomData({
          ...data.roomData,
          receivedAt: data.receivedAt,
        });
        setIsJoined(true);
      } catch (err) {
        console.error(err);
      } finally{
        setIsLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);
  return (
    <div className="app-container">
      <VideoContainer />
      <Chat />
    </div>
  );
};

export default RoomPage;
