import React from 'react';
import {
  ClockHistory,     // Time Spent
  PersonLinesFill,  // Accounts History
  Search,           // Recent Searches
  Link45deg         // Link History
} from 'react-bootstrap-icons';

function UseSocilite() {
  const items = [
    { icon: <ClockHistory size={20} className="me-3 text-primary" />, label: 'Time Spent' },
    { icon: <PersonLinesFill size={20} className="me-3 text-success" />, label: 'Accounts History' },
    { icon: <Search size={20} className="me-3 text-info" />, label: 'Recent Searches' },
    { icon: <Link45deg size={20} className="me-3 text-warning" />, label: 'Link History' }
  ];

  return (
    <div className="container py-4">
      {/* Heading */}
      <h6 className="text-muted fw-bold mb-3">How you use Socilite</h6>

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

export default UseSocilite;
