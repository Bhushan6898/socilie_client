import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5'; // X icon
import { useAdmin } from '../hook/admin/useAdmin';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function  SuggestUserHomepage() {
    const { allUsers, getallusers } = useAdmin();
    const id = useSelector((state) => state.auth.id);
    const navigate = useNavigate();
    useEffect(() => {
        getallusers();
    }, []);
    const [suggestedUsers, setSuggestedUsers] = useState([]);


  useEffect(() => {
    if (allUsers && id) {
      const filteredUsers = allUsers
        .filter((user) => user._id !== id)
        .map((user) => ({
          ...user,
          followedBy: [
            // Dummy "followed by" data
            { name: 'Dummy1', profilePic: 'https://randomuser.me/api/portraits/men/10.jpg' },
            { name: 'Dummy2', profilePic: 'https://randomuser.me/api/portraits/women/11.jpg' },
          ],
        }));
      setSuggestedUsers(filteredUsers);
    }
  }, [allUsers, id]);
    // Remove suggested user by ID
    const handleRemoveSuggestion = (id) => {
        setSuggestedUsers(prev => prev.filter(user => user.id !== id));
    };

      const handleProfileClick = (userid) => {
    navigate(`userinfo/${userid}`);
  };

    return (

<div className="p-3 shadow-sm bg-white rounded-3 mb-4">
  <h6 className="mb-3">✨ Suggested for You</h6>

  {/* Horizontal scroll container */}
  <div className="d-flex flex-row gap-3 overflow-auto" style={{ whiteSpace: 'nowrap' }}>
    {suggestedUsers.map((user) => (
      <div
        key={user._id}
        className="d-flex flex-column align-items-center text-center p-2 border rounded"
        style={{ minWidth: '120px', maxWidth: '130px', flex: '0 0 auto' }}
         onClick={() => handleProfileClick(user._id)}
      >
        {/* Avatar */}
        <img
          src={user.profilePicture}
          alt={user.name}
          className="rounded-circle mb-2"
          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
        />

        {/* Name */}
        <strong
          className="text-truncate mb-1"
          style={{ fontSize: '0.85rem', maxWidth: '100%' }}
        >
          {user.name}
        </strong>

        {/* Follow Button */}
        <button
          className="btn btn-outline-primary btn-sm w-100"
          style={{ fontSize: '0.7rem', padding: '2px 6px' }}
        >
          Follow
        </button>

        {/* Remove Button */}
        <button
          className="btn btn-sm text-muted mt-1 p-0"
          onClick={() => handleRemoveSuggestion(user._id)}
          style={{ fontSize: '0.8rem' }}
        >
          <IoClose />
        </button>
      </div>
    ))}

    {suggestedUsers.length === 0 && (
      <div className="text-muted">No suggestions available.</div>
    )}
  </div>
</div>

    );
}

export default SuggestUserHomepage;
