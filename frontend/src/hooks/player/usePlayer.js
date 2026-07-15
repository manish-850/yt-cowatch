import { useContext } from "react";
import { PlayerDataContext } from "@/context/PlayerContext";

const usePlayer = () => useContext(PlayerDataContext)

export default usePlayer