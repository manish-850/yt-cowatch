import { useState } from "react";
import { Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { socket } from "../../services/socket";
import useRoom from "@/hooks/room/useRoom";

export default function RoomControls() {
  const [videoUrl, setVideoUrl] = useState("");
  const { setVideoId } = useRoom();

  const extractVideoId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*$/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : url;
  };

  const handleChangeVideo = (videoId) => {
    if (socket) {
      socket.emit("change-video", { videoId });
    }
  };

  const handleVideoSubmit = (e) => {
    e.preventDefault();
    if (!videoUrl.trim()) return;
    const id = extractVideoId(videoUrl);
    setVideoId(id);
    if (id) {
      handleChangeVideo(id);
      setVideoUrl("");
    }
  };

  return (
    <div className="load-video-container">
      <form onSubmit={handleVideoSubmit} className="url-input-group">
        <Input
          type="text"
          placeholder="Paste url or id"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <Button type="submit" variant="default" size="icon">
          <Video size={18} />
        </Button>
      </form>
    </div>
  );
}
