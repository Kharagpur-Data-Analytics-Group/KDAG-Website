import { useRef, useEffect, useState } from "react";

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
                  <th>Status</th>
                  <th>Subtopic</th>
                  <th>Resources</th>
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
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>
                      {item.resource ? (
                        <a href={item.resource} target="_blank" rel="noreferrer">Link</a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td>{item.difficulty}</td>
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
