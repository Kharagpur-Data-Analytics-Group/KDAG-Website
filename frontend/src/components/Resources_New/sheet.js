import { useRef, useEffect, useState } from "react";
import "./course.css";
import Star from "./RevisionIcon.js";

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

const DropdownSection = ({ title, items, open, onToggle, onToggleCompleted }) => {
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("0px");
  const [shouldRender, setShouldRender] = useState(open);

  const completed = items.filter(i => i.completed).length;
  const total = items.length;
  const progressPercent = total > 0 ? (completed / total) * 100 : 0;

  useEffect(() => {
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

  return (
    <div className="dropdown-section">
      <div className="dropdown-header" onClick={onToggle}>
        <Chevron open={open} />
        <span className="dropdown-title">{title}</span>
        <div className="dropdown-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
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
          transition: "max-height 0.4s ease"
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
                    <td className="center">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => onToggleCompleted(idx)}
                        className="checkbox"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td className="center-icon">
                      {item.resource ? (
                        <a href={item.resource} target="_blank" rel="noreferrer">Link</a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="center-icon">
                      <Star />
                    </td>
                    <td className="center-icon">
                      {item.difficulty ? (
                        <span className={`difficulty-tag difficulty-${item.difficulty.toLowerCase()}`}>
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
