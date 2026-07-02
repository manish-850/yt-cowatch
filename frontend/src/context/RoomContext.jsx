import React, { useState } from 'react';

export const RoomDataContext = React.createContext();

const RoomContext = ({ children }) => {
  const [isJoined, setIsJoined] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [roomData, setRoomData] = useState(null);

  return (
    <RoomDataContext.Provider
      value={{
        isJoined,
        setIsJoined,
        roomId,
        setRoomId,
        roomData,
        setRoomData,
      }}
    >
      {children}
    </RoomDataContext.Provider>
  );
};

export default RoomContext;
