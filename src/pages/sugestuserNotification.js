import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5'; // X icon
import { useAdmin } from '../hook/admin/useAdmin';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SuggestUser() {
    const { allUsers, getallusers } = useAdmin();
    const [searchTerm, setSearchTerm] = useState('');
    const id = useSelector((state) => state.auth.id);
    const navigate = useNavigate();
    useEffect(() => {
        getallusers();
    }, []);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    console.log(id);

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
        navigate(`/userinfo/${userid}`);
    };
    return (
        <div className="p-3 shadow-sm bg-white rounded-3 mb-5">
            <h6 className="mb-3">✨ Suggested for You</h6>
            <div className="d-flex flex-column gap-4">
                {suggestedUsers.map((user) => (
                    <div
                        key={user.id}
                        className="d-flex justify-content-between align-items-center gap-2 flex-nowrap"
                        
                    >
                        {/* Left: Avatar + Name + Followed by */}
                        <div className="d-flex align-items-start flex-grow-1 overflow-hidden">
                            {/* Avatar */}
                            <img
                                src={user.profilePicture}
                                alt={user.name}
                                className="rounded-circle me-3"
                                style={{ width: '30px', height: '30px', objectFit: 'cover', flexShrink: 0 }}
                                 onClick={() => handleProfileClick(user._id)}
                            />

                            {/* Name + Followed by */}
                            <div className="flex-grow-1 overflow-hidden">
                                <strong className="text-truncate d-block" style={{ maxWidth: '100%' }}>{user.name}</strong>
                                <div className="mt-1" style={{ fontSize: '0.85rem' }}>
                                    <div className="text-muted mb-1">Followed by</div>
                                    <div className="d-flex align-items-center flex-wrap">
                                        {user.followedBy.map((follower, idx) => (
                                            <img
                                                key={idx}
                                                src={follower.profilePic}
                                                alt={follower.name}
                                                title={follower.name}
                                                className="rounded-circle  mb-1"
                                                style={{ width: '20px', height: '20px', objectFit: 'cover' }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Follow + X buttons */}
                        <div className="d-flex align-items-center gap-1 flex-shrink-0">
                            <button className="btn btn-outline-primary btn-sm" style={{ fontSize: '0.75rem', lineHeight: '1' }}>Follow</button>
                            <button
                                className="btn btn-sm btn-light p-1"
                                title="Remove"
                                onClick={() => handleRemoveSuggestion(user.id)}
                            >
                                <IoClose size={18} />
                            </button>
                        </div>
                    </div>
                ))}


                {suggestedUsers.length === 0 && (
                    <div className="text-muted">No suggestions available.</div>
                )}
            </div>
        </div>

    );
}

export default SuggestUser;
