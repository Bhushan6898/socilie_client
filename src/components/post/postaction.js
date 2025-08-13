import { useState } from "react";

function PostActions() {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(45);
  const [commentCount] = useState(30);
  const [saved, setSaved] = useState(false); // New save state

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(likeCount + (liked ? -1 : 1)); // toggle like count
  };

  return (
    <div className="d-flex align-items-center justify-content-between">
      {/* Left side: Like, Comment, Share */}
      <div className="d-flex align-items-center">
        {/* Like */}
        <div className="text-center me-4">
          <button
            className="btn btn-link p-0"
            onClick={handleLike}
            style={{ fontSize: "1.4rem" }}
          >
            <i
              className={`${liked ? "fas fa-heart text-danger" : "far fa-heart"}`}
            ></i>
          </button>
          <div style={{ color: "#333", fontSize: "0.85rem" }}>{likeCount}</div>
        </div>

        {/* Comment */}
        <div className="text-center me-4">
          <button
            className="btn btn-link p-0"
            style={{ fontSize: "1.4rem" }}
          >
            <i className="far fa-comment"></i>
          </button>
          <div style={{ color: "#333", fontSize: "0.85rem" }}>{commentCount}</div>
        </div>

        {/* Share */}
        <div className="text-center me-4">
          <button
            className="btn btn-link p-0"
            style={{ fontSize: "1.4rem" }}
          >
            <i className="far fa-paper-plane"></i>
          </button>
           <p><p></p></p>
        </div>
      </div>

      {/* Right side: Save */}
      <div className="text-center">
        <button
          className="btn btn-link p-0"
          style={{ fontSize: "1.4rem" }}
          onClick={() => setSaved(!saved)}
        >
          <i className={saved ? "fas fa-bookmark" : "far fa-bookmark"}></i>
        </button>
      </div>
    </div>
  );
}

export default PostActions;
