import { useState, useEffect, useRef, useContext } from "react";
import { Send } from "lucide-react";
import "./chat.css";
import { RoomDataContext } from "../../context/RoomContext";
import { handleSendMessage } from "../../services/socket";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

export default function Chat() {
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  const { messages } = useContext(RoomDataContext);

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
      <div className="chat-messages">
        {messages &&
          messages.map((msg, index) => {
            const isSystem = msg.sender === "System";
            const isSender = msg.sender === localStorage.getItem("username");
            return (
              <div key={index} className={`message ${isSystem ? "system" : isSender ? "sender" : "receiver"}`}> 
                {(!isSystem&&!isSender) && (
                  <span className="message-sender">{msg.sender}</span>
                )}
                  <span className={`message-text`}>
                    {msg.text}
                  </span>
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
