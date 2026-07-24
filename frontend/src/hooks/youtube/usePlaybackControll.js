// import { getSocket } from "@/services/socket";
// import useRoom from "../room/useRoom";
// import { useEffect } from "react";

// const usePlaybackControll = () => {
//   const { playbackControlRef } = useRoom();
//   const s = getSocket();
//   useEffect(() => {
//     if (!s || !playbackControlRef.current) return;
//     s.emit("playback-control", playbackControlRef.current);
//   }, [playbackControlRef.current]);
// };

// export default usePlaybackControll;
