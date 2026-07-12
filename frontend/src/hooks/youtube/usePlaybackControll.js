import { useEffect, useRef } from "react";
import { socket } from "@/services/socket";

const usePlaybackControll = () => {
  const handlePlaybackControlRef = useRef(null);

  const handlePlaybackControl = (isPlaying, currentTime) => {
    if (socket) {
      socket.emit("playback-control", { isPlaying, currentTime });
    }
  };

  useEffect(() => {
    handlePlaybackControlRef.current = handlePlaybackControl;
  }, [handlePlaybackControl]);
};

export default usePlaybackControll;






// onStateChange: (event) => {
//           if (isAdmin) {
//             if (handlePlaybackControlRef.current) {
//               if (event.data === 1) {
//                 handlePlaybackControlRef.current(
//                   true,
//                   event.target.getCurrentTime(),
//                 );
//               } else if (event.data === 2) {
//                 handlePlaybackControlRef.current(
//                   false,
//                   event.target.getCurrentTime(),
//                 );
//               }
//             }
//           }
//           // else {
//           //   if (event.data === 1) {
//           //     syncToTargetTime(true);
//           //   }
//           // }
//         },