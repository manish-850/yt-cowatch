# ytsync

A real-time youtube sync application that lets multiple users to watch youtube videos together with synchronized playback and live chat.

Built with **React**, **Express**, **Socket.IO**, and the **YouTube IFrame API**.

> **Status:** Active Development

> **Acknowledgement:** This project is fork of **yt-cowatch** by GitUtk.

---

# Features

- Real-time synchronized YouTube playback
- Server-authoritative synchronization algorithm
- Automatic playback drift detection and correction
- Play, pause, seek, and video change synchronization
- Create and join rooms instantly
- Admin-controlled playback
- Live room chat
- Automatic room restoration after page refresh
- Persistent user identity using `clientId`
- Username persistence with Local Storage
- Shared room state across all participants
- Responsive UI
- Reusable UI components powered by **shadcn/ui**
- Modular React architecture using custom hooks

---

# Tech Stack

## Frontend

- React
- Vite
- shadcn/ui
- Tailwind CSS v4
- Context API
- Custom Hooks
- Socket.IO Client

## Backend

- Node.js
- Express
- Socket.IO

## Deployment

- **Frontend:** Vercel
- **Backend:** Render

---

# Architecture

```
Admin
   │
   │ playback-control
   ▼
Server (Source of Truth)
   │
   ├── maintains room playback state
   ├── calculates expected playback time
   ├── detects playback drift
   └── sends playback-sync when required
            │
            ▼
Participants
```

The server is responsible for maintaining the authoritative playback state, while clients periodically report their playback status. Participants are only resynchronized when playback drift exceeds the allowed threshold, reducing unnecessary synchronization events.

# How It Works

## Room Creation

- Generate a unique room ID.
- The first participant automatically becomes the room admin.

## Synchronization

ytsync uses a **server-authoritative synchronization model**.

- The room owner (admin) controls playback.
- The server maintains the authoritative playback state.
- Clients periodically report their playback status.
- The server calculates playback drift for every participant.
- Clients exceeding the allowed drift threshold are automatically resynchronized.
- `serverTime` is used to compensate for network latency when calculating the expected playback position.

This approach keeps playback synchronized even under unstable network conditions.

## Automatic Reconnection

After refreshing the page:

- `clientId` is restored from Local Storage.
- Username is restored automatically.
- The user rejoins the existing room.
- Room state is synchronized without creating duplicate users.

---

# Project Structure

```text
ytsync
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── pages
│   │   ├── services
│   │   ├── utils
│   │   └── ui
│   └── public
│
├── backend
│   ├── server.js
│   ├── rooms.js
│   └── package.json
│
└── README.md
```

---

# Improvements Over Original Project

- Completely refactored project architecture
- Modular React component structure
- Extensive use of reusable custom hooks
- Dedicated Socket.IO service layer
- Improved Context API state management
- Automatic room restoration after refresh
- Persistent user identity using `clientId`
- Server-authoritative synchronization algorithm
- Playback drift detection and automatic correction
- Improved synchronization under network latency
- Reusable UI components with shadcn/ui
- Better maintainability and scalability

---

# Getting Started

## Clone the repository

```bash
git clone https://github.com/manish-850/ytsync.git
cd ytsync
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
- Live chat
- Play synchronization
- Pause synchronization
- Seek synchronization
- Video change synchronization
- Server-authoritative synchronization
- Playback drift detection
- Automatic playback correction
- Automatic room restoration
- Persistent user identity
- Responsive UI
- shadcn/ui integration

---

# Roadmap

- Playback buffering indicator
- Video queue / playlist
- Room permissions
- Persistent chat history
- Room expiration
- Mobile UI improvements
- Emoji reactions
- Theme switching

---

# Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/my-feature
```

3. Commit your changes.

```bash
git commit -m "feat: add awesome feature"
```

4. Push the branch.

```bash
git push origin feature/my-feature
```

5. Open a Pull Request.

```bash
git commit -m "feat: add awesome feature"
```

# Credits

Original project: https://github.com/GitUtk/yt-cowatch

This repository continues development with significant architectural improvements, redesigned synchronization logic, reusable UI components, and additional real-time features.

---

# License

This project is licensed under the MIT License.