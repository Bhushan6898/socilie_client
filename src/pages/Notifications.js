import React from 'react';
import { useSelector } from 'react-redux';
import {
  BsCheckCircle,
  BsInfoCircle,
  BsExclamationTriangle,
  BsXCircle,
} from 'react-icons/bs';
import SuggestUser from './sugestuserNotification';

// Utility function to group notifications
const groupNotifications = (notifications) => {
  const today = [];
  const yesterday = [];
  const last7Days = [];

  const now = new Date();
  const startOfToday = new Date(now.setHours(0, 0, 0, 0));
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);
  const startOf7DaysAgo = new Date(startOfToday);
  startOf7DaysAgo.setDate(startOf7DaysAgo.getDate() - 6); // includes yesterday and today

  notifications.forEach((note) => {
    const createdAt = new Date(note.createdAt);

    if (createdAt >= startOfToday) {
      today.push(note);
    } else if (createdAt >= startOfYesterday && createdAt < startOfToday) {
      yesterday.push(note);
    } else if (createdAt >= startOf7DaysAgo) {
      last7Days.push(note);
    }
  });

  return { today, yesterday, last7Days };
};

const Notifications = () => {
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

  const renderNotificationList = (notes) =>
    notes.map((note, index) => {
      const { icon, badge } = getTypeStyles(note.type);
      return (
        <div key={index} className="p-3 shadow-sm bg-white rounded-3 w-100">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start">
            <div className="d-flex align-items-start">
              {icon}
              <div>
                <h6 className="mb-1">{note.message}</h6>
                <span className={`badge ${badge}`}>{note.type}</span>
              </div>
            </div>
            <small className="text-muted mt-2 mt-md-0">
              {new Date(note.createdAt).toLocaleString()}
            </small>
          </div>
        </div>
      );
    });

  const { today, yesterday, last7Days } = groupNotifications(notifications || []);

  return (
    <div className="w-100 px-3 px-md-5 py-4">
      <h2 className="mb-4">🔔 Notifications</h2>

      {notifications && notifications.length > 0 ? (
        <>
          {today.length > 0 && (
            <>
              <h5 className="mb-3">📅 Today</h5>
              <div className="d-flex flex-column gap-3 mb-4">
                {renderNotificationList(today)}
              </div>
            </>
          )}

          {yesterday.length > 0 && (
            <>
              <h5 className="mb-3">🕒 Yesterday</h5>
              <div className="d-flex flex-column gap-3 mb-4">
                {renderNotificationList(yesterday)}
              </div>
            </>
          )}

          {last7Days.length > 0 && (
            <>
              <h5 className="mb-3">🗓️ Last 7 Days</h5>
              <div className="d-flex flex-column gap-3 mb-4">
                {renderNotificationList(last7Days)}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="alert alert-info mb-5" role="alert">
          You have no notifications yet.
        </div>
      )}

      <SuggestUser />
    </div>
  );
};

export default Notifications;
