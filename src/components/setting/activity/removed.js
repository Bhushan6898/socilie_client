import React from 'react';
import {
        
  Archive,      
  Trash         
} from 'react-bootstrap-icons'; 

function Removed() {
  const items = [
       { icon: <Trash size={20} className="me-3 text-dark" />, label: 'Recently Deleted' },
    { icon: <Archive size={20} className="me-3 text-secondary" />, label: 'Archived' }

  ];

  return (
    <div className="container py-4">
      {/* Heading */}
      <h6 className="text-muted fw-bold mb-3">Removed and archived content</h6>

      
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

export default Removed;
