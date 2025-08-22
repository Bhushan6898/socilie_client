import React from 'react';
import {
        
  Archive,      
  BookmarkStar,      
  CameraVideo,      
  Images,      
  Trash         
} from 'react-bootstrap-icons'; 

function Content() {
  const items = [
      { icon: <Images size={20} className="me-3 text-primary" />, label: 'Posts' },
    { icon: <CameraVideo size={20} className="me-3 text-danger" />, label: 'Reels' },
    { icon: <BookmarkStar size={20} className="me-3 text-warning" />, label: 'Highlights' }

  ];

  return (
    <div className="container py-4">
      {/* Heading */}
      <h6 className="text-muted fw-bold mb-3"> Content and Shared</h6>

      
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

export default Content;
