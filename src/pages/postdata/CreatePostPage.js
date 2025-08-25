import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useUser } from "../../hook/user/useUser.js";
import dummyLocations from "../../pages/location.json";
import musicList from "../musiclist.js";

const CreatePostPage = () => {
  const [files, setFiles] = useState([]);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [music, setMusic] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [step, setStep] = useState(1);

  const { createPost } = useUser();

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
    formData.append("music", music);
    formData.append("type", "post");

    await createPost(formData);
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <Card className="p-3 shadow-sm">
            <h4>Create a Post</h4>

            <Form onSubmit={handleSubmit}>
              {/* Step 1: Media Upload */}
              {step === 1 && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Upload Photos or Videos</Form.Label>
                    <Form.Control
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={handleFileChange}
                    />
                  </Form.Group>

                  {files.length > 0 && (
                    <Row>
                      {files.map((file, index) => (
                        <Col xs={6} md={4} key={index} className="mb-2">
                          {file.type.startsWith("video") ? (
                            <video
                              src={URL.createObjectURL(file)}
                              className="img-fluid rounded"
                              style={{ height: "200px", objectFit: "cover" }}
                              controls
                            />
                          ) : (
                            <img
                              src={URL.createObjectURL(file)}
                              className="img-fluid rounded"
                              style={{ height: "200px", objectFit: "cover" }}
                              alt=""
                            />
                          )}
                        </Col>
                      ))}
                    </Row>
                  )}

                  <div className="d-flex justify-content-end mt-3">
                    <Button onClick={() => setStep(2)} disabled={files.length === 0}>
                      Next
                    </Button>
                  </div>
                </>
              )}

              {/* Step 2: Caption */}
              {step === 2 && (
                <>
                  <Form.Group className="mb-3 mt-3">
                    <Form.Label>Caption</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Write a caption..."
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-between">
                    <Button variant="secondary" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button onClick={() => setStep(3)}>Next</Button>
                  </div>
                </>
              )}

              {/* Step 3: Location */}
              {step === 3 && (
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
                    <Button variant="secondary" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button onClick={() => setStep(4)}>Next</Button>
                  </div>
                </>
              )}

              {/* Step 4: Music + Submit */}
              {step === 4 && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Select Background Music</Form.Label>
                    <Form.Select
                      value={music}
                      onChange={(e) => setMusic(e.target.value)}
                    >
                      <option value="">Select music...</option>
                      {musicList.map((option, index) => (
                        <option key={index} value={option.url}>
                          {option.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <div className="d-flex justify-content-between">
                    <Button variant="secondary" onClick={() => setStep(3)}>
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
