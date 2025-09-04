// MusicPicker.jsx
import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function MusicPicker({ onSelect }) {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(null);
  const audioRef = useRef(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [showsongs, setShowsongs] = useState(true);
  const [selectedSong, setSelectedSong] = useState(null);
  const [clipStart, setClipStart] = useState(0);
  const [duration, setDuration] = useState(0);

  const [category, setCategory] = useState("all");

  // Fetch songs
  const fetchMusic = async (q) => {
    setLoading(true);
    try {
      let url = "";

      if (q) {
        // If user searched → fetch by query
        url = `https://saavn.dev/api/search/songs?query=${encodeURIComponent(q)}&page=1&limit=40`;
      } else if (category === "all") {
        // Default: mix trending songs
        url = `https://saavn.dev/api/songs?ids=1nq5xh9U,4l8qv2Z9,3nMZKjPj,...`; // put few song IDs you like
        // OR fetch trending
        url = `https://saavn.dev/api/trending?limit=40&language=hindi,english,punjabi`;
      } else {
        // category-based fetch
        url = `https://saavn.dev/api/trending?limit=40&language=${category}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      const mapped =
        data?.data?.results?.map((song) => ({
          id: song.id,
          title: song.name,
          artist: { name: song.artists?.primary?.[0]?.name || "Unknown" },
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

  // Call once when component mounts
  useEffect(() => {
    fetchMusic("all"); // load default/all songs
  }, [category]);

  // cleanup audio
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Normal preview play
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
      audio.play().catch(() => { });
      setPlaying(song);
      audio.onended = () => setPlaying(null);
    }
  };

  // Open modal + autoplay
  const handleSelect = (song) => {
    setSelectedSong(song);
    setShowModal(true);

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(song.url);
    audioRef.current = audio;

    audio.onloadedmetadata = () => {
      setDuration(audio.duration || 0);
      audio.currentTime = 0;
      audio.play().catch(() => { });

      audio.ontimeupdate = () => {
        if (audio.currentTime >= clipStart + 30) {
          audio.pause();
        }
      };
    };
  };

  // Confirm cut
  const handleConfirm = () => {
    if (onSelect && selectedSong) {
      onSelect({
        ...selectedSong,
        clipStart,
        clipEnd: clipStart + 30,
      });
    }
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setShowModal(false);
    setSelectedSong(null);
    setShowsongs(false);
  };

  // When slider changes, restart playback safely
  useEffect(() => {
    if (showModal && audioRef.current && selectedSong) {
      const audio = audioRef.current;
      audio.pause();
      audio.currentTime = clipStart;

      audio.play().catch(() => { });

      audio.ontimeupdate = () => {
        if (audio.currentTime >= clipStart + 30) {
          audio.pause();
        }
      };
    }
  }, [clipStart, showModal, selectedSong]);

  return (
    <div className="container-fliud mt-3" >

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


      <div
        className="list-group"
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        {loading && <div className="text-center p-3">Loading...</div>}
        {!loading && songs.length === 0 && query && (
          <div className="text-center p-3 text-muted">No songs found</div>
        )}
        {showsongs &&
          songs.map((song) => (
            <div
              key={song.id}
              className="list-group-item d-flex align-items-center justify-content-between"
            >
              {/* Thumbnail + play */}
              <div className="d-flex align-items-center">
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
                    className="btn btn-sm"
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
                <div>
                  <div className="fw-bold">{song.title}</div>
                  <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                    {song.artist.name}
                  </div>
                </div>
              </div>
              <button
                className="btn btn-success btn-sm ml-2"
                onClick={() => handleSelect(song)}
              >
                <i className={song ? "fas fa-bookmark" : "far fa-bookmark"}></i>
              </button>
            </div>
          ))
        }
      </div>

      {/* Modal for trimming */}
      {showModal && selectedSong && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">Select 30s Clip</h5>
                <button
                  className="btn-close"
                  onClick={() => {
                    if (audioRef.current) audioRef.current.pause();
                    setShowModal(false);
                  }}
                ></button>
              </div>
              <div className="modal-body text-center">
                <img
                  src={selectedSong.album.cover_medium}
                  alt={selectedSong.title}
                  style={{ width: "150px", borderRadius: "10px" }}
                />
                <h6 className="mt-3">{selectedSong.title}</h6>
                <p className="text-muted">{selectedSong.artist.name}</p>

                {/* Slider to choose 30s window */}
                <input
                  type="range"
                  min="0"
                  max={Math.max(0, duration - 30)}
                  value={clipStart}
                  onChange={(e) => setClipStart(Number(e.target.value))}
                  className="form-range mt-3"
                />
                <p>
                  Start: {Math.floor(clipStart)}s – End:{" "}
                  {Math.floor(clipStart + 30)}s
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    if (audioRef.current) audioRef.current.pause();
                    setShowModal(false);
                  }}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleConfirm}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
