import useRoom from "../room/useRoom";
import usePlayer from "../player/usePlayer";
import { useEffect, useRef } from "react";
import { syncToTargetTime } from "@/utils/syncToTargetTime";

const useYoutubePlayer = (roomDataRef,handlePlaybackControlRef) => {
  const playerRef = useRef(null);
  const { setPlayer } = usePlayer();
  let { roomData, isAdmin } = useRoom();
  isAdmin = true;
  const iframeId = "yt-player";
  const videoId = roomData?.currentVideoId || "6KcV1C1Ui5s";

  const handlePlayerReady = (playerInst) => {
    setPlayer(playerInst);
    playerInst.mute();
    if (roomData) {
      playerInst.seekTo(roomData.currentTime, true);
      if (roomData.isPlaying) {
        playerInst.playVideo();
      } else {
        playerInst.pauseVideo();
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
          console.log("YT READY");
          playerRef.current = event.target;
          if (handlePlayerReady) {
            handlePlayerReady(event.target);
          }
          if (!isAdmin) {
            syncToTargetTime(playerRef,roomDataRef,false);
          }
        },
        onStateChange: (event) => {
          if (isAdmin) {
            if (handlePlaybackControlRef.current) {
              if (event.data === 1) {
                handlePlaybackControlRef.current(
                  true,
                  event.target.getCurrentTime(),
                );
              } else if (event.data === 2) {
                handlePlaybackControlRef.current(
                  false,
                  event.target.getCurrentTime(),
                );
              }
            }
          } else if (event.data === 1) syncToTargetTime(playerRef,roomDataRef,true);
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
      if (
        playerRef.current &&
        typeof playerRef.current.destroy === "function"
      ) {
        playerRef.current.destroy();
      }
    };
  }, [isAdmin]);

  return { playerRef };
};

export default useYoutubePlayer;
