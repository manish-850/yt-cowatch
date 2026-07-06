import VideoContainer from "../components/videoPlayer/VideoContainer";
import Chat from "../components/chat/Chat";
import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { RoomDataContext } from "../context/RoomContext";
import { socket } from "../services/socket";

const RoomPage = () => {
  const { roomId } = useParams();
  const {
    setIsJoined,
    setRoomData,
    setUsername,
    setIsLoading,
    setRoomId,
  } = useContext(RoomDataContext);
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:5000/api/room/${roomId}`);
        const data = await res.json();
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
