import React, { useRef, useEffect, useState } from "react";
import { FaHeart, FaCommentDots, FaShare, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

import reel1 from "../asset/reel/reel1.mp4";
import reel2 from "../asset/reel/reel2.mp4";
import reel3 from "../asset/reel/reel3.mp4";
import reel4 from "../asset/reel/reel4.mp4";
import reel5 from "../asset/reel/reel5.mp4";

const reels = [
  { id: 1, video: reel1, username: "user_one", caption: "Exploring Jalgaon 🌆🔥" },
  { id: 2, video: reel2, username: "user_two", caption: "Evening vibes 😍🎶" },
  { id: 3, video: reel3, username: "user_three", caption: "Work hard, chill harder 💻☕" },
  { id: 4, video: reel4, username: "user_four", caption: "Sunset vibes 🌅" },
  { id: 5, video: reel5, username: "user_five", caption: "Coffee break ☕" },
];

function ReelPage() {
  const videoRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          if (entry.isIntersecting) {
            setCurrentIndex(index);
            entry.target.play().catch(() => {});
          } else {
            entry.target.pause();
          }
        });
      },
      { threshold: 0.7 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    setMuted(!muted);
    videoRefs.current.forEach((video, index) => {
      if (video && index === currentIndex) video.muted = !video.muted;
    });
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "black",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
      }}
    >
      {reels.map((reel, index) => (
        <div
          key={reel.id}
          style={{
            width: "100%",
            height: "100vh",
            position: "relative",
            scrollSnapAlign: "center",
          }}
        >
          {/* Video */}
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            data-index={index}
            src={reel.video}
            muted={muted}
            loop
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* Centered Mute Button for Current Reel */}
          {index === currentIndex && (
            <div
              onClick={toggleMute}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                fontSize: "10px",
                cursor: "pointer",
                backgroundColor: "rgba(0,0,0,0.4)",
                padding: "12px",
                borderRadius: "50%",
                zIndex: 10,
              }}
            >
              {muted ? <FaVolumeMute /> : <FaVolumeUp />}
            </div>
          )}

          {/* Username + Caption */}
          <div
            style={{
              position: "absolute",
              bottom: "80px",
              left: "10px",
              color: "white",
              maxWidth: "80%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
              <img
                src={`https://randomuser.me/api/portraits/men/${index + 10}.jpg`}
                alt="profile"
                style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }}
              />
              <strong>@{reel.username}</strong>
            </div>
            <p>{reel.caption}</p>
          </div>

          {/* Right side buttons */}
          <div
            style={{
              position: "absolute",
              right: "15px",
              bottom: "100px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              color: "white",
              fontSize: "24px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <FaHeart />
              <p style={{ fontSize: "12px", marginTop: "4px" }}>120</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <FaCommentDots />
              <p style={{ fontSize: "12px", marginTop: "4px" }}>45</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <FaShare />
              <p style={{ fontSize: "12px", marginTop: "4px" }}>10</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReelPage;
