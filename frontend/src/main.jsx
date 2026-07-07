import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import RoomContext from "./context/RoomContext.jsx";
import PlayerContext from "./context/PlayerContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
      <RoomContext>
        <PlayerContext>
        <App />
        </PlayerContext>
      </RoomContext>
  // </React.StrictMode>
);
