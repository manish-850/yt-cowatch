import { io } from "socket.io-client";

export const initSocket = (
  socket,
  setSocket,
  setRoomData,
  setMessages,
  roomId,
  username,
) => {
  const s = io(import.meta.env.VITE_BACKEND_URL || "http://localhost:5000", {
    transports: ["websocket"],
  });
  setSocket(s);
  s.emit("join-room", { roomId, username });
  s.on("room-update", (data) => {
    setRoomData({ ...data, receivedAt: Date.now() });
  });
  s.on("chat-message", (msg) => {
    setMessages((prev) => [...prev, msg]);
  });
  return () => {
    s.disconnect();
  };
};

export const updateVideo = (socket, player, roomData) => {
  const interval = setInterval(() => {
    if (
      typeof player.getCurrentTime === "function" &&
      typeof player.getPlayerState === "function"
    ) {
      const state = player.getPlayerState();
      socket.emit("report-status", {
        videoId: roomData?.currentVideoId || "6KcV1C1Ui5s",
        isPlaying: state === 1,
        currentTime: player.getCurrentTime(),
      });
    }
  }, 3000);
  return () => clearInterval(interval);
};

export const handleSendMessage = (socket, text) => {
  if (socket) {
    socket.emit("send-message", { text });
  }
};
