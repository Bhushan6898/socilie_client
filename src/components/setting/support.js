import React from 'react';
import {
  QuestionCircle,
  ShieldLock,
  PersonBadge,
  InfoCircle
} from 'react-bootstrap-icons'; // npm install react-bootstrap-icons

function SupportPage() {
  const items = [
    { icon: <QuestionCircle size={20} className="me-3 text-primary" />, label: 'Help' },
    { icon: <ShieldLock size={20} className="me-3 text-success" />, label: 'Privacy Center' },
    { icon: <PersonBadge size={20} className="me-3 text-warning" />, label: 'Account Status' },
    { icon: <InfoCircle size={20} className="me-3 text-info" />, label: 'About' }
  ];

  return (
    <div className="container py-4">
      {/* Heading */}
      <h6 className="text-muted fw-bold mb-3">More Info and Support</h6>

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

export default SupportPage;
