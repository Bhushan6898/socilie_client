import { useState } from "react";

function PostActions() {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(45);
  const [commentCount] = useState(30);
  const [saved, setSaved] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(likeCount + (liked ? -1 : 1));
  };

  

  return (
    <div className="d-flex align-items-center justify-content-between">
      {/* Left side: Like, Comment, Share */}
      <div className="d-flex align-items-center">
        {/* Like */}
        <button
          className="btn btn-link p-0 me-3 d-flex align-items-center"
          onClick={handleLike}
          style={{ fontSize: "1.4rem" }}
        >
          <i
            className={`${liked ? "fas fa-heart text-danger" : "far fa-heart"}`}
          ></i>
          <span style={{ fontSize: "0.85rem", marginLeft: "6px" ,color: "#0f1010ff", fontWeight: "bold"}}>
            {likeCount}
          </span>
        </button>

        {/* Comment */}
        <button
          className="btn btn-link p-0 me-3 d-flex align-items-center"
          style={{ fontSize: "1.4rem" }}
        >
          <i className="far fa-comment"></i>
          <span style={{ fontSize: "0.85rem", marginLeft: "6px", color: "#0f1010ff",fontWeight: "bold" }}>
            {commentCount}
          </span>
        </button>

        {/* Share */}
        <button
          className="btn btn-link p-0 me-3"
          style={{ fontSize: "1.4rem" }}
        >
          <i className="far fa-paper-plane"></i>
        </button>
      </div>
     

      {/* Right side: Save */}
      <button
        className="btn btn-link p-0"
        style={{ fontSize: "1.4rem" }}
        onClick={() => setSaved(!saved)}
      >
        <i className={saved ? "fas fa-bookmark" : "far fa-bookmark"}></i>
      </button>
    </div>
  );
}

export default PostActions;
