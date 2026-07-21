// import { updateVideo, socket } from "../../services/socket";
// import { useEffect } from "react";
// import useRoom from "../room/useRoom";
// import usePlayer from "../player/usePlayer";

// const useVideoUpdate = () => {
//   const { roomDataRef, videoId } = useRoom();
//   const { playerRef } = usePlayer();
//   useEffect(() => {
//     if (!socket || !playerRef.current) return;
//     updateVideo(playerRef.current, roomDataRef.current);
//   }, [socket, videoId]);
// };

// export default useVideoUpdate;
