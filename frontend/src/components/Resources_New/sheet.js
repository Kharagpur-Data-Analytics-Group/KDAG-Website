import { useRef, useEffect, useState, useContext } from "react";
import LoginPrompt from "./LoginPrompt";
import AuthStatus from "../AuthenticationPages/AuthStatus";
import "./course.css";
import { AuthContext } from "../../context/AuthContext";
const Chevron = ({ open }) => (
  <svg
    className={`dropdown-chevron${open ? " open" : ""}`}
    width="22"
    height="22"
    viewBox="0 0 22 22"
    style={{ verticalAlign: "middle" }}
  >
    <polyline
      points="7,6 12,11 7,16"
      fill="none"
      stroke="#ff4040"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DropdownSection = ({
  title,
  items,
  open,
  onToggle,
  onToggleCompleted,
  onToggleRevision,
}) => {

  const { isLoggedIn } = useContext(AuthContext);
  const [showPrompt, setShowPrompt] = useState(false);
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("0px");
  const [shouldRender, setShouldRender] = useState(open);

  const completed = items.filter((i) => i.completed).length;
  const total = items.length;
  const progressPercent = total > 0 ? (completed / total) * 100 : 0;

  useEffect(() => {
  
    setShowPrompt(false);
    if (open) {
      setShouldRender(true);
      setTimeout(() => {
        if (contentRef.current) {
          setMaxHeight(contentRef.current.scrollHeight + "px");
        }
      }, 10);
    } else {
      if (contentRef.current) {
        setMaxHeight(contentRef.current.scrollHeight + "px");
      }
      setTimeout(() => {
        setMaxHeight("0px");
      }, 10);
      const timeout = setTimeout(() => setShouldRender(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  const handleCheckboxClick = (idx) => {
    if (!isLoggedIn) {
      setShowPrompt(true);
      return;
    }
    onToggleCompleted(idx);
  };

  const handleRevisionClick = (idx) => {
    if (!isLoggedIn) {
      setShowPrompt(true);
      return;
    }
    onToggleRevision(idx);
  };

  return (
    <div className="dropdown-section">
      <LoginPrompt open={showPrompt} onClose={() => setShowPrompt(false)} />
      <div className="dropdown-header" onClick={onToggle}>
        <Chevron open={open} />
        <span className="dropdown-title">{title}</span>
        <div className="dropdown-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="progress-text">{`${completed} / ${total}`}</span>
        </div>
      </div>
      <div
        ref={contentRef}
        className="dropdown-content"
        style={{
          maxHeight,
          overflow: "hidden",
          transition: "max-height 0.4s ease",
        }}
      >
        {shouldRender && (
          <div className="content-inner">
            <table className="custom-table">
              <thead>
                <tr>
                  <th className="status-heading">Status</th>
                  <th className="subtopic">Subtopic</th>
                  <th>Resources</th>
                  <th>Revision</th>
                  <th>Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="center checkbox-cell">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => handleCheckboxClick(idx)}
                        className="checkbox"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td className="center-icon">
                      {item.resource ? (
                        <a
                          href={`http://127.0.0.1:5000/docx/view_gdoc?url=${encodeURIComponent(item.resource)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#ff4040", textDecoration: "underline" }}
                        >
                          Link
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="center">
                      <button
                        className={`bookmark-btn${
                          item.revision ? " active" : ""
                        }`}
                        aria-label="Toggle Revision"
                        onClick={() => handleRevisionClick(idx)}
                        type="button"
                      >
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill={item.revision ? "#ff4040" : "#bbb"}
                          stroke={item.revision ? "#ff4040" : "#bbb"}
                          xmlns="http://www.w3.org/2000/svg"
                          style={{
                            filter: item.revision
                              ? "drop-shadow(0 0 4px #ff4040aa)"
                              : "none",
                            transition: "fill 0.2s, stroke 0.2s",
                          }}
                        >
                          <path
                            d="M6 3C4.89543 3 4 3.89543 4 5V19C4 19.5523 4.44772 20 5 20C5.27614 20 5.52614 19.8611 5.70711 19.6464L11 13.382L16.2929 19.6464C16.4739 19.8611 16.7239 20 17 20C17.5523 20 18 19.5523 18 19V5C18 3.89543 17.1046 3 16 3H6Z"
                            fill={item.revision ? "#ff4040" : "#bbb"}
                            stroke={item.revision ? "#ff4040" : "#bbb"}
                            strokeWidth="1.5"
                          />
                        </svg>
                      </button>
                    </td>
                    <td className="center-icon">
                      {item.difficulty ? (
                        <span
                          className={`difficulty-tag difficulty-${item.difficulty.toLowerCase()}`}
                        >
                          {item.difficulty}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownSection;
