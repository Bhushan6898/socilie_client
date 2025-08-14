import React from 'react';
import {
  Phone,
  CloudArrowDown,
  Eye,
  Translate,
  Wifi,
} from 'react-bootstrap-icons'; // npm install react-bootstrap-icons

function AppMediaSettings() {
  const items = [
    { icon: <Phone size={20} className="me-3 text-primary" />, label: 'Device Permissions' },
    { icon: <CloudArrowDown size={20} className="me-3 text-success" />, label: 'Archiving and Downloading' },
    { icon: <Eye size={20} className="me-3 text-info" />, label: 'Accessibility' },
    { icon: <Translate size={20} className="me-3 text-warning" />, label: 'Language and Translations' },
    { icon: <Wifi size={20} className="me-3 text-danger" />, label: 'Data Usage and Media Quality' }
  ];

  return (
    <div className="container py-4">
      {/* Heading */}
      <h6 className="text-muted fw-bold mb-3">App and Media</h6>

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

export default AppMediaSettings;
