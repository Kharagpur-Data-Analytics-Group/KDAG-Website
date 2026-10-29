import { useRef, useEffect, useState, useContext } from "react";
import LoginPrompt from "./LoginPrompt";
import AuthStatus from "../AuthenticationPages/AuthStatus";
import { AuthContext } from "../../context/AuthContext";
const difficultyStyles = {
  easy: "[background:linear-gradient(145deg,_#00ff99,_#00cc77)]! [color:#0a0a0a]! [box-shadow:0_0_8px_#00ff9966]!",
  medium: "[background:linear-gradient(145deg,_#ffe066,_#ffc400)]! [color:#0a0a0a]! [box-shadow:0_0_8px_#ffc40066]!",
  hard: "[background:linear-gradient(145deg,_#ff3b3b,_#c30000)]! [color:#ffffff]! [box-shadow:0_0_8px_#ff3b3b66]!",
};

const Chevron = ({
  open
}) => <svg className={`dropdown-chevron [transition:transform_0.3s_cubic-bezier(0.4,_0,_0.2,_1)]! [margin:0_2px]! [height:1.3em]! [width:1.3em]! [display:inline-block]! [&_polyline]:[stroke:#ff4040]! [&.open]:[transform:rotate(90deg)]! ${open ? "open" : ""} `} width="22" height="22" viewBox="0 0 22 22" style={{
  verticalAlign: "middle"
}}>
    <polyline points="7,6 12,11 7,16" fill="none" stroke="#ff4040" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
