import React, { useRef, useEffect, useState } from "react";
import { FaHeart, FaCommentDots, FaShare, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

import reel1 from "../asset/reel/reel1.mp4";
import reel2 from "../asset/reel/reel2.mp4";
import reel3 from "../asset/reel/reel3.mp4";
import reel4 from "../asset/reel/reel4.mp4";
import reel5 from "../asset/reel/reel5.mp4";
import reel6 from "../asset/reel/reel6.mp4";
import reel7 from "../asset/reel/reel7.mp4";
import reel8 from "../asset/reel/reel8.mp4";

const reels = [
  { id: 1, video: reel1, userprofile: "https://res.cloudinary.com/dl35wuxhn/image/upload/v1757006094/socilite-user/product_af4563692ae0e6551d6ee0948ba50498db48b869d584ad651331388e4477a326.jpg", username: "Bhushan Patil", caption: "Exploring Jalgaon 🌆🔥" },
  { id: 2, video: reel2, userprofile: "https://res.cloudinary.com/dl35wuxhn/image/upload/v1756469770/socilite-user/product_195f28ea6d7618815fa7870a2829a5a8fc3663a73b1dc4cf7989505753c1f167.jpg", username: "ram@patil12", caption: "Evening vibes 😍🎶" },
  { id: 3, video: reel3, userprofile: "https://res.cloudinary.com/dl35wuxhn/image/upload/v1754468104/socilite-user/product_e2ce44f5503387abc81e0bfb5c29c6bb7b2a5ef6a22324c33f8004cf729cb4bf.jpg", username: "mpatil@123", caption: "Work hard, chill harder 💻☕" },
  { id: 4, video: reel4, userprofile: "https://res.cloudinary.com/dl35wuxhn/image/upload/v1756469770/socilite-user/product_195f28ea6d7618815fa7870a2829a5a8fc3663a73b1dc4cf7989505753c1f167.jpg", username: "Bhushan Patil", caption: "Sunset vibes 🌅" },
  { id: 5, video: reel5, userprofile: "https://res.cloudinary.com/dl35wuxhn/image/upload/v1757006094/socilite-user/product_af4563692ae0e6551d6ee0948ba50498db48b869d584ad651331388e4477a326.jpg", username: "mpatil@01", caption: "Coffee break ☕" },
  { id: 6, video: reel6, userprofile: "https://res.cloudinary.com/dl35wuxhn/image/upload/v1754468104/socilite-user/product_e2ce44f5503387abc81e0bfb5c29c6bb7b2a5ef6a22324c33f8004cf729cb4bf.jpg", username: "ram@patil12", caption: "Work hard, chill harder 💻☕" },
  { id: 7, video: reel7, userprofile: "https://res.cloudinary.com/dl35wuxhn/image/upload/v1756469770/socilite-user/product_195f28ea6d7618815fa7870a2829a5a8fc3663a73b1dc4cf7989505753c1f167.jpg", username: "ram@patil12", caption: "Sunset vibes 🌅" },
  { id: 8, video: reel8, userprofile: "https://res.cloudinary.com/dl35wuxhn/image/upload/v1757006094/socilite-user/product_af4563692ae0e6551d6ee0948ba50498db48b869d584ad651331388e4477a326.jpg", username: "Bhushan Patil", caption: "Coffee break ☕" },
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
            entry.target.play().catch(() => { });
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

          {/* Centered Mute Button */}
          {index === currentIndex && (
            <div
              onClick={toggleMute}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                fontSize: "13px",
                cursor: "pointer",
                backgroundColor: "rgba(0,0,0,0.4)",
                padding: "16px",
                borderRadius: "50%",
                zIndex: 10,
                transition: "opacity 0.3s",
              }}
            >
              {muted ? <FaVolumeMute /> : <FaVolumeUp />}
            </div>
          )}

          {/* Username + Caption */}
         {/* Username + Caption */}
{/* Username + Caption */}
<div
  style={{
    position: "absolute",
    bottom: "80px", // 40px above the bottom
    left: "10px",
    color: "white",
    maxWidth: "70%",
    zIndex: 5,
  }}
>
  {/* Profile section */}
  <div style={{ display: "flex", alignItems: "center", marginBottom: "80px" }}>
    <img
      src={reel.userprofile}
      alt="profile"
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        marginRight: "8px",
        objectFit: "cover",
      }}
    />
    <strong style={{ fontSize: "14px" }}>@{reel.username}</strong>
  </div>

  {/* Caption below profile */}
  <p
    style={{
      margin: 0,
      fontSize: "13px",
      lineHeight: "16px",
      wordBreak: "break-word",
      marginTop: "40px",
    }}
  >
   
  </p>
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
