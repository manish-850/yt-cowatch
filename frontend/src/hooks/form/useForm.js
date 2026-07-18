import { generateRoomId } from "@/utils/roomId";
import useRoom from "../room/useRoom";




const useForm = () => {
    const {
        roomId,
        setRoomId,
        setIsJoined,
        username,
        setIsLoading,
      } = useRoom()
      const handleJoin = (e) => {
        e.preventDefault();
        if (username.trim()) localStorage.setItem("username", username);
        if (roomId.trim()) {
          setIsLoading(true);
          setIsJoined(true);
        }
      };
    
      const handleCreateRoom = () => {
        const randomId = generateRoomId();
        setRoomId(randomId);
      };
  return {handleJoin, handleCreateRoom}
}

export default useForm