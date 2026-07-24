import { generateName } from "@/utils/username";
import { useEffect } from "react";
import useRoom from "./useRoom";
import { useParams } from "react-router-dom";

const useInitUsername = () => {
  const { setUsername } = useRoom();
  const { roomId } = useParams();
  useEffect(() => {
    let uName = localStorage.getItem("username");
    if (!uName) {
      uName = generateName();
      localStorage.setItem("username", uName);
    }
    setUsername(uName);
  }, [roomId]);
};

export default useInitUsername;
