import { useState, useEffect } from "react";
import { useUser } from "../../hook/user/useUser";
import { useSelector } from "react-redux";

function PostActions({ postId, userId, like }) {
  const { likePost } = useUser();
  const currentUserId = useSelector((state) => state.auth.id);

  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeList, setLikeList] = useState(like); // Initial likes from props

  // ✅ Update `liked` when `likeList` or `currentUserId` changes
  useEffect(() => {
    const userHasLiked = likeList.some(
      (entry) => entry.userId._id.toString() === currentUserId.toString()
    );
    setLiked(userHasLiked);
  }, [likeList, currentUserId]);

  const handleLike = async () => {
    const newLiked = !liked;
    let updatedLikes;

    if (newLiked) {
      // Add current user's like
      updatedLikes = [
        ...likeList,
        {
          userId: { _id: currentUserId },
          likedAt: new Date().toISOString(),
          _id: Math.random().toString(36).substr(2, 9), // temporary ID
        },
      ];
    } else {
      // Remove current user's like
      updatedLikes = likeList.filter(
        (entry) => entry.userId._id.toString() !== currentUserId.toString()
      );
    }

    setLikeList(updatedLikes); // Trigger re-render

    try {
      await likePost({ postId, like: newLiked });
    } catch (error) {
      console.error("Failed to update like:", error);
      // Revert on error
      setLikeList(likeList);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        {/* Like */}
        <button
          className="btn btn-link p-0 me-3 d-flex align-items-center"
          onClick={handleLike}
          style={{ fontSize: "1.4rem" }}
        >
          <i className={liked ? "fas fa-heart text-danger" : "far fa-heart"}></i>
          <span style={{
            fontSize: "0.85rem",
            marginLeft: "6px",
            color: "#0f1010ff",
            fontWeight: "bold"
          }}>
            {likeList.length}
          </span>
        </button>

        {/* Comment */}
        <button className="btn btn-link p-0 me-3 d-flex align-items-center" style={{ fontSize: "1.4rem" }}>
          <i className="far fa-comment"></i>
          <span style={{
            fontSize: "0.85rem",
            marginLeft: "6px",
            color: "#0f1010ff",
            fontWeight: "bold"
          }}>
            0
          </span>
        </button>

        {/* Share */}
        <button className="btn btn-link p-0 me-3" style={{ fontSize: "1.4rem" }}>
          <i className="far fa-paper-plane"></i>
        </button>
      </div>

      {/* Save */}
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
