import React from 'react';
import {
  HandThumbsUp, // for Likes
  ChatText,      // for Comments
  Tag,           // for Tags
  EmojiSmile,    // for Sticker Response
  Star           // for Review
} from 'react-bootstrap-icons'; // npm install react-bootstrap-icons

function Interact() {
  const items = [
    { icon: <HandThumbsUp size={20} className="me-3 text-primary" />, label: 'Likes' },
    { icon: <ChatText size={20} className="me-3 text-success" />, label: 'Comments' },
    { icon: <Tag size={20} className="me-3 text-info" />, label: 'Tags' },
    { icon: <EmojiSmile size={20} className="me-3 text-warning" />, label: 'Sticker Response' },
    { icon: <Star size={20} className="me-3 text-danger" />, label: 'Review' }
  ];

  return (
    <div className="container py-4">
      {/* Heading */}
      <h6 className="text-muted fw-bold mb-3">How others can interact with you</h6>

      {/* Feature list */}
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

export default Interact;
