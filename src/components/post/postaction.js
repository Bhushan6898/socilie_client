import { useState, useEffect } from "react";
import { useUser } from "../../hook/user/useUser";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";

function PostActions({ postId, userId, like }) {
  const { likePost } = useUser();
  const currentUserId = useSelector((state) => state.auth.id);

  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeList, setLikeList] = useState(like);
  const [showLikes, setShowLikes] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
      // Add like
      updatedLikes = [
        ...likeList,
        {
          userId: {
            _id: currentUserId,
            username: "you", // optionally populate from redux if needed
            name: "You",
            avatar: "", // placeholder
          },
          likedAt: new Date().toISOString(),
          _id: Math.random().toString(36).substr(2, 9),
        },
      ];
    } else {
      // Remove like
      updatedLikes = likeList.filter(
        (entry) => entry.userId._id.toString() !== currentUserId.toString()
      );
    }

    setLikeList(updatedLikes);

    try {
      await likePost({ postId, like: newLiked });
    } catch (error) {
      console.error("Failed to update like:", error);
      setLikeList(likeList); // revert
    }
  };

  const filteredLikes = likeList.filter((entry) => {
    const user = entry.userId;
    const username = user?.username?.toLowerCase() || "";
    const name = user?.name?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();

    return username.includes(search) || name.includes(search);
  });



  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          {/* Like */}
          <button
            className="btn btn-link p-0 me-3 d-flex align-items-center"
            onClick={handleLike}
            style={{ fontSize: "1.4rem" }}
          >
            <i className={liked ? "fas fa-heart text-danger" : "far fa-heart"}></i>
            <span
              style={{
                fontSize: "0.85rem",
                marginLeft: "6px",
                color: "#0f1010ff",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.stopPropagation(); // prevent like toggle
                setShowLikes(true);
              }}
            >
              {likeList.length}
            </span>
          </button>

          {/* Comment */}
          <button className="btn btn-link p-0 me-3 d-flex align-items-center" style={{ fontSize: "1.4rem" }}>
            <i className="far fa-comment"></i>
            <span className="ms-1 fw-bold" style={{ fontSize: "0.85rem", color: "#0f1010ff" }}>
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

      {/* Bootstrap Modal */}
      <Modal
        show={showLikes}
        onHide={() => setShowLikes(false)}
        centered
        dialogClassName="modal-bottom-half"
      >
        <Modal.Header closeButton>
          <Modal.Title>Liked by</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "60vh", overflowY: "auto" }}>
          <input
            type="text"
            placeholder="Search users"
            className="form-control mb-3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {filteredLikes.length > 0 ? (
            filteredLikes.map((entry) => {
              const user = entry.userId;
              return (
                <div
                  key={entry._id}
                  className="d-flex align-items-center justify-content-between border-bottom py-2"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={user.profilePicture || "https://via.placeholder.com/40"}
                      alt={user.username}
                      className="rounded-circle me-2"
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <div className="fw-bold">{user.username}</div>
                      {user.name && (
                        <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                          {user.name}
                        </div>
                      )}
                    </div>
                  </div>
                  <button className="btn btn-outline-primary btn-sm">Follow</button>
                </div>
              );
            })
          ) : (
            <p>No likes found</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PostActions;
