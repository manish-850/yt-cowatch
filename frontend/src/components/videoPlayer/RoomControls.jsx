import React, { useState } from "react";
import { Video } from "lucide-react";

function extractVideoId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : url;
}

export default function RoomControls({ onChangeVideo }) {
  const [videoInput, setVideoInput] = useState("");

  const handleVideoSubmit = (e) => {
    e.preventDefault();
    if (!videoInput.trim()) return;
    const id = extractVideoId(videoInput);
    if (id) {
      onChangeVideo(id);
      setVideoInput("");
    }
  };

  return (
    <div className="controls-card">
      <form onSubmit={handleVideoSubmit} className="url-input-group">
        <input
          type="text"
          placeholder="Paste YouTube Video ID or URL"
          value={videoInput}
          onChange={(e) => setVideoInput(e.target.value)}
        />
        <button type="submit" className="btn-secondary">
          <Video size={18} />
        </button>
      </form>
    </div>
  );
}
