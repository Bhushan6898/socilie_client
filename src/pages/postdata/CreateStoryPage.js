import React, { useRef, useState } from "react";
import { Stage, Layer, Image as KonvaImage, Text } from "react-konva";
import useImage from "use-image";
import { FiType, FiSmile, FiSave } from "react-icons/fi";
import { FaFont } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { ChromePicker } from "react-color";

// Component to render uploaded image
const UploadedImage = ({ src, width, height }) => {
  const [image] = useImage(src);
  return <KonvaImage image={image} width={width} height={height} />;
};

export default function StoryCreator() {
  const [upload, setUpload] = useState(null);
  const [fileType, setFileType] = useState(""); // image | video
  const [texts, setTexts] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [font, setFont] = useState("Arial");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);
  const [showFontPicker, setShowFontPicker] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const stageRef = useRef();
  const canvasWidth = 300;
  const canvasHeight = 500;

  // Handle file upload
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUpload(url);
      setFileType(file.type.startsWith("image/") ? "image" : "video");
    }
  };

  // Add text or emoji
  const addText = (text = null) => {
    const finalText = text || textInput || "";
    if (!finalText.trim()) return;
    setTexts([
      ...texts,
      { x: 50, y: 50, text: finalText, color, font, id: Date.now() },
    ]);
    setTextInput("");
    setShowTextInput(false);
  };

  // Save story (image only for now)
  const saveStory = () => {
    if (fileType === "image") {
      const uri = stageRef.current.toDataURL();
      const link = document.createElement("a");
      link.download = "story.png";
      link.href = uri;
      link.click();
    } else {
      alert("Saving video stories requires server-side processing.");
    }
  };

  const onEmojiClick = (emojiObject) => {
    addText(emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="container py-4 d-flex flex-column align-items-center">
      {/* Story Preview Area */}
      <div
        className="border rounded shadow position-relative"
        style={{
          width: canvasWidth,
          height: canvasHeight,
          overflow: "hidden",
          background: "#000",
        }}
      >
        {fileType === "image" && (
          <Stage width={canvasWidth} height={canvasHeight} ref={stageRef}>
            <Layer>
              <UploadedImage
                src={upload}
                width={canvasWidth}
                height={canvasHeight}
              />
              {texts.map((t) => (
                <Text
                  key={t.id}
                  x={t.x}
                  y={t.y}
                  text={t.text}
                  fontSize={18}
                  fill={t.color}
                  fontFamily={t.font}
                  draggable
                />
              ))}
            </Layer>
          </Stage>
        )}
        {fileType === "video" && (
          <video
            src={upload}
            controls
            autoPlay
            loop
            muted
            className="w-100 h-100"
          />
        )}
      </div>

      {/* Bottom Toolbar */}
      <div className="d-flex justify-content-around w-100 mt-3">
        {/* Upload */}
        <label className="btn btn-outline-light">
          📤
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleUpload}
            hidden
          />
        </label>

        {/* Text */}
        <button
          className="btn btn-outline-primary"
          onClick={() => setShowTextInput(!showTextInput)}
        >
          <FiType size={20} />
        </button>

        {/* Emoji */}
        <button
          className="btn btn-outline-warning"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <FiSmile size={20} />
        </button>

        {/* Font */}
        <button
          className="btn btn-outline-secondary"
          onClick={() => setShowFontPicker(!showFontPicker)}
        >
          <FaFont size={20} />
        </button>

        {/* Color */}
        <button
          className="btn btn-outline-danger"
          onClick={() => setShowColorPicker(!showColorPicker)}
        >
          🎨
        </button>

        {/* Save */}
        <button className="btn btn-success" onClick={saveStory}>
          <FiSave size={20} />
        </button>
      </div>

      {/* Popups */}
      {showTextInput && (
        <div className="mt-3 p-3 bg-light rounded shadow w-100">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Type your text..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <button className="btn btn-primary w-100" onClick={() => addText()}>
            Add Text
          </button>
        </div>
      )}

      {showEmojiPicker && (
        <div className="mt-3 bg-light p-2 rounded shadow">
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}

      {showFontPicker && (
        <div className="mt-3 bg-light p-3 rounded shadow w-100">
          <select
            className="form-select"
            value={font}
            onChange={(e) => setFont(e.target.value)}
          >
            {[
              "Arial",
              "Verdana",
              "Helvetica",
              "Times New Roman",
              "Courier New",
              "Georgia",
              "Comic Sans MS",
              "Trebuchet MS",
              "Impact",
              "Lucida Sans",
              "Tahoma",
              "Century Gothic",
              "Consolas",
              "Futura",
              "Copperplate",
            ].map((f) => (
              <option key={f} value={f} style={{ fontFamily: f }}>
                {f}
              </option>
            ))}
          </select>
        </div>
      )}

      {showColorPicker && (
        <div className="mt-3 bg-light p-2 rounded shadow">
          <ChromePicker color={color} onChange={(c) => setColor(c.hex)} />
        </div>
      )}
    </div>
  );
}
