import React, { useRef, useState } from "react";
import { Stage, Layer, Image as KonvaImage, Text } from "react-konva";
import useImage from "use-image";
import { FiType, FiSmile, FiSave } from "react-icons/fi";
import { FaFont } from "react-icons/fa";

import EmojiPicker from "emoji-picker-react";
import { ChromePicker } from "react-color";

// Component to display uploaded image
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
    const canvasHeight = 600;

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setUpload(url);
            setFileType(file.type.startsWith("image/") ? "image" : "video");
        }
    };

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
        <div className="container py-4 d-flex justify-content-center" >
            {/* Story Editor */}
            <div className="position-relative" style={{  paddingBottom:100}}>
                <div
                    style={{
                        width: canvasWidth,
                        height: canvasHeight,
                        border: "2px solid #ddd",
                        borderRadius: "15px",
                        overflow: "hidden",
                        position: "relative",
                        
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
                                        fontSize={15}
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
                            className="w-100 h-100 object-fit-cover"
                        />
                    )}
                </div>

                {/* Vertical Icon Toolbar */}
                <div
                    className="d-flex  gap-2 position-relative"
                    style={{ top: "10px", right: "-10px" }}
                >
                    {/* Upload */}
                    <label className="btn btn-outline-secondary p-2 mb-2">
                        📤
                        <input
                            type="file"
                            accept="image/*,video/*"
                            onChange={handleUpload}
                            style={{ display: "none" }}
                        />
                    </label>

                    {/* Text */}
                    <button
                        className="btn btn-outline-primary p-2"
                        onClick={() => setShowTextInput(!showTextInput)}
                    >
                        <FiType size={22} />
                    </button>

                    {/* Emoji */}
                    <button
                        className="btn btn-outline-warning p-2"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                        <FiSmile size={22} />
                    </button>

                    {/* Font */}
                    <button
                        className="btn btn-outline-secondary p-2"
                        onClick={() => setShowFontPicker(!showFontPicker)}
                    >
                        <FaFont size={22} />
                    </button>

                    {/* Color */}
                    <button
                        className="btn btn-outline-danger p-2"
                        onClick={() => setShowColorPicker(!showColorPicker)}
                    >
                        🎨
                    </button>

                    {/* Save */}
                    <button className="btn btn-success p-2 mt-2" onClick={saveStory}>
                        <FiSave size={22} />
                    </button>
                </div>

                {/* Text Input Popup */}
                {showTextInput && (
                    <div
                        className="position-absolute p-2 bg-white border rounded"
                        style={{ top: "10px", left:  20, width: "200px" }}
                    >
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Type your text..."
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                        />
                        <button className="btn btn-primary w-100" onClick={() => addText()}>
                            Add
                        </button>
                    </div>
                )}

                {/* Emoji Picker */}
                {showEmojiPicker && (
                    <div
                        className="position-absolute"
                        style={{ top: "60px", left: canvasWidth + 20 }}
                    >
                        <EmojiPicker onEmojiClick={onEmojiClick} />
                    </div>
                )}

                {/* Font Picker */}
                {showFontPicker && (
                    <div
                        className="position-absolute p-2 bg-white border rounded"
                        style={{ top: "200px", left: canvasWidth + 20, width: "220px", maxHeight: "400px", overflowY: "auto" }}
                    >
                        <select
                            className="form-select"
                            value={font}
                            onChange={(e) => setFont(e.target.value)}
                            size={10} // show multiple options at once
                        >
                            {[
                                "Arial",
                                "Verdana",
                                "Helvetica",
                                "Times New Roman",
                                "Courier New",
                                "Georgia",
                                "Palatino",
                                "Garamond",
                                "Bookman",
                                "Comic Sans MS",
                                "Trebuchet MS",
                                "Arial Black",
                                "Impact",
                                "Lucida Sans",
                                "Tahoma",
                                "Century Gothic",
                                "Lucida Console",
                                "Monaco",
                                "Brush Script MT",
                                "Candara",
                                "Optima",
                                "Didot",
                                "Rockwell",
                                "Gill Sans",
                                "Futura",
                                "Consolas",
                                "Geneva",
                                "Copperplate",
                                "American Typewriter",
                                "PT Sans"
                            ].map((f) => (
                                <option key={f} value={f} style={{ fontFamily: f }}>
                                    {f}
                                </option>
                            ))}
                        </select>
                    </div>
                )}



                {/* Color Picker */}
                {showColorPicker && (
                    <div
                        className="position-absolute p-2 bg-white border rounded"
                        style={{ top: "300px", left: canvasWidth + 20 }}
                    >
                        <ChromePicker color={color} onChange={(c) => setColor(c.hex)} />
                    </div>
                )}
            </div>
        </div>
    );
}
