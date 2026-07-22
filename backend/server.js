import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import "dotenv/config";
import {
  addUserToRoom,
  removeUserFromRoom,
  getRoomData,
  updateRoomVideo,
  updateRoomPlayback,
  getOrCreateRoom,
} from "./rooms.js";

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  let currentRoomId = null;
  let currentUsername = null;
  let currentClientId = null;

  socket.on("join-room", ({ roomId, username, clientId }) => {
    currentRoomId = roomId;
    currentUsername = username;
    currentClientId = clientId;

    socket.join(roomId);
    const { room } = addUserToRoom(roomId, socket.id, username, clientId);

    io.to(roomId).emit("room-update", getRoomData(room));
    io.to(roomId).emit("chat-message", {
      sender: "System",
      text: `${username} joined the room.`,
    });
  });

  socket.on("send-message", ({ text }) => {
    if (!currentRoomId || !currentUsername) return;
    io.to(currentRoomId).emit("chat-message", {
      sender: currentUsername,
      text,
    });
  });

  socket.on("change-video", ({ videoId }) => {
    if (!currentRoomId) return;
    const room = getOrCreateRoom(currentRoomId);
    const activeUser = room.users.get(currentClientId);
    if (activeUser && activeUser.isAdmin) {
      updateRoomVideo(currentRoomId, videoId);
      io.to(currentRoomId).emit("room-update", getRoomData(room));
      io.to(currentRoomId).emit("chat-message", {
        sender: "System",
        text: `${currentUsername} changed the video.`,
      });
    }
  });

  socket.on("playback-control", ({ isPlaying, currentTime, clientTime }) => {
    if (!currentRoomId) return;
    let room = getOrCreateRoom(currentRoomId);
    const activeUser = room.users.get(currentClientId);
    if (activeUser && activeUser.isAdmin) {
      room = updateRoomPlayback(
        currentRoomId,
        isPlaying,
        currentTime,
        clientTime,
      );
      socket.to(currentRoomId).emit("playback-sync", {
        isPlaying,
        currentTime: room.currentTime,
        serverTime: room.serverTime,
      });
      io.to(currentRoomId).emit("room-update", getRoomData(room));
    }
  });

  socket.on(
    "report-status",
    ({ videoId, isPlaying, currentTime, clientTime }) => {
      if (!currentRoomId) return;
      const room = getOrCreateRoom(currentRoomId);
      const activeUser = room.users.get(currentClientId);
      console.log("Room : ", room);
      if (activeUser) {
        let roomTime = room.currentTime;
        const idMatch = videoId === room.currentVideoId;
        const playMatch = isPlaying === room.isPlaying;
        const delay = roomTime - currentTime;
        const timeMatch = Math.abs(delay) <= 1;
        const isSynced =
          idMatch && (room.isPlaying ? playMatch && timeMatch : true);
        activeUser.status = {
          isSynced,
          currentTime,
        };
        // if delay is more than 1 second fire playback-sync event
        if (!timeMatch) {
          updateRoomPlayback(currentRoomId, isPlaying, currentTime, clientTime);
          io.to(currentRoomId).emit("room-update", getRoomData(room));
        }
        io.to(currentRoomId).emit("room-update", {
          ...getRoomData(room),
          serverTime: Date.now(),
        });
      }
    },
  );

  socket.on("disconnect", () => {
    if (!currentRoomId) return;
    const result = removeUserFromRoom(currentRoomId, currentClientId);
    if (result) {
      const { room } = result;
      io.to(currentRoomId).emit("room-update", getRoomData(room));
      io.to(currentRoomId).emit("chat-message", {
        sender: "System",
        text: `${currentUsername} left the room.`,
      });
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
