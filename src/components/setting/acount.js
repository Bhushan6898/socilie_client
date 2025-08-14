import React from 'react';
import { Search, PersonCircle } from 'react-bootstrap-icons'; // npm install react-bootstrap-icons

function YourAccount() {
  return (
    <div className="container py-3">
      {/* Search bar */}
      <div className="mb-3 position-relative">
        <Search
          size={18}
          className="position-absolute top-50 translate-middle-y ms-2 text-muted"
        />
        <input
          type="text"
          placeholder="Search"
          className="form-control ps-5 rounded-pill"
        />
      </div>
      <h6 className="text-muted fw-bold mb-3">Your account</h6>

      {/* Account center */}
      <div className="border rounded p-3 bg-white shadow-sm">
        <h6 className="fw-bold mb-3">Account Center</h6>
          <PersonCircle size={40} className="me-3 text-secondary" />
    
        <div className="text-muted small">
             <span className="carousel-control-next-icon" />
          Password and Security &nbsp;•&nbsp; Personal Details &nbsp;•&nbsp; Preferences
        </div>
      </div>
    </div>
  );
}

export default YourAccount;
