// MusicPicker.jsx
import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function MusicPicker({ onSelect }) {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(null);
  const audioRef = useRef(null);

    const [category, setCategory] = useState("shorts"); // ✅ default category
  const fetchMusic = async (q) => {
    if (!q) {
      setSongs([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `https://saavn.dev/api/search/songs?query=${encodeURIComponent(
          q
        )}&page=1&limit=40`
      );
      const data = await res.json();

      const mapped =
        data?.data?.results?.map((song) => ({
          id: song.id,
          title: song.name,
          artist: song.primaryArtists,
          album: {
            cover_medium: song.image?.[2]?.url,
            cover_small: song.image?.[0]?.url,
          },
          url: song.downloadUrl?.[0]?.url || "",
        })) || [];

      setSongs(mapped);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };
   useEffect(() => {
      fetchMusic(category);
    }, [category]);

  // Play / Pause 30-second preview
  const handlePlay = (song) => {
    if (playing?.id === song.id) {
      audioRef.current?.pause();
      setPlaying(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(song.url);
      audioRef.current = audio;

      // Limit to 30 seconds
      audio.ontimeupdate = () => {
        if (audio.currentTime >= 30) {
          audio.pause();
          setPlaying(null);
        }
      };

      audio.play();
      setPlaying(song);
      audio.onended = () => setPlaying(null);
    }
  };

  // Handle save/select song
  const handleSave = (song) => {
    if (onSelect) {
      onSelect(song); // send song to parent
    }
    alert(`✅ Selected: ${song.title} by ${song.artist}`);
  };

  return (
    <div className="container mt-3">
      {/* Search Bar */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search music..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          fetchMusic(e.target.value);
        }}
      />

      {/* Song List */}
      <div className="list-group" style={{ maxHeight: "400px", overflowY: "auto" }}>
        {loading && <div className="text-center p-3">Loading...</div>}
        {!loading && songs.length === 0 && query && (
          <div className="text-center p-3 text-muted">No songs found</div>
        )}

        {songs.map((song) => (
          <div
            key={song.id}
            className="list-group-item d-flex align-items-center justify-content-between"
          >
            {/* Left Side: Thumbnail + Info */}
            <div className="d-flex align-items-center">
              {/* Album with Play Button */}
              <div
                style={{
                  position: "relative",
                  width: "50px",
                  height: "50px",
                  marginRight: "12px",
                }}
              >
                <img
                  src={song.album.cover_medium}
                  alt={song.title}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <button
                  onClick={() => handlePlay(song)}
                  className="btn btn-sm "
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    borderRadius: "50%",
                    padding: "2px 6px",
                  }}
                >
                  {playing?.id === song.id ? "⏸" : "▶"}
                </button>
              </div>

              {/* Title + Artist */}
              <div>
                <div className="fw-bold">{song.title}</div>
                <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                  {song.artist}
                </div>
              </div>
            </div>

            {/* Right Side: Save/Select Button */}
            <button
              className="btn btn-success btn-sm"
              onClick={() => handleSave(song)}
            >
              <i className={song ? "fas fa-bookmark" : "far fa-bookmark"}></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
