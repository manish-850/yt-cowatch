import { getSocket } from "@/services/socket";
import { useEffect } from "react";
import useRoom from "./useRoom";
import { useParams } from "react-router-dom";

const useUpdateMessage = () => {
  const { setMessages } = useRoom();
  const { roomId } = useParams();
  useEffect(() => {
    const handleChat = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };
    const s = getSocket();
    s.on("chat-message", handleChat);
    return () => {
      s.off("chat-message", handleChat);
    };
  }, [roomId]);
};

export default useUpdateMessage;