const DropdownSection = ({
  title,
  items,
  open,
  onToggle,
  onToggleCompleted,
  onToggleRevision
}) => {
  const {
    isLoggedIn
  } = useContext(AuthContext);
  const [showPrompt, setShowPrompt] = useState(false);
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("0px");
  const [shouldRender, setShouldRender] = useState(open);
  const completed = items.filter(i => i.completed).length;
  const total = items.length;
  const progressPercent = total > 0 ? completed / total * 100 : 0;
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
  const handleCheckboxClick = idx => {
    if (!isLoggedIn) {
      setShowPrompt(true);
      return;
    }
    onToggleCompleted(idx);
  };
  const handleRevisionClick = idx => {
    if (!isLoggedIn) {
      setShowPrompt(true);
      return;
    }
    onToggleRevision(idx);
  };
  return <div className="dropdown-section [background:rgba(12,_0,_0,_0.85)]! [margin:18px_auto]! [width:92%]! [max-width:980px]! [border-radius:16px]! [box-shadow:0_0_12px_rgba(255,_50,_50,_0.2),_0_0_28px_rgba(255,_10,_10,_0.08)]! [border:1.5px_solid_rgba(255,_64,_64,_0.25)]! [transition:box-shadow_0.3s_ease]! [opacity:0.95]! max-[768.01px]:[margin:5px]! max-[768.01px]:[width:97%]!"><style>{"@keyframes spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@keyframes custom-spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\ninput[type=\"checkbox\"] {\n  width: 18px;\n  height: 18px;\n  accent-color: #ff3333;\n  cursor: pointer;\n  filter: drop-shadow(0 0 2px #ff333377);\n}"}</style>
      <LoginPrompt open={showPrompt} onClose={() => setShowPrompt(false)} />
      <div className="dropdown-header [display:flex]! [align-items:center]! [padding:22px]! [cursor:pointer]! [border-radius:16px]! [border-bottom:1px_solid_#ff1a1a44]! [gap:18px]! [&:hover]:[background:linear-gradient(90deg,_#300008_0%,_#4d000f_100%)]! [&:hover]:[box-shadow:0_0_10px_#ff1a1a33]! max-[768.01px]:[width:100%]!" onClick={onToggle}>
        <Chevron open={open} />
        <span className="dropdown-title [font-family:'JetBrains_Mono',_monospace]! [font-weight:800]! [font-size:1.45rem]! [color:#ff3333]! [text-shadow:0_0_12px_rgba(255,_50,_50,_0.6)]! [vertical-align:middle]! [margin-right:auto]! [white-space:normal]! [word-wrap:break-word]! [overflow:visible]! [max-width:calc(100%_-_160px)]! max-[768.01px]:[font-size:1.9rem]!">{title}</span>
        <div className="dropdown-progress [display:flex]! [align-items:center]! [gap:14px]! [min-width:150px]!">
          <div className="progress-bar [height:8px]! [flex:1]! [background-color:rgb(0,_0,_0)]! [border-radius:8px]! [border:1px_solid_#ff4d4d33]! [box-shadow:inset_0_0_4px_#ff4d4d22]! [overflow:hidden]!">
            <div className="progress-fill [height:100%]! [background:linear-gradient(90deg,_#ff5e5e_0%,_#ff1a1a_40%,_#ff0066_100%)]! [border-radius:8px]! [transition:width_0.4s_ease]! [box-shadow:0_0_8px_#ff4d4d88]!" style={{
            width: `${progressPercent}%`
          }} />
          </div>
          <span className="progress-text [font-family:'JetBrains_Mono',_monospace]! [font-size:0.92rem]! [color:#ff7b7b]! [font-weight:bold]! max-[768.01px]:[font-size:0.8rem]!">{`${completed} / ${total}`}</span>
        </div>
      </div>
      <div ref={contentRef} className="dropdown-content [background:#0f0006]! [border-radius:16px]!" style={{
      maxHeight,
      overflow: "hidden",
      transition: "max-height 0.4s ease"
    }}>
        {shouldRender && <div className="content-inner [padding:22px]! [overflow-x:auto]! max-[768.01px]:[padding:10px]! max-[768.01px]:[overflow-x:auto]!">
            <table className="custom-table [width:100%]! [border-collapse:collapse]! [font-size:0.96rem]! [color:#f3f3f3]! [font-family:'Fira_Code',_monospace]! [min-width:640px]! [&_th]:[padding:14px_12px]! [&_th]:[border-bottom:1px_solid_#3a0a13]! [&_th]:[vertical-align:middle]! [&_td]:[padding:14px_12px]! [&_td]:[border-bottom:1px_solid_#3a0a13]! [&_td]:[vertical-align:middle]! [&_th]:[font-family:'JetBrains_Mono',_monospace]! [&_th]:[font-size:0.82rem]! [&_th]:[color:#ff6666]! [&_th]:[background:#1c0008]! [&_th]:[text-transform:uppercase]! [&_th]:[font-weight:600]! [&_th]:[letter-spacing:0.05em]! [&_td]:[font-family:'Inter',_monospace]! [&_td]:[font-weight:500]! [&_td]:[color:#f1f1f1]! [&_tbody_tr:hover]:[background-color:rgba(255,_30,_30,_0.05)]! [&_a]:[color:#ff4d4d]! [&_a]:[font-weight:600]! [&_a]:[text-decoration:underline]! [&_a]:[transition:color_0.2s]! [&_a:hover]:[color:#ff9c9c]! max-[768.01px]:[font-size:0.85rem]! max-[768.01px]:[min-width:100%]! max-[768.01px]:[&_th]:[padding:8px_6px]! max-[768.01px]:[&_th]:[font-size:0.85rem]! max-[768.01px]:[&_td]:[padding:8px_6px]! max-[768.01px]:[&_td]:[font-size:0.85rem]!">
              <thead>
                <tr>
                  <th className="center-th [.custom-table_th&]:[text-align:center]!">Status</th>
                  <th className="subtopic">Subtopic</th>
                  <th className="center-th [.custom-table_th&]:[text-align:center]!"> Resources</th>
                  <th className="center-th [.custom-table_th&]:[text-align:center]!">Revision</th>
                  <th className="center-th [.custom-table_th&]:[text-align:center]!">Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => <tr key={idx}>
                    <td className="center [td&.checkbox-cell]:[padding-top:18px]! [td&.checkbox-cell]:[padding-bottom:10px]! [.custom-table_td&]:[text-align:center]! checkbox-cell">
                      <input type="checkbox" checked={item.completed} onChange={() => handleCheckboxClick(idx)} className="checkbox" />
                    </td>
                    <td>{item.name}</td>
                    <td className="center-icon [text-align:center]! [vertical-align:middle]! [height:100%]! [&_>_*]:[display:inline-block]! [&_>_*]:[vertical-align:middle]!">
                      {item.resource ? <a href={isLoggedIn ? item.resource : "#"} target="_blank" rel="noopener noreferrer" style={{
                  color: "#ff4040",
                  textDecoration: "underline",
                  cursor: "pointer"
                }} onClick={e => {
                  if (!isLoggedIn) {
                    e.preventDefault(); // stop navigation
                    setShowPrompt(true); // show your warning/prompt
                    return;
                  }
                }}>
                          Link
                        </a> : "—"}
                    </td>

                    <td className="center [td&.checkbox-cell]:[padding-top:18px]! [td&.checkbox-cell]:[padding-bottom:10px]! [.custom-table_td&]:[text-align:center]!">
                      <button className={`bookmark-btn [td.center_&]:[display:flex]! [td.center_&]:[justify-content:center]! [td.center_&]:[align-items:center]! [td.center_&]:[width:100%]! [background:none]! [border:none]! [cursor:pointer]! [padding:0]! [outline:none]! [transition:filter_0.2s]! [display:flex]! [align-items:center]! [justify-content:center]! [&_svg]:[display:block]! [&_svg]:[width:22px]! [&_svg]:[height:22px]! [&.active_svg]:[filter:drop-shadow(0_0_6px_#ff4040aa)]! [&.active_svg]:[stroke:#ff4d4d]! [&.active_svg]:[fill:#ff4d4d]! [&:focus]:[outline:2px_solid_#ff4040]! max-[768.01px]:[&_svg]:[width:18px]! max-[768.01px]:[&_svg]:[height:18px]! ${item.revision ? "active" : ""} `} aria-label="Toggle Revision" onClick={() => handleRevisionClick(idx)} type="button">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill={item.revision ? "#ff4040" : "#bbb"} stroke={item.revision ? "#ff4040" : "#bbb"} xmlns="http://www.w3.org/2000/svg" style={{
                    filter: item.revision ? "drop-shadow(0 0 4px #ff4040aa)" : "none",
                    transition: "fill 0.2s, stroke 0.2s"
                  }}>
                          <path d="M6 3C4.89543 3 4 3.89543 4 5V19C4 19.5523 4.44772 20 5 20C5.27614 20 5.52614 19.8611 5.70711 19.6464L11 13.382L16.2929 19.6464C16.4739 19.8611 16.7239 20 17 20C17.5523 20 18 19.5523 18 19V5C18 3.89543 17.1046 3 16 3H6Z" fill={item.revision ? "#ff4040" : "#bbb"} stroke={item.revision ? "#ff4040" : "#bbb"} strokeWidth="1.5" />
                        </svg>
                      </button>
                    </td>
                    <td className="center-icon [text-align:center]! [vertical-align:middle]! [height:100%]! [&_>_*]:[display:inline-block]! [&_>_*]:[vertical-align:middle]!">
                      {item.difficulty ? <span className={`difficulty-tag [display:inline-block]! [padding:5px_12px]! [font-size:0.8rem]! [font-weight:700]! [border-radius:999px]! [text-align:center]! difficulty-${item.difficulty.toLowerCase()} ${difficultyStyles[item.difficulty.toLowerCase()] || "[box-shadow:0_1px_6px_#ff1a1a55]!"} `}>
                          {item.difficulty}
                        </span> : "—"}
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>}
      </div>
    </div>;
};
export default DropdownSection;
