import { createContext, useState } from 'react';

export const PlayerDataContext = createContext();

const PlayerContext = ({ children }) => {
  const [player, setPlayer] = useState(null);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <PlayerDataContext.Provider
      value={{ player, setPlayer, isMuted, setIsMuted }}
    >
      {children}
    </PlayerDataContext.Provider>
  );
};

export default PlayerContext;
