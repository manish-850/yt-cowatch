import { createContext, useState } from 'react';

export const RoomDataContext = createContext();

const RoomContext = ({ children }) => {
  const [isJoined, setIsJoined] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [roomData, setRoomData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false)

  return (
    <RoomDataContext.Provider
      value={{
        isJoined,
        setIsJoined,
        roomId,
        setRoomId,
        roomData,
        setRoomData,
        messages,
        setMessages,
        username,
        setUsername,
        isLoading,
        setIsLoading,
        isAdmin,
        setIsAdmin
      }}
    >
      {children}
    </RoomDataContext.Provider>
  );
};

export default RoomContext;
