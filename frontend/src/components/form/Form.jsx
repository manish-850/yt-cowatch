import "./form.css";
import { useContext } from "react";
import { RoomDataContext } from "../../context/RoomContext";
import { generateRoomId } from "../../utils/roomId";

const Form = () => {
  const {
    roomId,
    setRoomId,
    setIsJoined,
    username,
    setUsername,
    setIsLoading,
  } = useContext(RoomDataContext);

  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim()) localStorage.setItem("username", username);
    if (roomId.trim()) {
      setIsLoading(true);
      setIsJoined(true);
    }
  };

  const handleCreateRoom = () => {
    const randomId = generateRoomId();
    setRoomId(randomId);
  };

  return (
    <div className="join-container">
      <form onSubmit={handleJoin} className="card">
        <h1>Join Room</h1>
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter name (optional)"
          />
        </div>
        <div className="input-group">
          <label>Room ID</label>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
              type="text"
              required
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Room ID"
              style={{ flex: 1 }}
            />
            <button
              type="button"
              onClick={handleCreateRoom}
              className="btn-secondary"
            >
              Generate
            </button>
          </div>
        </div>
        <button type="submit">Join Room</button>
      </form>
    </div>
  );
};

export default Form;
