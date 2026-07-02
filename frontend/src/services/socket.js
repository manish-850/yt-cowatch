import { io } from "socket.io-client";

export let socket = null;

export function getSocket() {
  if (!socket) {
    socket = io(import.meta.env.VITE_BACKEND_URL);
  }
  return socket;
}

export const initSocket = (setRoomData, setMessages, roomId, username) => {
  const handleRoomUpdate = (data) => {
    setRoomData({ ...data, receivedAt: Date.now() });
  };

  const handleChat = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  getSocket();
  socket.emit("join-room", { roomId, username });
  socket.on("room-update", handleRoomUpdate);
  socket.on("chat-message", handleChat);

  return () => {
    socket.off("room-update", handleRoomUpdate);
    socket.off("chat-message", handleChat);
    socket.disconnect();
    socket = null;
  };
};

export const updateVideo = (player, roomData) => {
  if (!socket || !socket.connected) return;
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

export const handleSendMessage = (text) => {
  //   if (socket) {
  //     socket.emit("send-message", { text });
  //       }
  if (!socket || !socket.connected) return;
  socket.emit("send-message", { text });
};
