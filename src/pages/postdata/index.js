import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Camera, Film, Book } from "react-bootstrap-icons";

const ChooseTypePage = () => {
  const navigate = useNavigate();

  const options = [
    {
      title: "Post",
      desc: "Share photos with your followers",
      icon: <Camera size={40} className="text-primary" />,
      path: "/create/post",
      variant: "primary",
    },
    {
      title: "Reel",
      desc: "Create short engaging videos",
      icon: <Film size={40} className="text-success" />,
      path: "/create/reel",
      variant: "success",
    },
    {
      title: "Story",
      desc: "Post moments that disappear in 24h",
      icon: <Book size={40} className="text-warning" />,
      path: "/create/story",
      variant: "warning",
    },
    {
      title: "Music",
      desc: "Post moments that disappear in 24h",
      icon: <Book size={40} className="text-black" />,
      path: "/music",
      variant: "warning",
    },
  ];

  return (
    <div className="d-flex justify-content-center align-items-center w-100" style={{ minHeight: "80vh", paddingBottom: 70 }}>
      <div className="d-flex flex-wrap gap-4 justify-content-center">
        {options.map((item, i) => (
          <Card
            key={i}
            onClick={() => navigate(item.path)}
            className={`shadow-sm border-0 text-center hover-scale cursor-pointer bg-light rounded-4`}
            style={{
              width: "200px",
              padding: "20px",
              flex: "1 1 200px", // makes it responsive
            }}
          >
            <div className="mb-3">{item.icon}</div>
            <h5 className={`text-${item.variant} fw-bold`}>{item.title}</h5>
            <p className="text-muted small">{item.desc}</p>
          </Card>
        ))}
      </div>

      {/* CSS for hover + responsive */}
      <style>{`
        .hover-scale {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-scale:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 6px 18px rgba(0,0,0,0.15);
        }
        .cursor-pointer {
          cursor: pointer;
        }

        /* Mobile styling */
        @media (max-width: 576px) {
          .hover-scale {
            width: 100% !important;
            max-width: 300px;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
};

export default ChooseTypePage;
