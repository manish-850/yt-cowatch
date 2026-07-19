import { createContext, useState, useRef } from "react";

export const RoomDataContext = createContext();

const RoomContext = ({ children }) => {
  const [isJoined, setIsJoined] = useState(false);
  const [roomId, setRoomId] = useState("");
  const roomDataRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [videoId, setVideoId] = useState("");
  const playbackControlRef = useRef(null)

  return (
    <RoomDataContext.Provider
      value={{
        isJoined,
        setIsJoined,
        roomId,
        setRoomId,
        roomDataRef,
        messages,
        setMessages,
        username,
        setUsername,
        isLoading,
        setIsLoading,
        isAdmin,
        setIsAdmin,
        videoId,
        setVideoId,
        playbackControlRef
      }}
    >
      {children}
    </RoomDataContext.Provider>
  );
};

export default RoomContext;
