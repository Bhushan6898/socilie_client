import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  PlayFill,
  PauseFill,
  SkipStartFill,
  SkipEndFill,
} from "react-bootstrap-icons";

export default function MusicPicker() {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  const [category, setCategory] = useState("trending"); // ✅ default category

  const audioRef = useRef(null);
  const debounceRef = useRef(null);

  const categories = ["Trending", "Recent", "Bollywood", "Happy", "Romantic", "Party", "Workout", "Classical", "Devotional"];

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

  // load default category
  useEffect(() => {
    fetchMusic(category);
  }, [category]);

  // search override
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (query.trim()) {
        fetchMusic(query.trim());
      } else {
        fetchMusic(category); // reset back to category if search is cleared
      }
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const playSong = (song, index) => {
    const audio = audioRef.current ?? (audioRef.current = new Audio());
    setCurrentSong(song);
    setCurrentIndex(index);
    audio.pause();
    audio.src = song.preview;
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  const handlePlayToggle = (song, index) => {
    const audio = audioRef.current ?? (audioRef.current = new Audio());
    if (currentSong?.id === song.id) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    } else {
      playSong(song, index);
    }
  };

  const handleNext = () => {
    if (currentIndex < songs.length - 1) {
      playSong(songs[currentIndex + 1], currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      playSong(songs[currentIndex - 1], currentIndex - 1);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.ontimeupdate = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };
    audio.onended = () => handleNext();
  }, [currentIndex, songs]);

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = e.target.value;
      setProgress(audio.currentTime);
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-dark text-white " style={{ paddingBottom: "80px" }}>
      {/* Hero Section */}
      <div
        className="p-4 text-center"
        style={{
          background: "linear-gradient(135deg, #1DB954, #191414)",
        }}
      >
        <h2 className="fw-bold display-6">🎵 Discover Music</h2>
        <p className="text-light">Search, play and vibe like never before.</p>
         <div className="d-flex justify-content-center gap-2 mb-3 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn btn-sm rounded-pill ${
                category === cat.toLowerCase()
                  ? "btn-success"
                  : "btn-outline-light"
              }`}
              onClick={() => {
                setQuery(""); // reset search when switching
                setCategory(cat.toLowerCase());
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mx-auto" style={{ maxWidth: "500px" }}>
          <input
            className="form-control form-control-lg rounded-pill shadow-sm text-dark"
            placeholder="Search songs, artists..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Song Grid */}
      <div className="container py-4">
        {loading && <div className="text-center my-3">Loading…</div>}

        <div className="row g-4">
          {songs.map((song, index) => (
            <div
              className="col-6 col-sm-4 col-md-3 col-lg-2"
              key={song.id}
              onClick={() => handlePlayToggle(song, index)}
            >
              <div
                className="card border-0 h-100 rounded-4 overflow-hidden shadow-lg"
                style={{
                  cursor: "pointer",
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)",
                  transition: "transform 0.3s",
                }}
              >
                <div className="position-relative">
                  <img
                    src={song.album.cover_medium}
                    className="card-img-top"
                    alt={song.title}
                    style={{
                      borderRadius: "12px",
                      height: "180px",
                      objectFit: "cover",
                      transition: "0.3s",
                    }}
                  />
                  <div
                    className="position-absolute top-50 start-50 translate-middle bg-success bg-opacity-75 text-white fs-3 rounded-circle d-flex justify-content-center align-items-center"
                    style={{ width: "60px", height: "60px" }}
                  >
                    {currentSong?.id === song.id && isPlaying ? (
                      <PauseFill />
                    ) : (
                      <PlayFill />
                    )}
                  </div>
                </div>

                <div className="card-body text-center p-2">
                  <h6 className="card-title text-truncate fw-semibold mb-1 text-white">
                    {song.title}
                  </h6>
                  <p className="card-text text-muted small mb-0 text-white">
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

      {/* Bottom Player */}
    {currentSong && (
  <div
    className="card fixed-bottom text-white shadow-lg px-3 py-2"
    style={{
      background: "rgba(20,20,20,0.85)",
      backdropFilter: "blur(12px)",
    }}
  >
    {/* Close Button */}
    <button
      className="btn btn-sm btn-outline-light position-absolute top-0 end-0 m-2 rounded-circle"
      onClick={() => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        setCurrentSong(null);
        setIsPlaying(false);
      }}
    >
      ✕
    </button>

    <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
      {/* Song Info */}
      <div className="d-flex align-items-center gap-3 text-center text-md-start">
        <img
          src={currentSong.album.cover_small}
          alt={currentSong.title}
          className="rounded"
          style={{
            width: 55,
            height: 55,
            objectFit: "cover",
            boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
          }}
        />
        <div className="overflow-hidden">
          <div
            className="fw-bold text-truncate"
            style={{ maxWidth: "150px" }}
          >
            {currentSong.title}
          </div>
          <div
            className="text-muted small text-truncate"
            style={{ maxWidth: "150px", color: "#ccc" }}
          >
            {currentSong.artist.name}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="d-flex align-items-center justify-content-center gap-3 flex-shrink-0">
        <button
          className="btn btn-outline-light rounded-circle"
          onClick={handlePrev}
          disabled={currentIndex <= 0}
        >
          <SkipStartFill size={18} />
        </button>
        <button
          className="btn btn-success rounded-circle"
          style={{ width: "50px", height: "50px" }}
          onClick={() => handlePlayToggle(currentSong, currentIndex)}
        >
          {isPlaying ? <PauseFill size={28} /> : <PlayFill size={28} />}
        </button>
        <button
          className="btn btn-outline-light rounded-circle"
          onClick={handleNext}
          disabled={currentIndex >= songs.length - 1}
        >
          <SkipEndFill size={18} />
        </button>
      </div>

      {/* Volume Control */}
      <div className="d-flex align-items-center gap-2">
        <i className="bi bi-volume-up"></i>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => {
            const newVolume = parseFloat(e.target.value);
            setVolume(newVolume);
            if (audioRef.current) audioRef.current.volume = newVolume;
          }}
          className="form-range"
          style={{ width: "100px", accentColor: "#1DB954" }}
        />
      </div>
    </div>

    {/* Progress Bar + Time */}
    <div className="mt-2">
      <div className="d-flex justify-content-between small text-white px-1">
        <span>{formatTime(progress)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      <input
        type="range"
        className="form-range w-100"
        min="0"
        max={duration || 0}
        value={progress}
        onChange={handleSeek}
        style={{
          accentColor: "#1DB954", // Spotify green
        }}
      />
    </div>
  </div>
)}

    </div>
  );
}
