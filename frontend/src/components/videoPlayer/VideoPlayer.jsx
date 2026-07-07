import { useEffect, useRef, useState } from "react";
import "./VideoPlayer.css";


export default function VideoPlayer({
  videoId,
  socket,
  onPlayerReady,
  isAdmin,
  roomData,
  onAdminPlaybackControl
}) {
  const playerRef = useRef(null);
  const roomDataRef = useRef(roomData);
  const onAdminPlaybackControlRef = useRef(onAdminPlaybackControl);
  const hasSyncedRef = useRef(false);
  const iframeId = "yt-player";

  useEffect(() => {
    roomDataRef.current = roomData;
  }, [roomData]);

  useEffect(() => {
    onAdminPlaybackControlRef.current = onAdminPlaybackControl;
  }, [onAdminPlaybackControl]);

  const syncToTargetTime = (isFromPlayingState = false) => {
    if (hasSyncedRef.current) return;
    const player = playerRef.current;
    const currentRoomData = roomDataRef.current;
    if (!player || !currentRoomData || typeof player.getCurrentTime !== "function") return;

    let targetTime = currentRoomData.currentTime;
    if (currentRoomData.isPlaying && currentRoomData.receivedAt) {
      targetTime += (Date.now() - currentRoomData.receivedAt) / 1000;
    }

    const currentVideoTime = player.getCurrentTime();
    if (Math.abs(currentVideoTime - targetTime) > 2) {
      player.seekTo(targetTime, true);
    }

    if (isFromPlayingState || !currentRoomData.isPlaying) {
      hasSyncedRef.current = true;
    }
  };

  useEffect(() => {
    let player;

    function initPlayer() {
      console.log("Creating player");
      player = new window.YT.Player(iframeId, {
        videoId: videoId,
        playerVars: {
          controls: isAdmin ? 1 : 0,
          disablekb: isAdmin ? 0 : 1,
          rel: 0,
          modestbranding: 1,
          autoplay: 1,
          enablejsapi: 1,
          origin: window.location.origin
        },
        events: {
          onReady: (event) => {
            console.log("YT READY");
            playerRef.current = event.target;
            if (onPlayerReady) {
              onPlayerReady(event.target);
            }
            if (!isAdmin) {
              syncToTargetTime(false);
            }
          },
          onStateChange: (event) => {
            if (isAdmin) {
              if (onAdminPlaybackControlRef.current) {
                if (event.data === 1) {
                  onAdminPlaybackControlRef.current(true, event.target.getCurrentTime());
                } else if (event.data === 2) {
                  onAdminPlaybackControlRef.current(false, event.target.getCurrentTime());
                }
              }
            } else {
              if (event.data === 1) {
                syncToTargetTime(true);
              }
            }
          }
        }
      });
    }

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

      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
      if (player && typeof player.destroy === "function") {
        player.destroy();
      }
    };
  }, [isAdmin]);

  useEffect(() => {
  console.log("videoId changed:", videoId);

  if (!roomData) return;

  hasSyncedRef.current = false;
  const player = playerRef.current;

  console.log("player:", player);

  if (player && typeof player.loadVideoById === "function") {
    console.log("Loading video:", videoId);
    player.loadVideoById({ videoId });
  }
}, [videoId,playerRef.current]);

  useEffect(() => {
    if (!socket) return;

    const handleSync = ({ isPlaying, currentTime }) => {
      const player = playerRef.current;
      if (!player || typeof player.getPlayerState !== "function") return;

      const playerState = player.getPlayerState();
      const currentVideoTime = player.getCurrentTime();

      if (!isPlaying || Math.abs(currentVideoTime - currentTime) > 1) {
        player.seekTo(currentTime, true);
      }

      if (isPlaying && playerState !== 1) {
        player.playVideo();
      } else if (!isPlaying && playerState === 1) {
        player.pauseVideo();
      }
    };

    socket.on("playback-sync", handleSync);
    return () => {
      socket.off("playback-sync", handleSync);
    };
  }, [socket]);

  return (
    <div className="player-container" style={{ pointerEvents: isAdmin ? "auto" : "none" }}>
      <div id={iframeId}></div>
    </div>
  );
}
