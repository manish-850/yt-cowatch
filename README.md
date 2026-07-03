# YouTube Co-Watch

A real-time YouTube watch party application built with **React**, **Node.js**, **Express**, **Socket.IO**, and the **YouTube IFrame API**.

> **Acknowledgement**
> This project is based on the open-source project **yt-cowatch** by GitUtk and has been extensively refactored with a new architecture and ongoing feature improvements.

## Features

- Real-time synchronized YouTube playback
- Multi-user watch rooms
- Live chat
- Shared room synchronization
- Responsive interface

## Tech Stack

**Frontend**
- React
- Vite
- Context API
- Socket.IO Client

**Backend**
- Node.js
- Express
- Socket.IO

## Folder Structure

```text
src/
├── components/
├── context/
├── hooks/
├── services/
├── utils/
└── assets/
```

## Improvements

- Modular component architecture
- Custom React hooks
- Dedicated socket service
- Better separation of concerns
- Cleaner state management
- Improved maintainability

## Getting Started

```bash
git clone https://github.com/manish-850/yt-cowatch.git
cd yt-cowatch
cd frontend
npm install
npm run dev
```

Start backend:

```bash
cd backend
npm install
npm start
```

## Roadmap

- Authentication
- Video queue
- Room permissions
- Persistent chat
- Theme support
- Docker
- Tests

## Credits

Original project:
https://github.com/GitUtk/yt-cowatch

This repository continues development with significant architectural improvements and additional features.