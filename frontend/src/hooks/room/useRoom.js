import { useContext } from "react";
import { RoomDataContext } from "@/context/RoomContext";

const useRoom = () => useContext(RoomDataContext)

export default useRoom