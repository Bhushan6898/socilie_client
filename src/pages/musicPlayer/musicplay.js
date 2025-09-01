import React from "react";
import { SkipStartFill, SkipEndFill, PlayFill, PauseFill } from "react-bootstrap-icons";

const MusicPlayer = ({
  currentSong,
  currentIndex,
  songs,
  isPlaying,
  progress,
  duration,
  volume,
  audioRef,
  handlePrev,
  handleNext,
  handlePlayToggle,
  handleSeek,
  setCurrentSong,
  setIsPlaying,
  setVolume,
  formatTime,
}) => {
  if (!currentSong) return null;

  return (
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
            src={currentSong.album.cover_medium}
            alt={currentSong.title}
            className="rounded"
            style={{
              width: 55,
              height: 55,
              objectFit: "cover",
             
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
              className="text-muted small text-truncate text-white-50"
              style={{ maxWidth: "150px" }}
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
            accentColor: "#1DB954",
          }}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
