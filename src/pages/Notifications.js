import React from 'react';
import { useSelector } from 'react-redux';
import { BsCheckCircle, BsInfoCircle, BsExclamationTriangle, BsXCircle } from 'react-icons/bs';

function Notifications() {
  const notifications = useSelector((state) => state.auth.notificationdata);
 

 
  const getTypeStyles = (type) => {
    switch (type) {
      case 'success':
        return { icon: <BsCheckCircle className="text-success me-2" />, badge: 'bg-success' };
      case 'error':
        return { icon: <BsXCircle className="text-danger me-2" />, badge: 'bg-danger' };
      case 'warning':
        return { icon: <BsExclamationTriangle className="text-warning me-2" />, badge: 'bg-warning text-dark' };
      default:
        return { icon: <BsInfoCircle className="text-info me-2" />, badge: 'bg-info text-dark' };
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">🔔 Notifications</h2>

      {notifications && notifications.length > 0 ? (
        <div className="d-flex flex-column gap-3">
          {notifications.map((note, index) => {
            const { icon, badge } = getTypeStyles(note.type);

            return (
              <div key={index} className="card shadow-sm border-0">
                <div className="card-body d-flex justify-content-between align-items-start">
                  <div className="d-flex align-items-start">
                    {icon}
                    <div>
                      <h6 className="mb-1">{note.message}</h6>
                      <span className={`badge ${badge}`}>{note.type}</span>
                    </div>
                  </div>
                  <small className="text-muted">{new Date(note.createdAt).toLocaleString()}</small>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="alert alert-info" role="alert">
          You have no notifications yet.
        </div>
      )}
    </div>
  );
}

export default Notifications;
