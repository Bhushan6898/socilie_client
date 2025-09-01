import React, { useState, useRef } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useUser } from "../../hook/user/useUser.js";
import MusicList from "./addmusic.js";

const templates = [
    { id: 1, name: "None", style: { filter: "none" } },
    { id: 2, name: "Vintage", style: { filter: "sepia(0.6)" } },
    { id: 3, name: "Cool Blue", style: { filter: "contrast(1.2) brightness(1.1) hue-rotate(200deg)" } },
    { id: 4, name: "Black & White", style: { filter: "grayscale(1)" } },
    { id: 5, name: "Vibrant", style: { filter: "saturate(1.5) contrast(1.2)" } },
    { id: 6, name: "Warm", style: { filter: "brightness(1.1) sepia(0.3)" } },
    { id: 7, name: "Retro", style: { filter: "contrast(0.9) sepia(0.5) hue-rotate(-15deg)" } },
    { id: 8, name: "Faded", style: { filter: "brightness(1.2) contrast(0.8)" } },
    { id: 9, name: "Golden", style: { filter: "sepia(0.8) saturate(1.3)" } },
    { id: 10, name: "Deep Contrast", style: { filter: "contrast(1.4) saturate(1.2)" } },
    { id: 11, name: "Night", style: { filter: "brightness(0.7) contrast(1.3)" } },
    { id: 12, name: "Dreamy", style: { filter: "blur(1px) brightness(1.1) saturate(1.2)" } },
    { id: 13, name: "Ocean", style: { filter: "hue-rotate(180deg) saturate(1.2) brightness(1.1)" } },
    { id: 14, name: "Rose", style: { filter: "hue-rotate(-20deg) saturate(1.4)" } },
    { id: 15, name: "Pastel", style: { filter: "saturate(0.8) brightness(1.2)" } },
    { id: 16, name: "High Contrast", style: { filter: "contrast(2) brightness(0.9)" } },
    { id: 17, name: "Shadow", style: { filter: "brightness(0.8) contrast(1.1)" } },
    { id: 18, name: "Neon", style: { filter: "brightness(1.2) contrast(1.5) saturate(1.8)" } },
    { id: 19, name: "Sunset", style: { filter: "hue-rotate(25deg) saturate(1.5) brightness(1.1)" } },
    { id: 20, name: "Moody", style: { filter: "contrast(1.2) brightness(0.8) sepia(0.2)" } },
    { id: 21, name: "Soft Glow", style: { filter: "brightness(1.15) blur(0.5px)" } },
];


