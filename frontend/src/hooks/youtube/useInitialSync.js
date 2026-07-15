import { useEffect, useRef } from "react";
import useRoom from "../room/useRoom";

const useInitialSync = () => {
  const { roomData } = useRoom();
  const roomDataRef = useRef(roomData);

  useEffect(() => {
    roomDataRef.current = roomData;
  }, [roomData]);

  return { roomDataRef };
};

export default useInitialSync;
