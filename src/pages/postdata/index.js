import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Camera, Film, Book,MusicNote } from "react-bootstrap-icons";

const ChooseTypePage = () => {
  const navigate = useNavigate();

  const options = [
    {
      title: "Post",
      desc: "Share photos with your followers",
      icon: <Camera size={40} className="text-black" />,
      path: "/create/post",
      variant: "primary",
    },
    {
      title: "Reel",
      desc: "Create short engaging videos",
      icon: <Film size={40} className="text-black" />,
      path: "/create/reel",
      variant: "success",
    },
    {
      title: "Story",
      desc: "Post moments that disappear in 24h",
      icon: <Book size={40} className="text-black" />,
      path: "/create/story",
      variant: "warning",
    },
   {
  title: "Music",
  desc: "Listen, explore and enjoy trending tracks anytime 🎶",
  icon: <MusicNote size={40} className="text-black" />,
  path: "/music",
  variant: "info",
}
  ];

  return (
    <div className="d-flex justify-content-center align-items-center w-100" style={{ minHeight: "80vh", paddingBottom: 70 }}>
      <div className="d-flex flex-wrap gap-4 justify-content-center">
        {options.map((item, i) => (
          <Card
            key={i}
            onClick={() => navigate(item.path)}
            className={`shadow-sm border-0 text-center hover-scale cursor-pointer rounded-4 bg-${item.variant}`}
            style={{
              width: "100px",
              padding: "15px",
              flex: "1 1 150px", // makes it responsive
            }}
          >
            <div className="mb-3">{item.icon}</div>
            <h5 className={`text-dark  fw-bold`}>{item.title}</h5>
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
            max-width: 200px;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
};

export default ChooseTypePage;
