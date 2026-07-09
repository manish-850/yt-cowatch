# ytsync

A real-time YouTube watch party application that lets multiple users watch YouTube videos together with synchronized playback and live chat.

Built with **React**, **Express**, **Socket.IO**, and the **YouTube IFrame API**.

> **Status:** Active Development

> **Acknowledgement**
>
> This project is fork of **yt-cowatch** by GitUtk. It has been extensively refactored with a redesigned architecture, reusable UI components, improved synchronization logic, and ongoing feature development.
> This project is fork of **yt-cowatch** by GitUtk. It has been extensively refactored with a redesigned architecture, reusable UI components, improved synchronization logic, and ongoing feature development.

---

# Features

- Real-time synchronized YouTube playback
- Create and join rooms instantly
- Create and join rooms instantly
- Admin-controlled playback
- Live chat
- Automatic room restoration after page refresh
- Live chat
- Automatic room restoration after page refresh
- Persistent user identity using `clientId`
- Username persistence with Local Storage
- Username persistence with Local Storage
- Shared room state across all participants
- Responsive UI
- Reusable UI components powered by **shadcn/ui**
- Modular React architecture using custom hooks
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
- **Backend:** Railway

## Deployment

- **Frontend:** Vercel
- **Backend:** Railway

---

# How It Works

## Room Creation
## Room Creation

- Generate a unique room ID.
- The first participant automatically becomes the room admin.
- Generate a unique room ID.
- The first participant automatically becomes the room admin.

## Synchronization
## Synchronization

The admin controls:

- Play
- Pause
- Seek
- Change video
- Change video

Every connected participant stays synchronized through Socket.IO events.
Every connected participant stays synchronized through Socket.IO events.

## Automatic Reconnection
## Automatic Reconnection

After refreshing the page:
After refreshing the page:

- `clientId` is restored from Local Storage.
- Username is restored automatically.
- The user rejoins the existing room.
- Room state is synchronized without creating duplicate users.
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
│   ├── server.js
│   ├── rooms.js
│   └── package.json
│
└── README.md
```

---

# Improvements Over Original Project

- Refactored project architecture
- Refactored project architecture
- Modular component structure
- Custom React hooks
- Dedicated Socket.IO service layer
- Improved Context API state management
- Dedicated Socket.IO service layer
- Improved Context API state management
- Automatic room restoration after refresh
- Persistent user identity with `clientId`
- Cleaner synchronization logic
- Reusable UI components with shadcn/ui
- Cleaner synchronization logic
- Reusable UI components with shadcn/ui
- Better maintainability and scalability

---

# Getting Started

## Clone the repository
## Clone the repository

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
- Play/Pause synchronization
- Play/Pause synchronization
- Seek synchronization
- Change video synchronization
- Change video synchronization
- Live chat
- Automatic room restoration
- Automatic room restoration
- Persistent user identity
- Responsive UI
- shadcn/ui integration
- Responsive UI
- shadcn/ui integration

---

# Roadmap

- Video queue / playlist
- Room permissions
- Persistent chat history
- Room expiration
- Mobile UI improvements
- Authentication
- Invite links
- Emoji reactions
- Theme switching
- Authentication
- Invite links
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

4. Push the branch.

```bash
git push origin feature/my-feature
```

5. Open a Pull Request.

---

# Credits

Original project: https://github.com/GitUtk/yt-cowatch
Original project: https://github.com/GitUtk/yt-cowatch

This repository continues development with significant architectural improvements, redesigned synchronization logic, reusable UI components, and additional real-time features.
This repository continues development with significant architectural improvements, redesigned synchronization logic, reusable UI components, and additional real-time features.

---

# License

This project is licensed under the MIT License.