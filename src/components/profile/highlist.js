import React, { useState } from "react";

const ProfileHighlights = () => {
  const highlights = [
    { id: 1, title: "Travel", type: "image", url: "https://via.placeholder.com/400x600.png?text=Travel" },
    { id: 2, title: "Food", type: "image", url: "https://via.placeholder.com/400x600.png?text=Food" },
    { id: 3, title: "Work", type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { id: 4, title: "Pets", type: "image", url: "https://via.placeholder.com/400x600.png?text=Pets" },
    { id: 5, title: "Music", type: "video", url: "https://www.w3schools.com/html/movie.mp4" },
    { id: 6, title: "Friends", type: "image", url: "https://via.placeholder.com/400x600.png?text=Friends" },
  ];

  const [activeHighlight, setActiveHighlight] = useState(null);

  return (
    <>
      {/* Highlights Row */}
      <div className="d-flex align-items-center overflow-auto py-3">
        {/* Add New Highlight */}
        <div className="text-center mx-2">
          <div
            className="rounded-circle border border-2 d-flex justify-content-center align-items-center"
            style={{ width: "70px", height: "70px", backgroundColor: "#f8f9fa", cursor: "pointer" }}
          >
            <i className="fas fa-plus fa-lg text-secondary"></i>
          </div>
          <small className="d-block mt-1 text-muted">New</small>
        </div>

        {/* Dummy Highlights */}
        {highlights.map((h, index) => (
          <div
            key={h.id}
            className="text-center mx-2"
            onClick={() => setActiveHighlight(index)}
          >
            <div
              className="rounded-circle border border-2 overflow-hidden"
              style={{ width: "70px", height: "70px", cursor: "pointer" }}
            >
              {h.type === "image" ? (
                <img src={h.url} alt={h.title} className="w-100 h-100" style={{ objectFit: "cover" }} />
              ) : (
                <video src={h.url} className="w-100 h-100" style={{ objectFit: "cover" }} muted />
              )}
            </div>
            <small className="d-block mt-1">{h.title}</small>
          </div>
        ))}
      </div>

      {/* Story Modal */}
      {activeHighlight !== null && (
        <div
          className="modal d-block"
          style={{ background: "rgba(0,0,0,0.9)" }}
          onClick={() => setActiveHighlight(null)}
        >
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content bg-dark text-white border-0">
              <div className="modal-body text-center p-0">
                {highlights[activeHighlight].type === "image" ? (
                  <img src={highlights[activeHighlight].url} alt="highlight" className="img-fluid" />
                ) : (
                  <video src={highlights[activeHighlight].url} className="img-fluid" controls autoPlay />
                )}
                <h6 className="mt-2">{highlights[activeHighlight].title}</h6>
              </div>

              {/* Navigation Buttons */}
              <div className="d-flex justify-content-between p-2">
                <button
                  className="btn btn-light btn-sm"
                  disabled={activeHighlight === 0}
                  onClick={() => setActiveHighlight((prev) => prev - 1)}
                >
                  ◀ Prev
                </button>
                <button
                  className="btn btn-light btn-sm"
                  disabled={activeHighlight === highlights.length - 1}
                  onClick={() => setActiveHighlight((prev) => prev + 1)}
                >
                  Next ▶
                </button>
              </div>
              <button className="btn btn-danger w-100" onClick={() => setActiveHighlight(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileHighlights;
