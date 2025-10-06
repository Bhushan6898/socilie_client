import { useState } from "react";
import { useSelector } from "react-redux";
import { useUser } from "../../hook/user/useUser";


function PostActions({ postId, userId }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount] = useState(0);
  const [saved, setSaved] = useState(false);
const{ likePost }=useUser();


  const handleLike = async () => {
    // Optimistic UI update
    setLiked(!liked);
    setLikeCount(likeCount + (liked ? -1 : 1));
    try {
      const data = { postId,  like: !liked };
      await likePost(data);
      
    } catch (error) {
     
      setLiked(liked);
      setLikeCount(likeCount + (liked ? 1 : -1));
     
    }
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
