import React, { useState } from 'react';
import {
  Lock,
  People,
  Share,
  PersonX,
  EyeSlash,
  CameraVideo
} from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Image } from 'react-bootstrap';

// Dummy users for Close Friends
const dummyUsers = [
  { id: 1, name: 'John Doe', avatar: 'https://i.pravatar.cc/40?img=1' },
  { id: 2, name: 'Jane Smith', avatar: 'https://i.pravatar.cc/40?img=2' },
  { id: 3, name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/40?img=3' },
  { id: 4, name: 'Emily Brown', avatar: 'https://i.pravatar.cc/40?img=4' }
];

function YourContent() {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [isPrivateAccount, setIsPrivateAccount] = useState(false);

  const [showCloseFriendsModal, setShowCloseFriendsModal] = useState(false);
  const [closeFriends, setCloseFriends] = useState([]);

  const handleTogglePrivacy = () => {
    setIsPrivateAccount(!isPrivateAccount);
  };

  const handleCloseFriendToggle = (userId) => {
    setCloseFriends((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const items = [
    {
      icon: <Lock size={20} className="me-3 text-primary" />,
      label: 'Account Privacy',
      onClick: () => setShowPrivacyModal(true)
    },
    {
      icon: <People size={20} className="me-3 text-success" />,
      label: 'Close Friends',
      onClick: () => setShowCloseFriendsModal(true)
    },
    { icon: <Share size={20} className="me-3 text-info" />, label: 'Crossposting' },
    { icon: <PersonX size={20} className="me-3 text-danger" />, label: 'Blocked' },
    { icon: <EyeSlash size={20} className="me-3 text-warning" />, label: 'Hide Story' },
    { icon: <CameraVideo size={20} className="me-3 text-secondary" />, label: 'Alive' }
  ];

  return (
    <div className="container py-4">
      <h6 className="text-muted fw-bold mb-3">Who can see your content</h6>

      <div className="list-group">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="d-flex align-items-center py-2"
            style={{ cursor: item.onClick ? 'pointer' : 'default' }}
            onClick={item.onClick}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Privacy Modal */}
      <Modal show={showPrivacyModal} onHide={() => setShowPrivacyModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Account Privacy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Check
              type="switch"
              id="private-account-switch"
              label="Make account private"
              checked={isPrivateAccount}
              onChange={handleTogglePrivacy}
            />
            <p className="text-muted mt-2" style={{ fontSize: '0.9rem' }}>
              If your account is private, only people you approve can see your photos and videos.
            </p>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Close Friends Modal */}
      <Modal show={showCloseFriendsModal} onHide={() => setShowCloseFriendsModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Close Friends</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {dummyUsers.map((user) => (
            <div
              key={user.id}
              className="d-flex justify-content-between align-items-center mb-3"
            >
              {/* Left: Avatar + Name + Username */}
              <div className="d-flex align-items-center">
                <Image
                  src={user.avatar}
                  roundedCircle
                  width={40}
                  height={40}
                  className="me-3"
                />
                <div>
                  <div className="fw-semibold">{user.name}</div>
                  <div className="text-muted small">bhushan patil</div>
                </div>
              </div>

              {/* Right: Checkbox */}
              <Form.Check
                type="checkbox"
                id={`close-friend-${user.id}`}
                checked={closeFriends.includes(user.id)}
                onChange={() => handleCloseFriendToggle(user.id)}
              />
            </div>
          ))}
        </Modal.Body>


        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setShowCloseFriendsModal(false);

            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default YourContent;
