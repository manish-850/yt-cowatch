const rooms = new Map();

export function getOrCreateRoom(roomId) {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, {
      id: roomId,
      users: new Map(),
      currentVideoId: "dQw4w9WgXcQ",
      currentTime: 0,
      isPlaying: false,
      serverTime: Date.now(),
    });
  }
  return rooms.get(roomId);
}

export function deleteRoomIfEmpty(roomId) {
  const room = rooms.get(roomId);
  if (room && room.users.size === 0) {
    rooms.delete(roomId);
  }
}

export function addUserToRoom(roomId, socketId, username, clientId) {
  const room = getOrCreateRoom(roomId);
  const isAdmin = room.users.size === 0;
  let user = room.users.get(clientId);
  if (user) {
    user.id = socketId;
    user.username = username;
  } else {
    room.users.set(clientId, { id: socketId, username, isAdmin, clientId });
  }
  return { room, user };
}

export function removeUserFromRoom(roomId, clientId) {
  const room = rooms.get(roomId);
  if (!room) return null;
  const user = room.users.get(clientId);
  room.users.delete(clientId);

  if (user && room.users.size > 0 && user.isAdmin) {
    const nextUserId = room.users.keys().next().value;
    const nextUser = room.users.get(nextUserId);
    nextUser.isAdmin = true;
  }

  deleteRoomIfEmpty(roomId);
  return { room, user };
}

export function getRoomData(room) {
  if (!room) return null;
  return {
    id: room.id,
    users: Array.from(room.users.values()).map((user) => ({
      id: user.clientId,
      username: user.username,
      isAdmin: user.isAdmin,
      clientId: user.clientId,
      status: user.status || { isSynced: true, currentTime: room.currentTime }, // currentTime = 0 ---> room.currentTime
    })),
    currentVideoId: room.currentVideoId,
    currentTime: room.currentTime,
    isPlaying: room.isPlaying,
  };
}

export function updateRoomVideo(roomId, videoId) {
  const room = rooms.get(roomId);
  if (!room) return null;
  room.currentVideoId = videoId;
  room.currentTime = 0;
  room.isPlaying = false;
  room.serverTime = Date.now();
  return room;
}

export function updateRoomPlayback(roomId, isPlaying, currentTime, clientTime) {
  const room = rooms.get(roomId);
  const delay = (Date.now() - clientTime) / 1000;
  if (!room) return null;
  room.isPlaying = isPlaying;
  room.currentTime = currentTime + delay;
  room.serverTime = Date.now();
  return room;
}
