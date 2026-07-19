import useRoom from "../room/useRoom";
import usePlayer from "../player/usePlayer";
import { useEffect } from "react";
import { syncToTargetTime } from "@/utils/syncToTargetTime";
import { toast } from "sonner";

const useYoutubePlayer = () => {
  const { playerRef } = usePlayer();
  const { roomDataRef, isAdmin, videoId, playbackControlRef } = useRoom();
  const iframeId = "yt-player";
  
  const handlePlayerReady = () => {
    const player = playerRef.current;
    const roomData = roomDataRef.current;
    console.log("roomData:", roomDataRef.current);
    player.mute();
    if (roomData) {
      player.seekTo(roomData.currentTime, true);
      if (roomData.isPlaying) {
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    }
  };
  const initPlayer = () => {
    console.log("Creating player");
    playerRef.current = new window.YT.Player(iframeId, {
      videoId,
      playerVars: {
        controls: isAdmin ? 1 : 0,
        disablekb: isAdmin ? 0 : 1,
        rel: 0,
        modestbranding: 1,
        autoplay: 1,
        enablejsapi: 1,
        origin: window.location.origin,
      },
      events: {
        onReady: (event) => {
          console.log("YT READY : ", event.target);
          playerRef.current = event.target;
          toast.success("YT player ready");
          if (handlePlayerReady) {
            handlePlayerReady();
          }
          if (!isAdmin) {
            syncToTargetTime(playerRef, roomDataRef, false);
          }
        },
        onStateChange: (event) => {
          if (isAdmin) {
            if (playbackControlRef.current) {
              if (event.data === 1) {
                playbackControlRef.current(
                  true,
                  event.target.getCurrentTime(),
                );
              } else if (event.data === 2) {
                playbackControlRef.current(
                  false,
                  event.target.getCurrentTime(),
                );
              }
            }
          } else if (event.data === 1)
            syncToTargetTime(playerRef, roomDataRef, true);
        },
      },
    });
  };

  useEffect(() => {
    let checkInterval;

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      checkInterval = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(checkInterval);
          initPlayer();
        }
      }, 100);
      let scriptTag = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]',
      );
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
      }
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
      if (playerRef.current && typeof playerRef.current.destroy === "function") {
        console.log("Destroying player");
        playerRef.current.destroy();
      }
    };
  }, [isAdmin]);
};

export default useYoutubePlayer;
