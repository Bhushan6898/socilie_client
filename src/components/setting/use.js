import React from 'react';
import {
  Bookmark,
  Archive,
  ClockHistory,
  Bell,
  HourglassSplit
} from 'react-bootstrap-icons'; // npm install react-bootstrap-icons
import { useNavigate } from 'react-router-dom';

function UserSocialite() {
    const navigate = useNavigate();
  const items = [
    { icon: <Bookmark size={20} className="me-3 text-primary" />, label: 'Saved' },
    { icon: <Archive size={20} className="me-3 text-success" />, label: 'Archive' },
    { icon: <ClockHistory size={20} className="me-3 text-info"  onClick={() => navigate('/activity')} />, label: 'Your Activity' },
    { icon: <Bell size={20} className="me-3 text-warning" />, label: 'Notifications' },
    { icon: <HourglassSplit size={20} className="me-3 text-danger" />, label: 'Time Management' }
  ];

  return (
    <div className="container py-4">
      {/* Heading */}
      <h6 className="text-muted fw-bold mb-3">How to use Socialite</h6>

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

export default UserSocialite;
