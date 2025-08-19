import React, { useEffect, useState } from 'react';
import { useAdmin } from '../hook/admin/useAdmin';
import { useNavigate } from 'react-router-dom';
import profilpicture from '../asset/profile.png';
function SearchBarPage() {
  const { allUsers, getallusers } = useAdmin();
  const [searchTerm, setSearchTerm] = useState(''); 
  const navigate = useNavigate();
  useEffect(() => {
    getallusers();
  }, []);

  const filteredUsers = allUsers.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const handleProfileClick = (userid) => {
     navigate(`/userinfo/${userid}`);
 
  };

  return (
    <div className="container py-4">
      <h2>Search</h2>
      <input
        className="form-control mb-3"
        type="search"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {searchTerm && (
        <div className="list-group">
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <div
                key={user._id}
                className="list-group-item list-group-item-action d-flex align-items-center"
                  onClick={() => handleProfileClick(user._id)}
              >
                <img
                  src={user.profilePicture||profilpicture}
                  alt={user.username}
                  className="rounded-circle me-3"
                  style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                />
                <div>
                  <div className="fw-bold">{user.name}</div>
                  <div className="text-muted">@{user.username}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-muted px-2">No users found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBarPage;
