import './form.css';


const Form = () => {
  return (
    <div className="join-container">
      <form 
    //   onSubmit={handleJoin} 
      className="card">
        <h1>YouTube Co-Watch</h1>
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            required
            // value={username}
            // onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div className="input-group">
          <label>Room ID</label>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
              type="text"
              required
            //   value={roomId}
            //   onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter Room ID"
              style={{ flex: 1 }}
            />
            <button
              type="button"
              //   onClick={handleCreateRoom}
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
