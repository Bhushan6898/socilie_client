import React, { useState, useRef } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useUser } from "../../hook/user/useUser.js";
import MusicList from "./addmusic.js";
import { ArrowRepeat } from "react-bootstrap-icons";

const CreateReelPage = () => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [music, setMusic] = useState("");
  const [muteVideo, setMuteVideo] = useState(false); // ✅ NEW
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedSong, setSelectedSong] = useState(null);
  const { createPost } = useUser();

  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("files", file);
    formData.append("caption", caption);
    formData.append("music", music);
    formData.append("type", "reel");
    formData.append("muteVideo", muteVideo); // ✅ send mute info to backend

    // await createPost(formData);
  };

  const handleVideoPlay = () => {
    if (music && audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleVideoPause = () => {
    if (music && audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <Container
      fluid
      className="min-vh-100 d-flex align-items-center justify-content-center bg-dark text-white"
      style={{ paddingBottom: "80px" }}
    >
      <Row className="justify-content-center w-100">
        <Col xs={12} md={8} lg={6}>
          <Card className="p-4 shadow-lg border-0 bg-dark text-light rounded-4">
            <h3 className="text-center fw-bold mb-4">🎬 Create Reel</h3>

            <Form onSubmit={handleSubmit}>
              {/* Upload Video or Image */}
              <Form.Group className="mb-3 text-center">
                <Form.Label className="fw-semibold">
                  {file ? "Change File" : "Upload Video or Image"}
                </Form.Label>
                <Form.Control
                  type="file"
                  accept="video/*,image/*"
                  onChange={handleFileChange}
                />
              </Form.Group>

              {/* Preview */}
              {file && (
                <div className="text-center mb-3">
                  {file.type.startsWith("video") ? (
                    <>
                      <video
                        ref={videoRef}
                        src={URL.createObjectURL(file)}
                        className="rounded shadow-sm w-100"
                        style={{ maxHeight: "350px", objectFit: "cover" }}
                        controls
                        muted={muteVideo || !!music} // ✅ mute if selected
                        onPlay={handleVideoPlay}
                        onPause={handleVideoPause}
                      />

                      {/* Mute Video Voice Option */}
                      <Form.Check
                        type="switch"
                        id="mute-video"
                        label="Mute Video Voice"
                        checked={muteVideo}
                        onChange={() => setMuteVideo(!muteVideo)}
                        className="mt-2"
                      />
                    </>
                  ) : (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="rounded shadow-sm w-100"
                      style={{ maxHeight: "350px", objectFit: "cover" }}
                    />
                  )}
                  {music && <audio ref={audioRef} src={music} loop preload="auto" />}
                </div>
              )}

              {/* Music Selection */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Add Music</Form.Label>
                <MusicList onSelect={setSelectedSong} />

                {selectedSong && (
                  <div className="mb-3 text-center position-relative d-inline-block">
                    {/* Album with Stop button */}
                    <div style={{ position: "relative", display: "inline-block" }}>
                      <img
                        src={selectedSong.album.cover_medium}
                        alt={selectedSong.title}
                        className="rounded"
                        style={{ width: "100px", height: "100px" }}
                      />
                      <button
                        className="btn btn-danger btn-sm"
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          borderRadius: "50%",
                          padding: "6px 10px",
                        }}
                        onClick={() => {
                          if (audioRef.current) {
                            audioRef.current.pause();
                            audioRef.current.currentTime =
                              selectedSong.clipStart || 0;
                          }
                        }}
                      >
                        ⏹
                      </button>
                    </div>

                    {/* Song Info */}
                    <p className="mt-2 mb-0 text-small">{selectedSong.title}</p>
                    <small className="text-muted">{selectedSong.artist.name}</small>

                    <audio
                      ref={audioRef}
                      src={selectedSong.url}
                      autoPlay
                      onTimeUpdate={(e) => {
                        const t = e.target.currentTime;
                        if (t >= selectedSong.clipEnd) {
                          e.target.pause();
                        } else {
                          setCurrentTime(t - selectedSong.clipStart);
                        }
                      }}
                      onLoadedMetadata={(e) => {
                        e.target.currentTime = selectedSong.clipStart || 0;
                      }}
                    />

                    {/* Custom Progress Bar */}
                    <div className="text-s">
                      <progress
                        value={currentTime}
                        max={selectedSong.clipEnd - selectedSong.clipStart}
                        className="w-100"
                      ></progress>
                      <div className="mt-1 small d-flex justify-content-center align-items-center gap-2">
                        <span>
                          {Math.floor(currentTime)}s /{" "}
                          {selectedSong.clipEnd - selectedSong.clipStart}s
                        </span>

                        {/* 🔁 Replay Button */}
                        <ArrowRepeat
                          size={18}
                          className="text-primary cursor-pointer"
                          onClick={() => {
                            if (audioRef.current) {
                              audioRef.current.currentTime =
                                selectedSong.clipStart || 0;
                              audioRef.current.play();
                              setCurrentTime(0);
                            }
                          }}
                        />
                      </div>
                    </div>

                    {/* ❌ Do Not Save Button */}
                    <button
                      className="btn btn-outline-danger btn-sm mt-2"
                      onClick={() => {
                        if (audioRef.current) {
                          audioRef.current.pause();
                        }
                        setSelectedSong(null); // clear selection
                        setCurrentTime(0);
                      }}
                    >
                      ❌
                    </button>
                  </div>
                )}
              </Form.Group>

              {/* Caption */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Caption</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Write something catchy..."
                />
              </Form.Group>

              {/* Submit */}
              <div className="text-center">
                <Button
                  type="submit"
                  className="w-100 fw-bold py-2 rounded-3"
                  variant="primary"
                >
                  🚀 Share Reel
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateReelPage;
