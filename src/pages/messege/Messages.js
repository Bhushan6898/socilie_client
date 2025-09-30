import React, { useState } from "react";
import ChatBox from "./chatbox";

const MessagesPage = () => {
  const highlights = [
    { id: 1, img: "https://res.cloudinary.com/dl35wuxhn/image/upload/v1757006094/socilite-user/product_af4563692ae0e6551d6ee0948ba50498db48b869d584ad651331388e4477a326.jpg" },
    { id: 2, img: "https://res.cloudinary.com/dl35wuxhn/image/upload/v1756469770/socilite-user/product_195f28ea6d7618815fa7870a2829a5a8fc3663a73b1dc4cf7989505753c1f167.jpg" },
    { id: 3, img: "https://res.cloudinary.com/dl35wuxhn/image/upload/v1754468104/socilite-user/product_e2ce44f5503387abc81e0bfb5c29c6bb7b2a5ef6a22324c33f8004cf729cb4bf.jpg" },
  ];

  const messages = [
    { id: 1, name: "Bhushan", username: "aarav_21", img: "https://res.cloudinary.com/dl35wuxhn/image/upload/v1757006094/socilite-user/product_af4563692ae0e6551d6ee0948ba50498db48b869d584ad651331388e4477a326.jpg", lastMessage: "Hey! How are you?", time: "2h" },
    { id: 2, name: "Ram", username: "ananya_01", img: "https://res.cloudinary.com/dl35wuxhn/image/upload/v1756469770/socilite-user/product_195f28ea6d7618815fa7870a2829a5a8fc3663a73b1dc4cf7989505753c1f167.jpg", lastMessage: "Did you see that photo?", time: "1d" },
    { id: 3, name: "Rohan", username: "rohan_77", img: "https://res.cloudinary.com/dl35wuxhn/image/upload/v1754468104/socilite-user/product_e2ce44f5503387abc81e0bfb5c29c6bb7b2a5ef6a22324c33f8004cf729cb4bf.jpg", lastMessage: "Let’s catch up tomorrow.", time: "3d" },
  ];

  const [activeChat, setActiveChat] = useState(null);

  return (
    <div className="container py-3" style={{ paddingBottom: "80px" }}>
      {!activeChat && (
        <>
          <h4 className="mb-3">Messages</h4>

          {/* Story Highlights */}
          <div className="d-flex overflow-auto mb-3 py-2">
            {highlights.map((h) => (
              <div key={h.id} className="text-center me-3">
                <div className="rounded-circle border border-2 overflow-hidden" style={{ width: "70px", height: "70px", cursor: "pointer" }}>
                  <img src={h.img} alt="highlight" className="w-100 h-100" style={{ objectFit: "cover" }} />
                </div>
              </div>
            ))}
          </div>

          {/* Messages List */}
          <div className="list-group mb-3">
            {messages.map((msg) => (
              <button
                key={msg.id}
                className="list-group-item list-group-item-action d-flex align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() => setActiveChat(msg)}
              >
                <img
                  src={msg.img}
                  alt={msg.name}
                  className="rounded-circle me-3 flex-shrink-0"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <strong className="text-truncate" style={{ maxWidth: "60vw" }}>
                      {msg.name}
                    </strong>
                    <small className="text-muted ms-1">{msg.time}</small>
                  </div>
                  <div className="text-truncate" style={{ maxWidth: "90%" }}>
                    {msg.lastMessage}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Show ChatBox only when activeChat is set */}
      {activeChat && <ChatBox user={activeChat} onBack={() => setActiveChat(null)} />}
    </div>
  );
};

export default MessagesPage;
