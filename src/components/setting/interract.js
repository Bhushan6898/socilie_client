import React from 'react';
import {
  ChatDots,
  CameraVideo,
  Tag,
  ChatText,
  Share,
  PersonCircle,
  PersonDash,
  SlashCircle,
  PersonPlus
} from 'react-bootstrap-icons'; // npm install react-bootstrap-icons

function OthersInteract() {
  const items = [
    { icon: <ChatDots size={20} className="me-3 text-primary" />, label: 'Messages and Story Replies' },
    { icon: <Tag size={20} className="me-3 text-success" />, label: 'Tags and Mentions' },
    { icon: <ChatText size={20} className="me-3 text-info" />, label: 'Comments' },
    { icon: <Share size={20} className="me-3 text-warning" />, label: 'Sharing and Reuse' },
    { icon: <PersonCircle size={20} className="me-3 text-secondary" />, label: 'Avatar Interactions' },
    { icon: <PersonDash size={20} className="me-3 text-danger" />, label: 'Restricted Accounts' },
    { icon: <SlashCircle size={20} className="me-3 text-dark" />, label: 'Limit Interactions' },
    { icon: <PersonPlus size={20} className="me-3 text-primary" />, label: 'Follow and Invite Friends' }
  ];

  return (
    <div className="container py-4">
      {/* Heading */}
      <h6 className="text-muted fw-bold mb-3">How others can interact with you</h6>

      {/* Feature list without borders */}
      <div>
        {items.map((item, idx) => (
          <div
            key={idx}
            className="d-flex align-items-center py-2"
            style={{ cursor: 'pointer' }}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OthersInteract;
