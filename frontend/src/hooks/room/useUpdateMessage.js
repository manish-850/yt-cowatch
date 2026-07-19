import { getSocket } from "@/services/socket";
import { useEffect } from "react";
import useRoom from "./useRoom";

const useUpdateMessage = () => {
  const { roomId, setMessages } = useRoom();
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
