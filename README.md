# YouTube Co-Watch

A real-time YouTube watch party application built with **React**, **Node.js**, **Express**, **Socket.IO**, and the **YouTube IFrame API**.

> **Status:** Active Development

> **Acknowledgement**
>
> This project is based on the open-source project **yt-cowatch** by GitUtk and is being actively refactored with a redesigned architecture, improved state management, and additional real-time features.

---

# Features

- Real-time synchronized YouTube playback
- Create and join watch rooms instantly
- Admin-controlled playback
- Live room synchronization using Socket.IO
- Automatic room reconnection after page refresh
- Persistent user identity using `clientId`
- Live chat
- Responsive interface
- Modular React architecture
- Shared room state across all participants

---

# Tech Stack

## Frontend

- React
- Vite
- Context API
- Custom Hooks
- Socket.IO Client

## Backend

- Node.js
- Express
- Socket.IO

---

# How It Works

### Room Creation

- A unique room ID is generated.
- The first user automatically becomes the room admin.

### Synchronization

The admin controls:

- Play
- Pause
- Seek
- Change Video

All viewers stay synchronized through Socket.IO events.

### Automatic Reconnection

When a participant refreshes the page:

- `clientId` is restored from Local Storage.
- Username is restored automatically.
- The user rejoins the same room.
- Room state is synchronized without creating a duplicate user.

---

# Project Structure

```text
yt-cowatch
│
├── frontend
│   ├── components
│   ├── context
│   ├── hooks
│   ├── pages
│   ├── services
│   ├── utils
│
├── backend
│   ├── routes
│   ├── socket
│   ├── managers
│   ├── utils
│   └── server.js
│
└── README.md
```

---

# Improvements Over Original Project

- Refactored application architecture
- Modular component structure
- Custom React hooks
- Dedicated Socket service layer
- Improved state management using Context API
- Cleaner separation of concerns
- Automatic room restoration after refresh
- Persistent user identity with `clientId`
- Better maintainability and scalability

---

# Getting Started

Clone the repository

```bash
git clone https://github.com/manish-850/yt-cowatch.git
cd yt-cowatch
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Backend

```bash
cd backend
npm install
npm start
```

---

# Current Progress

- Room creation
- Join room
- Live synchronization
- Play/Pause sync
- Seek synchronization
- Change video
- Live chat
- Automatic reconnect after refresh
- Persistent user identity

---

# Roadmap

- Video queue / playlist
- Room permissions
- Persistent chat history
- Room expiration
- Mobile UI improvements


---

# Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a Pull Request.

---

# Credits

Original project : https://github.com/GitUtk/yt-cowatch

This repository continues development with significant architectural improvements, a redesigned synchronization system, and additional real-time features.

---

# License

This project is licensed under the MIT License.