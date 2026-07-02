import React, { useState } from 'react';

export const UserDataContext = React.createContext();

const UserContext = ({ children }) => {
    const [username, setUsername] = useState("");

    return (
    <UserDataContext.Provider value={{ username, setUsername }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;