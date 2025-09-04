import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useUser } from "../../hook/user/useUser.js";
import dummyLocations from "../../pages/location.json";
import MusicList from "./addmusic.js";
import { ArrowRepeat } from "react-bootstrap-icons";

const CreatePostPage = () => {
  const [files, setFiles] = useState([]);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [music, setMusic] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [step, setStep] = useState(0); // Step 0 = Upload
  const [selectedSong, setSelectedSong] = useState(null);

  const fileInputRef = useRef(null);
  const audioRef = useRef(null); // ✅ Fix: add audio ref here
  const { createPost } = useUser();
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    

  }, []);
  useEffect(() => {
  if (selectedSong) {
    // store only url + clip info, not the whole object
    setMusic({
      url: selectedSong.url,
      clipStart: selectedSong.clipStart,
      clipEnd: selectedSong.clipEnd,
    });
  }
}, [selectedSong]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleLocationSearch = (e) => {
    const value = e.target.value;
    setLocation(value);

    const filtered = dummyLocations.filter((loc) =>
      loc.toLowerCase().includes(value.toLowerCase())
    );
    setLocationSuggestions(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.append("caption", caption);
    formData.append("location", location);
   formData.append("music", JSON.stringify(music));

    formData.append("type", "post");

     await createPost(formData);
  };
  console.log(selectedSong);

  return (
    <Container className="py-4" style={{ paddingBottom: "80px" }}>
      <h4>Create a Post</h4>
      <Row className="justify-content-center">
        <Col xs={12} md={12}>
          <Card className="p-3 shadow-sm">


            <Form onSubmit={handleSubmit}>

              {files.length > 0 && (
                <Row className="mb-3">
                  {files.map((file, index) => (
                    <Col xs={12} key={index}>
                      {file.type.startsWith("video") ? (
                        <video
                          src={URL.createObjectURL(file)}
                          className="img-fluid rounded"
                          style={{ height: "250px", objectFit: "cover" }}
                          controls
                        />
                      ) : (
                        <img
                          src={URL.createObjectURL(file)}
                          className="img-fluid rounded"
                          style={{ height: "250px", objectFit: "cover" }}
                          alt=""
                        />
                      )}
                    </Col>
                  ))}
                </Row>
              )}

              {/* Step 0: Upload */}
              {step === 0 && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Upload Photos or Videos</Form.Label>
                    <Form.Control
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-end mt-3">
                    <Button
                      onClick={() => setStep(1)}
                      disabled={files.length === 0}
                    >
                      Next
                    </Button>
                  </div>
                </>
              )}

              {/* Step 1: Caption */}
              {step === 1 && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Caption</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Write a caption..."
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-between" style={{ paddingBottom: "40px" }}>
                    <Button variant="secondary" onClick={() => setStep(0)}>
                      Back
                    </Button>
                    <Button onClick={() => setStep(2)}>Next</Button>
                  </div>
                </>
              )}

              {/* Step 2: Location */}
              {step === 2 && (
                <>
                  <Form.Group className="mb-3 position-relative">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      value={location}
                      onChange={handleLocationSearch}
                      placeholder="Search location..."
                    />
                    {locationSuggestions.length > 0 && (
                      <div
                        className="border rounded mt-1 p-2 bg-light position-absolute w-100"
                        style={{
                          zIndex: 1000,
                          maxHeight: "200px",
                          overflowY: "auto",
                        }}
                      >
                        {locationSuggestions.map((loc, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              setLocation(loc);
                              setLocationSuggestions([]);
                            }}
                            style={{ cursor: "pointer", padding: "4px 0" }}
                          >
                            {loc}
                          </div>
                        ))}
                      </div>
                    )}
                  </Form.Group>

                  <div className="d-flex justify-content-between">
                    <Button variant="secondary" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button onClick={() => setStep(3)}>Next</Button>
                  </div>
                </>
              )}

              {/* Step 3: Music + Submit */}
              {step === 3 && (
                <>


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
                              audioRef.current.currentTime = selectedSong.clipStart || 0;
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
                                audioRef.current.currentTime = selectedSong.clipStart || 0;
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



                  <div className="d-flex justify-content-between" style={{ paddingBottom: "40px" }}>
                    <Button variant="secondary" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button type="submit">Share Post</Button>
                  </div>
                </>
              )}
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreatePostPage;
