import React, { useState, useRef, useEffect } from "react";

const ChatBox = ({ user, onBack }) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "them", text: `Hi, I'm ${user.name}` },
    { id: 2, sender: "me", text: "Hello! How are you?" },
  ]);
  const [newMsg, setNewMsg] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMsg.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: "me", text: newMsg }]);
    setNewMsg("");
  };

  return (
    <div className="border rounded p-2" style={{ height: "73vh", display: "flex", flexDirection: "column" }}>
      {/* Chat Header */}
      <div className="d-flex align-items-center mb-2 border-bottom pb-2">
        <button className="btn btn-link me-2" onClick={onBack}>
          &larr;
        </button>
        <img
          src={user.img}
          alt={user.name}
          className="rounded-circle me-2"
          style={{ width: "40px", height: "40px", objectFit: "cover" }}
        />
        <strong>{user.name}</strong>
      </div>

      {/* Messages */}
      <div style={{ overflowY: "auto", flexGrow: 1 }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`d-flex mb-2 ${msg.sender === "me" ? "justify-content-end" : "justify-content-start"}`}
          >
            <div
              className={`p-2 rounded ${msg.sender === "me" ? "bg-primary text-white" : "bg-light"}`}
              style={{ maxWidth: "70%" }}
              ref={scrollRef}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="d-flex mt-2">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Message..."
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="btn btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
