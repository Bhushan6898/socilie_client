import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useUser } from '../hook/user/useUser';

const PostCreationPage = () => {
  
  const [files, setFiles] = useState([]);
  const [step, setStep] = useState(1);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [music, setMusic] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState([]);
const { createPost } = useUser();
  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleLocationSearch = (e) => {
    const value = e.target.value;
    setLocation(value);

    const dummyLocations = ['Mumbai', 'Pune', 'Delhi', 'Nagpur', 'Nashik', 'Hyderabad'];
    const filtered = dummyLocations.filter(loc =>
      loc.toLowerCase().includes(value.toLowerCase())
    );
    setLocationSuggestions(filtered);
  };

  const handleSubmit = async(e) => {
   
   e.preventDefault();

    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    formData.append('caption', caption);
    formData.append('location', location);
    formData.append('music', music);
 await createPost(formData)

  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <Card className="p-3 shadow-sm">
            {step === 1 && (
              <>
                <h5 className="mb-3">Select Photos or Videos</h5>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                  <Form.Control type="file" multiple accept="image/*,video/*" onChange={handleFileChange} />
                </Form.Group>
                {files.length > 0 && (
                  <Row>
                    {files.map((file, index) => (
                      <Col xs={4} md={3} key={index} className="mb-2">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`preview-${index}`}
                          className="img-fluid rounded"
                          style={{ height: '100px', objectFit: 'cover' }}
                        />
                      </Col>
                    ))}
                  </Row>
                )}
                <Button
                  className="mt-3 w-100"
                  onClick={() => setStep(2)}
                  disabled={files.length === 0}
                >
                  Next
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <h5 className="mb-3">Create Post</h5>

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

                <Form.Group className="mb-3 position-relative">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    value={location}
                    onChange={handleLocationSearch}
                    placeholder="Search location..."
                  />
                  {locationSuggestions.length > 0 && (
                    <div className="border rounded mt-1 p-2 bg-light position-absolute w-100" style={{ zIndex: 1000 }}>
                      {locationSuggestions.map((loc, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setLocation(loc);
                            setLocationSuggestions([]);
                          }}
                          style={{ cursor: 'pointer', padding: '4px 0' }}
                        >
                          {loc}
                        </div>
                      ))}
                    </div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Music</Form.Label>
                  <Form.Control
                    type="text"
                    value={music}
                    onChange={(e) => setMusic(e.target.value)}
                    placeholder="Add background music (optional)"
                  />
                </Form.Group>

                <div className="d-flex justify-content-between">
                  <Button variant="secondary" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button onClick={handleSubmit}>
                    Post
                  </Button>
                </div>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PostCreationPage;
