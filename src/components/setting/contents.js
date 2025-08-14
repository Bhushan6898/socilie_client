import React from 'react';
import {
  Lock,
  People,
  Share,
  PersonX,
  EyeSlash,
  CameraVideo
} from 'react-bootstrap-icons'; // npm install react-bootstrap-icons

function YourContent() {
  const items = [
    { icon: <Lock size={20} className="me-3 text-primary" />, label: 'Account Privacy' },
    { icon: <People size={20} className="me-3 text-success" />, label: 'Close Friends' },
    { icon: <Share size={20} className="me-3 text-info" />, label: 'Crossposting' },
    { icon: <PersonX size={20} className="me-3 text-danger" />, label: 'Blocked' },
    { icon: <EyeSlash size={20} className="me-3 text-warning" />, label: 'Hide Story' },
    { icon: <CameraVideo size={20} className="me-3 text-secondary" />, label: 'Alive' }
  ];

  return (
    <div className="container py-4">
      {/* Heading */}
      <h6 className="text-muted fw-bold mb-3">Who can see your content</h6>

      {/* Feature list */}
      <div className="list-group">
        {items.map((item, idx) => (
          <div
            key={idx}
            className=" d-flex align-items-center py-2"
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

export default YourContent;