const CreateReelPage = () => {
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState("");
    const [music, setMusic] = useState("");
    const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
    const [step, setStep] = useState(1);
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
        formData.append("template", selectedTemplate.name);

        await createPost(formData);
    };

    // Sync play/pause between video & music
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

    const nextStep = () => setStep((s) => Math.min(s + 1, 5));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    return (
        <div className="create-reel-page d-flex align-items-center justify-content-center min-vh-100 bg-dark text-white">
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={8} lg={6}>
                        <Card className="p-4 shadow-lg border-0 rounded-4 bg-dark text-light">
                            <h3 className="text-center fw-bold mb-4">🎬 Create Reel</h3>

                            <Form onSubmit={handleSubmit}>
                                {/* Step 1: Upload Video */}
                                {/* Step 1: Upload Video + Live Preview */}
                                {step === 1 && (
                                    <>
                                        <Form.Group className="mb-3">
                                            <div className="upload-box d-flex flex-column align-items-center justify-content-center rounded-4 border border-secondary p-4 text-center">
                                                <Form.Label className="w-100 mb-2 fw-semibold">
                                                    {file ? "Change Video" : "Upload Reel Video"}
                                                </Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    accept="video/*"
                                                    onChange={handleFileChange}
                                                    className="d-none"
                                                    id="file-upload"
                                                />
                                                <label
                                                    htmlFor="file-upload"
                                                    className="btn btn-outline-light px-4"
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    {file ? "📂 Replace" : "⬆️ Upload"}
                                                </label>
                                            </div>
                                        </Form.Group>

                                        {/* Show preview immediately if file exists */}
                                        {file && (
                                            <div className="preview-box text-center mt-3">
                                                <video
                                                    src={URL.createObjectURL(file)}
                                                    className="rounded-4 shadow-sm"
                                                    style={{
                                                        width: "100%",
                                                        maxHeight: "300px",
                                                        objectFit: "cover",
                                                    }}
                                                    controls
                                                />
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* Step 2: Template Selector + Live Preview */}
                                {step === 2 && (
                                    <>
                                        <div className="template-scroll mb-3 d-flex gap-2 overflow-auto">
                                            {templates.map((tpl) => (
                                                <div
                                                    key={tpl.id}
                                                    className={`p-2 rounded border ${selectedTemplate.id === tpl.id ? "border-primary" : "border-secondary"
                                                        }`}
                                                    style={{ cursor: "pointer", minWidth: "100px", textAlign: "center", background: "#222" }}
                                                    onClick={() => setSelectedTemplate(tpl)}
                                                >
                                                    <div
                                                        className="rounded-3"
                                                        style={{
                                                            height: "60px",
                                                            background: "#444",
                                                            ...tpl.style,
                                                        }}
                                                    />
                                                    <small>{tpl.name}</small>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Show video preview with selected filter */}
                                        {file && (
                                            <div className="preview-box text-center mt-3">
                                                <video
                                                    src={URL.createObjectURL(file)}
                                                    className="rounded-4 shadow-sm"
                                                    style={{
                                                        width: "100%",
                                                        maxHeight: "300px",
                                                        objectFit: "cover",
                                                        ...selectedTemplate.style,
                                                    }}
                                                    controls
                                                />
                                            </div>
                                        )}
                                    </>
                                )}


                                {/* Step 3: Select Music */}
                                {step === 3 && (
                                    <Form.Group className="mb-4">
                                        <MusicList onSelect={setSelectedSong} />
                                    </Form.Group>
                                )}

                                {/* Step 4: Caption + Preview */}
                                {step === 4 && (
                                    <>
                                        {file && (
                                            <div className="preview-box text-center mb-3">
                                                <video
                                                    ref={videoRef}
                                                    src={URL.createObjectURL(file)}
                                                    className="rounded-4 shadow-sm"
                                                    style={{
                                                        width: "100%",
                                                        maxHeight: "400px",
                                                        objectFit: "cover",
                                                        ...selectedTemplate.style,
                                                    }}
                                                    controls
                                                    muted={!!music} // mute original sound if music is selected
                                                    onPlay={handleVideoPlay}
                                                    onPause={handleVideoPause}
                                                />
                                                {music && <audio ref={audioRef} src={music} loop preload="auto" />}
                                            </div>
                                        )}

                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-semibold">Caption</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={2}
                                                value={caption}
                                                onChange={(e) => setCaption(e.target.value)}
                                                placeholder="Write something catchy..."
                                                className="rounded-3"
                                            />
                                        </Form.Group>
                                    </>
                                )}

                                {/* Step 5: Share */}
                                {step === 5 && (
                                    <div className="text-center">
                                        <p className="fw-semibold mb-3">✅ Ready to Share your Reel?</p>
                                        <Button type="submit" className="w-100 fw-bold py-2 rounded-3 share-btn">
                                            🚀 Share Reel
                                        </Button>
                                    </div>
                                )}

                                {/* Navigation Buttons */}
                                <div className="d-flex justify-content-between mt-4">
                                    {step > 1 && (
                                        <Button variant="secondary" onClick={prevStep} className="rounded-3 px-4">
                                            ⬅ 
                                        </Button>
                                    )}
                                    {step < 5 && (
                                        <Button variant="secondary" onClick={nextStep} className="rounded-3 px-4 ms-auto">
                                             ➡
                                        </Button>
                                    )}
                                </div>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Extra Styles */}
            <style>{`
        .create-reel-page {
          background: linear-gradient(120deg, #726565ff, #1c1c1c);
          border-radius: 15px;
        }

        .upload-box {
          background: rgba(255, 255, 255, 0.05);
        }

        .share-btn {
          background: linear-gradient(45deg, #f58529, #dd2a7b, #8134af, #515bd4);
          border: none;
          color: white;
          transition: all 0.3s ease-in-out;
        }

        .share-btn:hover {
          opacity: 0.9;
          transform: scale(1.03);
        }

        .template-scroll {
          white-space: nowrap;
        }
      `}</style>
        </div>
    );
};

export default CreateReelPage;
