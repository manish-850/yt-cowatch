import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import RoomContext from "./context/RoomContext.jsx";
import PlayerContext from "./context/PlayerContext.jsx";
import SocketContext from "./context/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RoomContext>
        <SocketContext>
        <PlayerContext>
        <App />
        </PlayerContext>
        </SocketContext>
      </RoomContext>
  </React.StrictMode>
);
