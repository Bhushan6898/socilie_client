import React, { useState, useRef } from "react";
import { Stage, Layer, Image as KonvaImage, Text } from "react-konva";
import useImage from "use-image";
import { Button, Badge } from "react-bootstrap";

// Component to render uploaded image
const UploadedImage = ({ src, width, height }) => {
  const [image] = useImage(src);
  return <KonvaImage image={image} width={width} height={height} />;
};

export default function StoryCreator() {
  const [allMedia, setAllMedia] = useState([]); // gallery
  const [selected, setSelected] = useState([]); // selected indexes
  const [multiSelect, setMultiSelect] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [caption, setCaption] = useState("");
  const stageRef = useRef();
  const canvasWidth = 300;
  const canvasHeight = 500;

  // Handle upload multiple files
  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((f) => ({
      url: URL.createObjectURL(f),
      type: f.type.startsWith("image/") ? "image" : "video",
    }));
    setAllMedia([...allMedia, ...urls]);
  };

  // Select / deselect
  const handleSelect = (index) => {
    if (!multiSelect) {
      setSelected([index]);
      setEditing(true);
      setCurrentIndex(index);
      return;
    }
    if (selected.includes(index)) {
      setSelected(selected.filter((i) => i !== index));
    } else {
      setSelected([...selected, index]);
    }
  };

  const goNext = () => {
    if (selected.length > 0) {
      setEditing(true);
      setCurrentIndex(selected[0]);
    }
  };

  const goBack = () => {
    setEditing(false);
    setSelected([]);
  };

  const saveStory = () => {
    // Save image or video with caption overlay
    if (allMedia[currentIndex].type === "image") {
      const uri = stageRef.current.toDataURL();
      const link = document.createElement("a");
      link.download = "story.png";
      link.href = uri;
      link.click();
    } else {
      // For video, just download the file (no overlay)
      const link = document.createElement("a");
      link.download = "story.mp4";
      link.href = allMedia[currentIndex].url;
      link.click();
    }
  };

  return (
    <div className="container py-3">
      {/* Instagram-style Add Story Button */}
      <div className="d-flex align-items-center mb-3">
        <div className="me-3">
          <label htmlFor="story-upload" style={{ cursor: "pointer" }}>
            <div className="position-relative d-inline-block">
              <img
                src="https://randomuser.me/api/portraits/men/10.jpg"
                alt="Your Story"
                className="rounded-circle border"
                style={{ width: 56, height: 56, objectFit: "cover", border: "2px solid #e1306c" }}
              />
              <span
                className="position-absolute bottom-0 end-0 bg-primary rounded-circle d-flex justify-content-center align-items-center"
                style={{ width: 22, height: 22, border: "2px solid #fff" }}
              >
                <i className="fas fa-plus text-white"></i>
              </span>
            </div>
            <input
              id="story-upload"
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleUpload}
              style={{ display: "none" }}
            />
          </label>
        </div>
        <h5 className="m-0">Create Story</h5>
        <Button variant="primary" className="ms-auto" onClick={goNext}>
          Next
        </Button>
      </div>

      {/* Horizontal Stories Bar */}
      {!editing && allMedia.length > 0 && (
        <div className="d-flex overflow-auto mb-3" style={{ gap: 16 }}>
          {allMedia.map((file, i) => (
            <div
              key={i}
              className="text-center"
              style={{ width: 70, cursor: "pointer" }}
              onClick={() => handleSelect(i)}
            >
              {file.type === "image" ? (
                <img
                  src={file.url}
                  alt="preview"
                  className="rounded-circle border"
                  style={{ width: 56, height: 56, objectFit: "cover", border: "2px solid #e1306c" }}
                />
              ) : (
                <video
                  src={file.url}
                  className="rounded-circle border"
                  style={{ width: 56, height: 56, objectFit: "cover", border: "2px solid #e1306c" }}
                  muted
                ></video>
              )}
              {selected.includes(i) && (
                <Badge
                  bg="primary"
                  pill
                  className="position-absolute top-0 end-0 m-1"
                >
                  {selected.indexOf(i) + 1}
                </Badge>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Gallery Grid (for multi select) */}
      {!editing && (
        <>
          <div className="mb-2">
            <Button
              variant={multiSelect ? "danger" : "outline-primary"}
              onClick={() => setMultiSelect(!multiSelect)}
            >
              {multiSelect ? "Cancel Multiple" : "Select Multiple"}
            </Button>
          </div>

          <div className="row g-2">
            {allMedia.map((file, i) => (
              <div
                key={i}
                className="col-4 position-relative"
                onClick={() => handleSelect(i)}
                style={{ cursor: "pointer" }}
              >
                {file.type === "image" ? (
                  <img
                    src={file.url}
                    alt="preview"
                    className="img-fluid rounded"
                  />
                ) : (
                  <video
                    src={file.url}
                    className="img-fluid rounded"
                    muted
                  ></video>
                )}

                {selected.includes(i) && (
                  <Badge
                    bg="primary"
                    pill
                    className="position-absolute top-0 end-0 m-1"
                  >
                    {selected.indexOf(i) + 1}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Editor */}
      {editing && allMedia.length > 0 && (
        <div className="d-flex flex-column align-items-center">
          <div style={{ position: 'relative', width: canvasWidth, height: canvasHeight }}>
            {allMedia[currentIndex].type === "image" ? (
              <Stage width={canvasWidth} height={canvasHeight} ref={stageRef} style={{ borderRadius: 20, overflow: 'hidden', border: '2px solid #e1306c' }}>
                <Layer>
                  <UploadedImage
                    src={allMedia[currentIndex].url}
                    width={canvasWidth}
                    height={canvasHeight}
                  />
                  {caption && (
                    <Text
                      text={caption}
                      x={20}
                      y={canvasHeight - 60}
                      fontSize={24}
                      fill="#fff"
                      fontStyle="bold"
                      shadowColor="#000"
                      shadowBlur={6}
                    />
                  )}
                </Layer>
              </Stage>
            ) : (
              <div style={{ position: 'relative', width: canvasWidth, height: canvasHeight }}>
                <video
                  src={allMedia[currentIndex].url}
                  controls
                  style={{ width: '100%', height: '100%', borderRadius: 20, border: '2px solid #e1306c', objectFit: 'cover' }}
                />
                {caption && (
                  <div style={{
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 24,
                    textShadow: '2px 2px 8px #000',
                  }}>{caption}</div>
                )}
              </div>
            )}
          </div>
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Add caption..."
            value={caption}
            onChange={e => setCaption(e.target.value)}
            maxLength={100}
          />
          {/* Navigation for multiple */}
          {selected.length > 1 && (
            <div className="d-flex justify-content-between w-100 mt-3">
              <Button
                disabled={currentIndex === selected[0]}
                onClick={() =>
                  setCurrentIndex(
                    selected[selected.indexOf(currentIndex) - 1] || selected[0]
                  )
                }
              >
                Prev
              </Button>
              <Button
                disabled={currentIndex === selected[selected.length - 1]}
                onClick={() =>
                  setCurrentIndex(
                    selected[selected.indexOf(currentIndex) + 1] ||
                      selected[selected.length - 1]
                  )
                }
              >
                Next
              </Button>
            </div>
          )}
          <Button variant="success" className="mt-3" onClick={saveStory}>
            Save Story
          </Button>
        </div>
      )}
    </div>
  );
}
