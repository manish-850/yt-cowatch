import { useState } from "react";
import { Video } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { socket } from "../../services/socket";

function extractVideoId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*$/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : url;
}

export default function RoomControls() {
  const [videoInput, setVideoInput] = useState("");

const handleChangeVideo = (videoId) => {
    if (socket) {
      socket.emit("change-video", { videoId });
    }
  };


  const handleVideoSubmit = (e) => {
    e.preventDefault();
    if (!videoInput.trim()) return;
    const id = extractVideoId(videoInput);
    if (id) {
      handleChangeVideo(id);
      setVideoInput("");
    }
  };

  return (
    <div className="load-video-container">
      <form onSubmit={handleVideoSubmit} className="url-input-group">
        <Input
          type="text"
          placeholder="Paste url or id"
          value={videoInput}
          onChange={(e) => setVideoInput(e.target.value)}
        />
        <Button type="submit" variant="default" size="icon">
          <Video size={18} />
        </Button>
      </form>
    </div>
  );
}
