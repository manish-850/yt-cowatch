import { createContext, useRef, useState } from "react";
export const PlayerDataContext = createContext();

const PlayerContext = ({ children }) => {
  const playerRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <PlayerDataContext.Provider value={{ isMuted, setIsMuted, playerRef }}>
      {children}
    </PlayerDataContext.Provider>
  );
};

export default PlayerContext;
