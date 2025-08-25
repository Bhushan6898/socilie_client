import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const templates = [
  { id: 0, name: "None", style: { filter: "none" } },
  { id: 1, name: "Classic", style: { filter: "none" } },
  { id: 2, name: "Vintage", style: { filter: "sepia(0.6)" } },
  { id: 3, name: "Cool Blue", style: { filter: "contrast(1.2) brightness(1.1) hue-rotate(200deg)" } },
  { id: 4, name: "Black & White", style: { filter: "grayscale(1)" } },
  { id: 5, name: "Vibrant", style: { filter: "saturate(1.5) contrast(1.2)" } },
];

const ReelTemplatePage = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selected !== null) {
      navigate(`/create/reel`, { state: { template: templates[selected] } });
    }
  };

  return (
    <div className="container py-4 text-white">
      <h3 className="text-center mb-4">🎬 Choose a Template</h3>
      <div className="row g-3">
        {templates.map((tpl, idx) => (
          <div className="col-6 col-md-4 col-lg-3" key={tpl.id}>
            <Card
              className={`text-center shadow-sm border-3 ${
                selected === idx ? "border-primary" : "border-dark"
              }`}
              style={{ cursor: "pointer", borderRadius: "15px", background: "#222" }}
              onClick={() => setSelected(idx)}
            >
              <div
                className="rounded-top"
                style={{ height: "120px", background: "#444", ...tpl.style }}
              />
              <Card.Body>
                <Card.Title className="fs-6">{tpl.name}</Card.Title>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center mt-4">
        <Button
          disabled={selected === null}
          onClick={handleContinue}
          className="px-5 py-2 fw-bold"
        >
          Continue →
        </Button>
      </div>
    </div>
  );
};

export default ReelTemplatePage;
