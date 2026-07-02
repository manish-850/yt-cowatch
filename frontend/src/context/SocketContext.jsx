import React, { useState } from 'react';

export const SocketDataContext = React.createContext();

const SocketContext = ({ children }) => {
    const [socket, setSocket] = useState(null);

    return (
    <SocketDataContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketDataContext.Provider>
  );
};

export default SocketContext;