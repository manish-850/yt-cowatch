import { useState, useEffect, useRef, useContext } from "react";
import { Send, UsersRound, Shield } from "lucide-react";
import "./chat.css";
import { RoomDataContext } from "../../context/RoomContext";
import { handleSendMessage } from "../../services/socket";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Chat() {
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  const { roomData, messages } = useContext(RoomDataContext);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    handleSendMessage(text);
    setText("");
  };

  return (
    <div className="chat-container">
      <div
        style={{
          padding: "1rem 1.5rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="active-user-container">
          <UsersRound size={16}/>
          <span>Active Viewers ({roomData?.users.length || 0})</span>
        </div>
        <div className="user-list">
          {roomData?.users.map((user) => {
            const isSynced = user.status?.isSynced ?? true;
            return (
              <Badge
                variant="secondary"
                key={user.id}
              >
                <span
                  className="user"
                  style={{
                    backgroundColor: isSynced ? "#22c55e" : "#ef4444",
                  }}
                />
                {user.isAdmin && <Shield size={12} />}
                {user.username}
              </Badge>
            );
          })}
        </div>
      </div>
      <div className="chat-header">
        <h3>Chat</h3>
      </div>
      <div className="chat-messages">
        {messages &&
          messages.map((msg, index) => {
            const isSystem = msg.sender === "System";
            const isSender = msg.sender === localStorage.getItem("username");
            return (
              <div
                key={index}
                className={`message ${isSystem ? "system" : ""}`}
              >
                {!isSystem && (
                  <span className="message-sender">{msg.sender}</span>
                )}
                <div className={`msg-text-wrapper ${isSender && isSystem ? "sender" : "receiver"}`}>
                  <span
                    className={`message-text`}
                  >
                    {msg.text}
                  </span>
                </div>
              </div>
            );
          })}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="chat-input-form">
        <Input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button type="submit" variant="defaultFlex" size="icon">
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
}
