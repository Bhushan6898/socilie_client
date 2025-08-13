import React from "react";

function MenuModal({ onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "50%",
        left: "50%",
        transform: "translate(-50%, 50%)",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        minWidth: "200px",
        zIndex: 1050,
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "10px",
          borderBottom: "1px solid #ddd",
          cursor: "pointer",
          fontWeight: "bold",
          color: "red",
        }}
        onClick={() => alert("Report")}
      >
        Report
      </div>
      <div
        style={{
          padding: "10px",
          borderBottom: "1px solid #ddd",
          cursor: "pointer",
        }}
        onClick={() => alert("Unfollow")}
      >
        Unfollow
      </div>
      <div
        style={{ padding: "10px", cursor: "pointer" }}
        onClick={onClose}
      >
        Cancel
      </div>
    </div>
  );
}

export default MenuModal;
