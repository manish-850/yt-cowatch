import React, { useState, useEffect, useRef } from "react";
import { Send, Users, Shield } from "lucide-react";

export default function Chat({ messages, onSendMessage, roomData }) {
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(text);
    setText("");
  };

  return (
    <div className="chat-container">
      <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--muted-foreground)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
          <Users size={16} />
          <span>Active Viewers ({roomData?.users.length || 0})</span>
        </div>
        <div className="user-list">
          {roomData?.users.map((user) => {
            const isSynced = user.status?.isSynced ?? true;
            return (
              <div key={user.id} className={`user-badge ${user.isAdmin ? "admin" : ""}`}>
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: isSynced ? "#22c55e" : "#ef4444",
                    display: "inline-block"
                  }}
                />
                {user.isAdmin && <Shield size={12} />}
                {user.username}
              </div>
            );
          })}
        </div>
      </div>
      <div className="chat-header">
        <h3>Room Chat</h3>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => {
          const isSystem = msg.sender === "System";
          return (
            <div key={index} className={`message ${isSystem ? "system" : ""}`}>
              {!isSystem && <span className="message-sender">{msg.sender}</span>}
              <span className="message-text">{msg.text}</span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
