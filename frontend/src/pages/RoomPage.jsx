import VideoContainer from "../components/videoPlayer/VideoContainer";
import Chat from "../components/chat/Chat";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { RoomDataContext } from "../context/RoomContext";
import { PlayerDataContext } from "../context/PlayerContext";

const RoomPage = () => {
  const { roomId } = useParams();
  const {
    isJoined,
    setIsJoined,
    setRoomData,
    setMessages,
    username,
    setUsername,
    setIsLoading,
    setRoomId,
  } = useContext(RoomDataContext);
  const { player, setPlayer } = useContext(PlayerDataContext);
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:5000/api/room/${roomId}`);
        const data = await res.json();
        const currentUser = data.users.find(
          (user) => user.clientId === localStorage.getItem("clientId"),
        );

        if (!currentUser) {
          // Redirect or show "You are not part of this room"
          setIsLoading(false);
          return;
        }
        setUsername(currentUser.username);
        setRoomId(data.id);
        setRoomData({ ...data, receivedAt: Date.now() });
        setIsJoined(true);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
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
