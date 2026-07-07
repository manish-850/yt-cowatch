import "./form.css";
import { useContext } from "react";
import { RoomDataContext } from "../../context/roomContext";
import { generateRoomId } from "../../utils/roomId";
import { generateName } from "../../utils/username";

const Form = () => {
  const { roomId, setRoomId, setIsJoined, username, setUsername, isLoading, setIsLoading } = useContext(RoomDataContext);

  const handleJoin = (e) => {
    e.preventDefault();
    // const generatedUsername = generateName();
    // setUsername(generatedUsername);
    if (roomId.trim() && username.trim()) {
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
          {/* <label>Username</label> */}
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div className="input-group">
          {/* <label>Room ID</label> */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
              // disabled={true}
              type="text"
              required
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Room ID"
              style={{ flex: 1 , border:"none"}}
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
