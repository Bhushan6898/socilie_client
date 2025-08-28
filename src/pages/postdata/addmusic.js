// MusicPicker.jsx
import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function MusicPicker() {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSong, setCurrentSong] = useState(null); // track which song is active
  const [isPlaying, setIsPlaying] = useState(false); // track play/pause
  const audioRef = useRef(null);
  const debounceRef = useRef(null);

  const fetchMusic = async (q) => {
    if (!q) {
      setSongs([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `https://saavn.dev/api/search/songs?query=${encodeURIComponent(q)}&page=1&limit=50`
      );
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
          preview: song.downloadUrl?.[3]?.url || "",
        })) || [];

      setSongs(mapped);
    } catch (err) {
      console.error(err);
      setSongs([]);
    } finally {
      setLoading(false);
    }
  };

  // default fetch on mount
  useEffect(() => {
    fetchMusic("trending");
  }, []);

  // debounce typing
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (query.trim()) fetchMusic(query.trim());
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const handlePlayToggle = (song) => {
    const audio = audioRef.current ?? (audioRef.current = new Audio());

    if (currentSong?.id === song.id) {
      // toggle play/pause for same song
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    } else {
      // play a new song
      setCurrentSong(song);
      audio.pause();
      audio.src = song.preview;
      audio.currentTime = 0;
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Reset state when audio ends
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.onended = () => setIsPlaying(false);
  }, [audioRef.current]);

  return (
    <div className="container py-3">
      <h3 className="mb-3">🎵 Pick Music</h3>

      {/* Search */}
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Search songs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading && <div className="text-center my-3">Loading…</div>}

      {/* Song grid */}
      <div className="row g-3">
        {songs.map((song) => (
          <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={song.id}>
            <div className="card h-100 shadow-sm">
              <div
                className="position-relative"
                style={{ cursor: "pointer" }}
                onClick={() => handlePlayToggle(song)}
              >
                <img
                  src={song.album.cover_medium}
                  className="card-img-top"
                  alt={song.title}
                />
                <div
                  className="position-absolute top-50 start-50 translate-middle text-white fs-4"
                  style={{ textShadow: "0 0 6px rgba(0,0,0,.6)" }}
                >
                  {currentSong?.id === song.id && isPlaying ? "⏸" : "▶"}
                </div>
              </div>

              <div className="card-body p-2">
                <h6 className="card-title text-truncate mb-1">{song.title}</h6>
                <p className="card-text text-muted small mb-2">
                  {song.artist.name}
                </p>
              </div>
            </div>
          </div>
        ))}

        {!loading && songs.length === 0 && query.trim() !== "" && (
          <div className="text-center text-muted">No results</div>
        )}
      </div>
    </div>
  );
}
