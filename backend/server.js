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
  getOrCreateRoom
} from "./rooms.js";

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/api/room/:id",(req, res)=>{
    const roomId = req.params.id;
    const room = getOrCreateRoom(roomId);

    console.log(room);
    res.status(200).json({
      ...room, users: Array.from(room.users.values())
    })
})

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  let currentRoomId = null;
  let currentUsername = null;

  socket.on("join-room", ({ roomId, username, clientId }) => {
    currentRoomId = roomId;
    currentUsername = username;
    
    socket.join(roomId);
    const { room } = addUserToRoom(roomId, socket.id, username, clientId);
    
    io.to(roomId).emit("room-update", getRoomData(room));
    io.to(roomId).emit("chat-message", {
      sender: "System",
      text: `${username} joined the room.`
    });
  });

  socket.on("send-message", ({ text }) => {
    if (!currentRoomId || !currentUsername) return;
    io.to(currentRoomId).emit("chat-message", {
      sender: currentUsername,
      text
    });
  });

  socket.on("change-video", ({ videoId }) => {
    if (!currentRoomId) return;
    const room = getOrCreateRoom(currentRoomId);
    const activeUser = room.users.get(socket.id);
    if (activeUser && activeUser.isAdmin) {
      updateRoomVideo(currentRoomId, videoId);
      io.to(currentRoomId).emit("room-update", getRoomData(room));
      io.to(currentRoomId).emit("chat-message", {
        sender: "System",
        text: `${currentUsername} changed the video.`
      });
    }
  });

  socket.on("playback-control", ({ isPlaying, currentTime }) => {
    if (!currentRoomId) return;
    const room = getOrCreateRoom(currentRoomId);
    const activeUser = room.users.get(socket.id);
    if (activeUser && activeUser.isAdmin) {
      updateRoomPlayback(currentRoomId, isPlaying, currentTime);
      socket.to(currentRoomId).emit("playback-sync", { isPlaying, currentTime });
      io.to(currentRoomId).emit("room-update", getRoomData(room));
    }
  });

  socket.on("report-status", ({ videoId, isPlaying, currentTime }) => {
    if (!currentRoomId) return;
    const room = getOrCreateRoom(currentRoomId);
    const activeUser = room.users.get(socket.id);
    if (activeUser) {
      let roomTime = room.currentTime;
      if (room.isPlaying) {
        roomTime += (Date.now() - room.lastUpdateTime) / 1000;
      }
      const idMatch = videoId === room.currentVideoId;
      const playMatch = isPlaying === room.isPlaying;
      const timeMatch = Math.abs(currentTime - roomTime) < 3;
      const isSynced = idMatch && (room.isPlaying ? (playMatch && timeMatch) : true);
      activeUser.status = {
        isSynced,
        currentTime
      };
      io.to(currentRoomId).emit("room-update", getRoomData(room));
    }
  });

  socket.on("disconnect", () => {
    if (!currentRoomId) return;
    const result = removeUserFromRoom(currentRoomId, socket.id);
    if (result) {
      const { room } = result;
      io.to(currentRoomId).emit("room-update", getRoomData(room));
      io.to(currentRoomId).emit("chat-message", {
        sender: "System",
        text: `${currentUsername} left the room.`
      });
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
